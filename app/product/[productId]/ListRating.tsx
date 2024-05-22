"use client";

import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import Heading from "@/app/components/products/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

interface ListRatingProps {
  product: any;
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product.reviews.length === 0) return null;
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Heading title="Đánh giá sản phẩm"></Heading>
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div className="flex justify-between">
                {toggle ? (
                  <div key={review.id} className="max-w-300px">
                    <div className="flex gap-2 items-center">
                      <Avatar src={review?.user?.image}></Avatar>
                      <div className="font-semibold">{review?.user?.name}</div>
                      <div className="font-light">
                        {moment(review.createdDate).format(
                          "DD/MM/YYYY HH:mm:ss a"
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Rating value={review.rating} readOnly></Rating>
                      <div className="ml-2">{review.comment}</div>
                      <hr className="mt-4 mb-4" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex max-w-[200px] gap-3 max-h-[40px]">
                  <Button
                    label=""
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    icon={MdEdit}
                    small
                  ></Button>
                  <Button
                    label=""
                    onClick={() => {}}
                    icon={MdDeleteForever}
                    small
                  ></Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
