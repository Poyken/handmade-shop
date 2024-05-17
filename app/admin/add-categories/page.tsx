import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddCategoriesForm from "./AddCategoriesForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddCategories = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Từ chối quyền truy cập từ vai trò của bạn"></NullData>
    );
  }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddCategoriesForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddCategories;
