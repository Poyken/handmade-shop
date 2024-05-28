"use client";
import { useEffect, useState } from "react";
import Heading from "../components/products/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return "";

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
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Biểu thức chính quy để kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra email
    if (!emailPattern.test(data.email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    // Biểu thức chính quy để kiểm tra mật khẩu
    // Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Kiểm tra mật khẩu
    if (!passwordPattern.test(data.password)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    // Biểu thức chính quy để kiểm tra số điện thoại Việt Nam
    // Số điện thoại phải bắt đầu bằng số 0, theo sau là 9 hoặc 10 chữ số
    const phonePattern = /^0\d{9}$/;

    // Kiểm tra số điện thoại
    if (!phonePattern.test(data.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      const imageUrl = await uploadImage();
      const requestData = { ...data, image: imageUrl };

      await axios.post("/api/register", requestData);
      toast.success("Tài khoản được tạo");

      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Đăng nhập thành công");
        } else if (callback?.error) {
          toast.error(callback.error);
        }
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return (
      <p className="text-center">Đăng ký thành công. Đang chuyển trang...</p>
    );
  }

  return (
    <>
      <Heading title="Đăng ký tài khoản Handmade-shop"></Heading>
      <Button
        label={"Đăng ký với Google"}
        outline
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      ></Button>
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Tên"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        type="email"
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        id="password"
        label="Mật khẩu"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      ></Input>
      <Input
        id="phone"
        label="Số điện thoại"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      ></Input>
      <input
        id="image"
        // label="Ảnh đại diện"
        disabled={isLoading}
        // register={register}
        // errors={errors}
        type="file"
        onChange={handleImageChange}
      ></input>
      <Button
        label={isLoading ? "Đang load" : "Đăng ký"}
        onClick={handleSubmit(onSubmit)}
      ></Button>
      <p className="text-sm">
        Bạn đã có tài khoản?{" "}
        <Link className="underline" href={"/login"}>
          Đăng nhập
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
