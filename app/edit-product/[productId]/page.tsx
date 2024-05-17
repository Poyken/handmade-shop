import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import EditProductForm from "./EditProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import prisma from "@/libs/prismadb";
import getProductById from "@/actions/getProductById";
interface IPrams {
  productId?: string;
}
const EditProducts = async ({ params }: { params: IPrams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();
  if (!product || user?.role !== "ADMIN")
    return <NullData title="Sản phẩm có id đã cho không tồn tại"></NullData>;
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <EditProductForm product={product}></EditProductForm>
        </FormWrap>
      </Container>
    </div>
  );
};

export default EditProducts;
