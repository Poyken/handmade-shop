"use client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/app/components/Button";
import NullData from "@/app/components/NullData";
import Input from "@/app/components/inputs/input";

interface EditCategoryFormProps {
  category: any;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false); // Di chuyển useState ra ngoài nhánh điều kiện
  const router = useRouter();
  // if (!category)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      label: category.label,
      icon: category.icon,
      status: category.status,
    },
  });
  useEffect(() => {
    // Reset form and state when user changes
    reset({
      label: category.label,
      icon: category.icon,
      status: category.status,
      // Add other user properties here
    });
  }, [category]);
  // Set value for dynamic form fields
  useEffect(() => {
    setValue("label", category.label);
    setValue("icon", category.icon);
    setValue("status", category.status);
  }, [setValue, category]);

  if (!category) {
    return (
      <NullData title="Oops! User with the given id does not exist or you don't have permission to edit"></NullData>
    );
  }
  // const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/category/${category.id}`, data);
      if (response.status === 200) {
        toast.success("Category edited successfully");
        router.push("/admin/manage-categories"); // Redirect to categories page after editing
      } else {
        toast.error("Failed to edit category");
      }
    } catch (error) {
      console.error("Error editing category:", error);
      toast.error("An error occurred while editing category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="label"
        label="Label"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id="icon"
        label="Icon"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      {/* <Input
        id="status"
        label="Status"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      /> */}
      <label htmlFor="status">Status</label>
      <select
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="status"
        {...register("status")}
        disabled={isLoading}
        defaultValue={category.status}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <Button
        label={isLoading ? "Loading..." : "Edit Category"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </div>
  );
};

export default EditCategoryForm;
