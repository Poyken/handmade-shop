"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/input";
import Heading from "@/app/components/products/Heading";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface EditRatingProps {
  review: any;
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
  toggle: boolean; // Nhận giá trị toggle từ ListRating
  handleToggle: (toggle: boolean) => void; // Nhận hàm handleToggle từ ListRating
}

const EditRating: React.FC<EditRatingProps> = ({
  product,
  user,
  review,
  toggle,
  handleToggle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { comment: review.comment, rating: review.rating },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);

      return toast.error("Không có xếp hạng được chọn");
    }
    const ratingData = { ...data };
    axios
      .patch(`/api/rating/${review.id}`, ratingData)
      .then(() => {
        toast.success("Đã gửi cập nhật bình luận");
        router.refresh();
        reset();
        handleToggle(!toggle);
      })
      .catch((error) => {
        toast.error("Đã có lỗi xảy ra");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  //   if (!user || !product) return null;
  //   const deliveredOrder = user?.orders?.some(
  //     (order) =>
  //       order.products.find((item) => item.id === product.id) &&
  //       order.deliveryStatus === "delivered"
  //   );
  //   const userReview = product?.reviews.find((review: Review) => {
  //     return review.userId === user.id;
  //   });
  //   if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      {/* <Heading title="Đánh giá sản phẩm"></Heading> */}
      <Rating
        name="rating"
        defaultValue={review.rating}
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      ></Rating>
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Button
        label={isLoading ? "Đang load" : "Cập nhật bình luận"}
        onClick={handleSubmit(onSubmit)}
      ></Button>
    </div>
  );
};

export default EditRating;
