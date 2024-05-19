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
interface RegisterFormProps {
  currentUser: SafeUser | null;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
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
      router.push("/cart");
      router.refresh();
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Tài khoản được tạo");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Đăng nhập thành công");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Email đã tồn tại"))
      .finally(() => setIsLoading(false));
  };
  if (currentUser) {
    return (
      <p className="text-center">Đăng kí thành công. Đang chuyển trang...</p>
    );
  }
  return (
    <>
      <Heading title="Đăng kí tài khoản Handmade-shop"></Heading>
      <Button
        label={"Đăng kí với Google"}
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

      <Button
        label={isLoading ? "Đang load" : "Đăng kí"}
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
