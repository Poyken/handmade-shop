import Container from "@/app/components/Container";
import ManageOrderClient from "./ManageOrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";

const ManageProducts = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Từ chối quyền truy cập từ vai trò của bạn"></NullData>
    );
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageOrderClient orders={orders}></ManageOrderClient>
      </Container>
    </div>
  );
};

export default ManageProducts;
