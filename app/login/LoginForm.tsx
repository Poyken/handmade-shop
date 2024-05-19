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

interface LoginFormProps {
  currentUser: SafeUser | null;
}
const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Đăng nhập thành công");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  if (currentUser) {
    return (
      <p className="text-center">Đăng nhập thành công. Đang chuyển trang...</p>
    );
  }
  return (
    <>
      <Heading title="Đăng nhập vào Handmade-shop"></Heading>
      <Button
        label={"Đăng nhập với Google"}
        outline
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      ></Button>
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="email"
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
      <Button
        label={isLoading ? "Đang load" : "Đăng nhập"}
        onClick={handleSubmit(onSubmit)}
      ></Button>

      <div className="flex w-full">
        <p className="text-sm block mr-0">
          Bạn chưa có tài khoản?{" "}
          <Link className="underline" href={"/register"}>
            Đăng ký
          </Link>
        </p>
        <p className="text-sm block ml-auto">
          <Link className="underline" href={"/forgot-password"}>
            Quên mật khẩu
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
