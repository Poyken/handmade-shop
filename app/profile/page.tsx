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
  // const user = await getUserById(params); // Assuming there's a function to get user by ID
  // const currentUser = await getCurrentUser();
  // if (!user || currentUser?.id !== user.id)
  // return (
  // <NullData title="Oops! User with the given id does not exist or you don't have permission to edit"></NullData>
  // );
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
