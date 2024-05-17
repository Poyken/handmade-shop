import Container from "@/app/components/Container";
import ManageUsersClient from "./ManageUsersClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getUsers from "@/actions/getUser";

const ManageProducts = async () => {
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Từ chối quyền truy cập từ vai trò của bạn"></NullData>
    );
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageUsersClient users={users}></ManageUsersClient>
      </Container>
    </div>
  );
};

export default ManageProducts;
