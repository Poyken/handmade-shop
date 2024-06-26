"use client";

import Status from "@/app/components/Status";
import Heading from "@/app/components/products/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
// import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  // const router = useRouter();
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Chi tiết đơn hàng"></Heading>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div>
          <div>ID Đơn hàng : {order.id}</div>
          <div>
            Tổng tiền:{""}
            <span className="font-bold">{formatPrice(order.amount)}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div>Trạng thái thanh toán</div>
            <div>
              {order.status === "pending" ? (
                <Status
                  text="Đang chờ"
                  icon={MdAccessTimeFilled}
                  bg="bg-slate-200"
                  color="text-slate-700"
                />
              ) : order.status === "complete" ? (
                <Status
                  text="Hoàn thành"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ) : order.status === "canceled" ? (
                <Status
                  text="Đã hủy"
                  icon={MdDone}
                  bg="bg-rose-200"
                  color="text-rose-700"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>Trạng thái giao hàng</div>
            <div>
              {order.deliveryStatus === "pending" ? (
                <Status
                  text="Đang chờ"
                  icon={MdAccessTimeFilled}
                  bg="bg-slate-200"
                  color="text-slate-700"
                />
              ) : order.deliveryStatus === "dispatched" ? (
                <Status
                  text="Đã gửi"
                  icon={MdDeliveryDining}
                  bg="bg-purple-200"
                  color="text-purple-700"
                />
              ) : order.deliveryStatus === "delivered" ? (
                <Status
                  text="Đã giao"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ) : order.deliveryStatus === "canceled" ? (
                <Status
                  text="Đã hủy"
                  icon={MdDone}
                  bg="bg-rose-200"
                  color="text-rose-700"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            Thời gian đặt hàng:{" "}
            {moment(order.createdDate).format("DD/MM/YYYY HH:mm:ss a ")}
          </div>
        </div>
        <div>
          <div>Quốc gia: {order.address?.country}</div>
          <div>Thành phố: {order.address?.city}</div>
          <div>Địa chỉ 1: {order.address?.line1}</div>
          <div>Địa chỉ 2: {order.address?.line2}</div>
          <div>Mã zip: {order.address?.postal_code}</div>
          <div>Tỉnh: {order.address?.state}</div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Sản phẩm đã đặt</h2>
        <div className="grid-cols-5 grid text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">Sản phẩm</div>
          <div className=" justify-self-center">Giá</div>
          <div className=" justify-self-center">Số lượng</div>
          <div className=" justify-self-end">Tổng</div>
        </div>
      </div>
      {order.products.map((item) => {
        return <OrderItem key={item.id} item={item}></OrderItem>;
      })}
    </div>
  );
};

export default OrderDetails;
