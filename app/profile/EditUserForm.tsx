"use client";
import Button from "@/app/components/Button";
import Input from "../components/inputs/input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import NullData from "../components/NullData";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { SafeUser } from "@/types"; // Assuming SafeUser type is used for user prop

interface EditUserFormProps {
  user: SafeUser | null; // Assuming the user object structure
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.image || null
  ); // Thêm trạng thái để lưu URL xem trước ảnh
  const [progress, setProgress] = useState(0);
  // setImagePreview(user?.image);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      hashedPassword: "",
      phone: user?.phone,
      image: user?.image,
    },
  });

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
      hashedPassword: "",
      phone: user?.phone,
      image: user?.image,
    });
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Cập nhật URL xem trước ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!image) return user?.image || "";

    const fileName = `${new Date().getTime()}-${image.name}`;
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `users/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (data.hashedPassword && !passwordPattern.test(data.hashedPassword)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(data.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      const imageUrl = await uploadImage();
      const updatedUserData = { ...data, image: imageUrl };
      // if (data.hashedPassword) {
      //   updatedUserData.hashedPassword = await hashPassword(
      //     data.hashedPassword
      //   );
      // }

      await axios.patch(`/api/user/${user?.id}`, updatedUserData);
      toast.success("Thông tin người dùng được cập nhật thành công");
      router.push(`/`);
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <NullData title="Yêu cầu đăng nhập để tiếp tục"></NullData>;
  }

  return (
    <>
      <Input
        id="name"
        label="Tên"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
        type="email"
      />
      <Input
        id="hashedPassword"
        label="Mật khẩu (bỏ trống nếu không thay đổi)"
        register={register}
        errors={errors}
        disabled={isLoading}
        type="password"
      />
      <Input
        id="phone"
        label="Số điện thoại"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
        type="number"
      />
      <label
        htmlFor="image"
        className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Chọn ảnh đại diện
        <input
          id="image"
          className="hidden"
          type="file"
          onChange={handleImageChange}
          disabled={isLoading}
        />
      </label>
      {imagePreview && (
        <div className="mt-4">
          <p>Ảnh đại diện của bạn:</p>
          <img
            src={imagePreview}
            alt="Avatar Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}
      <Button
        label={
          isLoading
            ? "Đang load..." + progress.toFixed(2) + "%"
            : "Lưu thay đổi"
        }
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default EditUserForm;
