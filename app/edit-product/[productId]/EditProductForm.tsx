"use client";
import Button from "@/app/components/Button";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import Heading from "@/app/components/products/Heading";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Suspense } from "react";
export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};
interface EditProductFormProps {
  product: any;
}
const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  //   console.log("image>>>>>>>", images);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      inStock: product.inStock,
      images: [],
      price: product.price,
    },
  });
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);
  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected Image");
    }
    const handleImageUploads = async () => {
      toast("Editing product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    snapshot.bytesTransferred / snapshot.totalBytes;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({ ...item, image: downloadURL });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL ", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };
    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    // console.log(productData);
    axios
      .patch(`/api/product/${product.id}`, productData)
      .then(() => {
        toast.success("Product edited successfully");
        setIsProductCreated(true);
        router.refresh();
        router.push("/admin/manage-products");
      })
      .catch((error) => {
        toast.error("Something went wrong when saving product to db");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
    });
  }, []);

  return (
    <Suspense>
      <>
        <Heading title="Edit a Product" center></Heading>
        <Input
          id={"name"}
          label={"Name"}
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        ></Input>
        <Input
          id={"price"}
          label={"Price"}
          register={register}
          errors={errors}
          disabled={isLoading}
          required
          type="number"
        ></Input>
        <Input
          id={"brand"}
          label={"Brand"}
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        ></Input>
        <TextArea
          id={"description"}
          label={"Description"}
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        ></TextArea>
        <CustomCheckBox
          id="inStock"
          register={register}
          label="This product is in stock"
        ></CustomCheckBox>
        <div className="w-full font-medium">
          <div className="mb-2 font-semibold">Select a Category</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => {
              if (item.label === "All") {
                return null;
              }
              return (
                <div key={item.label} className="col-span">
                  <CategoryInput
                    label={item.label}
                    icon={item.icon}
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.label}
                  ></CategoryInput>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-col flex-wrap gap-4">
          <div>
            <div className="font-bold">
              Select the available product colors and upload their images
            </div>
            <div className="text-sm">
              You must upload an image for each of the color selected otherwise
              your color selection will be ignored
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colors.map((item, index) => {
              return (
                <SelectColor
                  key={index}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                ></SelectColor>
              );
            })}
          </div>
        </div>
        <Button
          label={isLoading ? "Loading..." : "Edit product"}
          onClick={handleSubmit(onSubmit)}
        ></Button>
      </>
    </Suspense>
  );
};

export default EditProductForm;
