"use client";
import Button from "@/app/components/Button";
import Input from "../components/inputs/input";
import TextArea from "@/app/components/inputs/TextArea";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import axios from "axios";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import hashPassword from "@/utils/hashPassword";
import NullData from "../components/NullData";
interface EditUserFormProps {
  user: any; // Assuming the user object structure
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
  if (!user)
    return (
      <NullData title="Oops! User with the given id does not exist or you don't have permission to edit"></NullData>
    );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      user: user.name,
      email: user.email,
      hashedPassword: user.hashedPassword,
      phone: user.phone,
      // Add other user properties here
    },
  });

  useEffect(() => {
    // Reset form and state when user changes
    reset({
      name: user.name,
      email: user.email,
      hashedPassword: user.hashedPassword,
      phone: user.phone,
      // Add other user properties here
    });
  }, [user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // if (data.password) {
      //   data.password = await hashPassword(data.password);
      // }
      // Call API to update user data
      const updatedUserData = { ...user, ...data }; // Merge existing user data with updated data
      // Assuming there's an API endpoint to update user data
      const response = await axios.patch(
        `/api/user/${user.id}`,
        updatedUserData
      );
      toast.success("Thông tin người dùng được cập nhật thành công");
      // Redirect or refresh user profile page after successful update
      router.push(`/`); // Redirect to user profile page
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense>
      <>
        {/* Form fields for editing user information */}
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
        />
        <Input
          id="hashedPassword"
          label="Mật khẩu"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
          type="password"
        />
        <Input
          id="phone"
          label="Số điện thoại"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        {/* Add other input fields for other user properties */}

        <Button
          label={isLoading ? "Đang load..." : "Lưu thay đổi"}
          onClick={handleSubmit(onSubmit)}
        />
      </>
    </Suspense>
  );
};

export default EditUserForm;
