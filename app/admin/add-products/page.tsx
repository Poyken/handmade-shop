import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getCategories from "@/actions/getCategories";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Từ chối quyền truy cập từ vai trò của bạn"></NullData>
    );
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm categories={categories}></AddProductForm>
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
