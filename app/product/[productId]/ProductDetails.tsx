"use client";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { useCart } from "@/hook/useCart";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
interface ProductDetailsProps {
  product: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  //   console.log(cartProduct);
  // console.log(cartTotalQty);
  // console.log(cartProducts);
  const router = useRouter();
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      ></ProductImage>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className=" text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly></Rating>
          <div>{product.reviews.length} đánh giá</div>
        </div>
        <Horizontal></Horizontal>

        <div className="text-justify">{product.description}</div>
        <Horizontal></Horizontal>
        <div>
          <span className="font-semibold">Danh mục: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">Nhãn hiệu: </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "Còn hàng" : "Hết hàng"}
        </div>
        <Horizontal></Horizontal>
        {product.inStock ? (
          <>
            {isProductInCart ? (
              <>
                <p className="mb-2 text-slate-500 flex items-center gap-1">
                  <MdCheckCircle
                    size={20}
                    className="text-teal-400"
                  ></MdCheckCircle>
                  <span>Sản phẩm đã được thêm vào giỏ hàng</span>
                </p>
                <div className="max-w-[300px]">
                  <Button
                    label="Xem giỏ hàng"
                    outline
                    onClick={() => {
                      router.push("/cart");
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
              </>
            ) : (
              <>
                <SetColor
                  cartProduct={cartProduct}
                  images={product.images}
                  handleColorSelect={handleColorSelect}
                ></SetColor>
                <Horizontal></Horizontal>
                <SetQuantity
                  cartProduct={cartProduct}
                  handleQtyIncrease={handleQtyIncrease}
                  handleQtyDecrease={handleQtyDecrease}
                ></SetQuantity>
                <Horizontal></Horizontal>
                <div className="max-w-[300px]">
                  <Button
                    label="Thêm vào giỏ hàng"
                    onClick={() => {
                      handleAddProductToCart(cartProduct);
                    }}
                  ></Button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              ></SetColor>
              <Horizontal></Horizontal>
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              ></SetQuantity>
              <Horizontal></Horizontal>
              <div className="max-w-[300px]">
                <Button
                  label="Thêm vào giỏ hàng"
                  onClick={() => {
                    toast.error("Sản phẩm đã hết hàng");
                  }}
                ></Button>
              </div>
            </>
            <Link
              href={"/"}
              className="text-slate-500 flex items-center gap-1 mt-2"
            >
              <MdArrowBack></MdArrowBack>
              <span>Tiếp tục mua sắm</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
