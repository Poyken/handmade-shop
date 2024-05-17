"use client";

import { useCart } from "@/hook/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/products/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Nhập thông tin để hoàn tất thanh toán"></Heading>
      </div>
      <h2 className="font-semibold mb-2">Thông tin địa chỉ</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US", "KE", "NG", "GH", "ZM", "VN"],
        }}
      ></AddressElement>
      <h2 className="font-semibold mt-4 mb2 ">Thông tin thanh toán</h2>
      <PaymentElement
        id="payment-element"
        options={{ layout: "tabs" }}
      ></PaymentElement>
      <div className="py-4 text-center text-slate-700 text-4xl font-bold">
        Tổng: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Đang xử lý" : "Thanh toán ngay"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      ></Button>
    </form>
  );
};

export default CheckoutForm;
