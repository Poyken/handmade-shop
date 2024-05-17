import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
const Orders = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NullData title="Oops! Access denied"></NullData>;
  }
  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders) {
    return <NullData title="Oops! No order yet..."></NullData>;
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
