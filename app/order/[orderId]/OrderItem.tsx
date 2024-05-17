"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
interface OrderItemProps {
  item: CartProductType;
}
const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="gird gird-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center">
      <div
        className="
      grid-cols-5 grid text-xs gap-4 pb-2 items-center
        col-span-2 
        justify-self-start 
        md:gap-4"
        // flex  gap-2
      >
        <div className="relative w-[70px] aspect-square">
          <Link href={`/product/${item.id}`}>
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            ></Image>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          </div>
          <div>{item.selectedImg.color}</div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">{item.quantity}</div>
        <div className="justify-self-end font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
