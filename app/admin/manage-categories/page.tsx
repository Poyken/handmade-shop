import Container from "@/app/components/Container";
import ManageCategoriesClient from "./ManageCategoriesClient";
import getCategories from "@/actions/getCategories";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageCategories = async () => {
  const categories = await getCategories();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Từ chối quyền truy cập từ vai trò của bạn"></NullData>
    );
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageCategoriesClient
          categories={categories}
        ></ManageCategoriesClient>
      </Container>
    </div>
  );
};

export default ManageCategories;
