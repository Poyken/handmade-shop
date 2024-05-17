"use client";
import { useCart } from "@/hook/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/products/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
interface CartClientProps {
  currentUser: SafeUser | null;
}
const CartCLient: React.FC<CartClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col  items-center">
        <div className="text-2xl">Giỏ hàng của bạn đang trống</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack></MdArrowBack>
            <span>Bắt đầu mua sắm</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Giỏ hàng của bạn" center></Heading>
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="justify-self-start col-span-2">Sản phẩm</div>
        <div className="justify-self-center">Giá</div>
        <div className="justify-self-center">Số lượng</div>
        <div className="justify-self-end">Tổng</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[120px]">
          <Button
            label="Xóa giỏ hàng"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          ></Button>
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Tổng tiền</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Chưa bao gồm phí dịch vụ và phí giao hàng
          </p>
          <Button
            label={currentUser ? "Thanh toán" : "Đăng nhập để thanh toán"}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          ></Button>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack></MdArrowBack>
            <span>Tiếp tục mua sắm</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCLient;
