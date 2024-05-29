import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Yêu cầu đăng nhập để tiếp tục"></NullData>;
  }
  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="Chưa có đơn đặt hàng nào..."></NullData>;
  }
  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders}></OrdersClient>
      </Container>
    </div>
  );
};

export default Orders;
