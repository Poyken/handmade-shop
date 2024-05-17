import getProducts from "@/actions/getProducts";
import Container from "../components/Container";
import getOrders from "@/actions/getOrders";
import Summary from "./Summary";
import getUsers from "@/actions/getUser";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied"></NullData>;
  }
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} users={users} orders={orders}></Summary>
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData}></BarGraph>
        </div>
      </Container>
    </div>
  );
};

export default Admin;
