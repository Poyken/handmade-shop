"use client";

import {
  SelectedImgType,
  CartProductType,
} from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-bold">IMAGE</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.image}
                onClick={() => handleColorSelect(image)}
                className={`w-7 h-7 rounded-full border-teal-300 flex items-center justify-center ${
                  cartProduct.selectedImg.image === image.image
                    ? "border-[1.5px]"
                    : "border-none"
                }`}
              >
                <div
                  style={{ backgroundImage: `url(${image.image})` }}
                  className="w-5 h-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SetColor;