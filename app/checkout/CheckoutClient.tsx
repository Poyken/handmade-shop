"use client";
import { useCart } from "@/hook/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, handleClearCart, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          toast.error("Đã có lỗi xảy ra");
        });
    }
  }, [cartProducts]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            handleClearCart={handleClearCart}
            setError={setError}
            router={router}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Thực hiện thanh toán....</div>}
      {error && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-rose-500">
            Vui lòng thanh toán để hoàn tất đơn hàng hoặc
          </div>
          <div className="max-w-[220px] w-full">
            <Button
              label="Trở về trang mua sắm"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-teal-500 text-center">Thanh toán thành công</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="Xem đơn hàng"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
