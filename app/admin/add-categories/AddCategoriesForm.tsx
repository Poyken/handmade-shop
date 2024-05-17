"use client";
import Button from "@/app/components/Button";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

type CategoryFormData = {
  label: string;
  icon: string;
  status: string; // Thêm trường status vào kiểu dữ liệu của biểu mẫu
};

const AddCategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>(); // Định rõ kiểu dữ liệu cho useForm

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    setIsLoading(true);
    try {
      // Perform API request to create category
      const response = await axios.post("/api/category", data);

      // Check if category creation was successful
      if (response.status === 200) {
        toast.success("Danh mục đã được tạo thành công");
        router.refresh(); // Reload the page to reflect the changes
        reset({
          label: "",
          icon: "",
          status: "",
        });
      } else {
        toast.error("Tạo danh mục thất bại");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Đã có lỗi xảy ra khi tạo danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="label"
        >
          Tên danh mục
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="label"
          type="text"
          placeholder="Nhập tên danh mục"
          {...register("label", { required: "Category label is required" })}
        />
        {errors.label && (
          <p className="text-red-500 text-xs italic">{errors.label.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="icon"
        >
          Mã Icon danh mục (Code)
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="icon"
          type="text"
          placeholder="Nhập mã icon"
          {...register("icon", { required: "Category icon URL is required" })}
        />
        {errors.icon && (
          <p className="text-red-500 text-xs italic">{errors.icon.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Trạng thái
        </label>
        <select
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          {...register("status", { required: "Category status is required" })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs italic">{errors.status.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Button
          label={isLoading ? "Đang tạo danh mục" : "Tạo danh mục"}
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default AddCategoryForm;
