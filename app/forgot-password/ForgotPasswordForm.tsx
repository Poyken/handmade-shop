"use client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/products/Heading";
import Button from "../components/Button";
import Input from "../components/inputs/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface ForgotPasswordFormProps {}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Simulate password reset process
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async request
    setIsLoading(false);
    toast.success("Hướng dẫn đặt lại mật khẩu đã được gửi tới email của bạn.");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
      <p className="mb-4">
        Vui lòng nhập địa chỉ email của bạn bên dưới để nhận được hướng dẫn về
        cách đặt lại mật khẩu của bạn.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="email"
        />
        <Button
          label={isLoading ? "Đang load" : "Đổi mật khẩu"}
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
      <p className="mt-4">
        Quên mật khẩu?{" "}
        <Link href="/login" className="underline">
          Đăng nhập
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
