"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/input";
import Heading from "@/app/components/products/Heading";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
// export async function POST(request: Request) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     return NextResponse.error();
//   }
//   const body = await request.json();
//   const { comment, rating, product, userId } = body;
//   const deliveredOrder = currentUser?.orders.some(
//     (order) =>
//       order.products.find((item) => item.id === product.id) &&
//       order.deliveryStatus === "delivered"
//   );
// }
interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { comment: "", rating: 0 } });
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

      return toast.error("No rating selected");
    }
    const ratingData = { ...data, userId: user?.id, product: product };
    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (!user || !product) return null;
  const deliveredOrder = user?.orders?.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );
  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id;
  });
  if (userReview || !deliveredOrder) return null;
  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product"></Heading>
      <Rating
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
        label={isLoading ? "Đang load" : "Đánh giá sản phẩm"}
        onClick={handleSubmit(onSubmit)}
      ></Button>
    </div>
  );
};

export default AddRating;
