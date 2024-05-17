import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import EditUserForm from "./EditUserForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import prisma from "@/libs/prismadb";
import getUserById from "@/actions/getUserById";
interface IPrams {
  userId?: string;
}
const EditUser = async ({ params }: { params: IPrams }) => {
  const user = await getCurrentUser();
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <EditUserForm user={user}></EditUserForm>
        </FormWrap>
      </Container>
    </div>
  );
};

export default EditUser;
