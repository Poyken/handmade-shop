import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import UserDetails from "./UserDetails";
import getUserById from "@/actions/getUserById";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IPrams {
  userId?: string;
}
const User = async ({ params }: { params: IPrams }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <NullData title="Từ chối quyền truy cập từ vai trò của bạn"></NullData>
    );
  }
  const user = await getUserById(params);
  if (!user)
    return <NullData title="Người dùng có id đã cho không tồn tại"></NullData>;
  return (
    <div className="p-8">
      <Container>
        <UserDetails user={user}></UserDetails>
      </Container>
    </div>
  );
};

export default User;
