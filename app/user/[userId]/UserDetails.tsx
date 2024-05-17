"use client";
import Heading from "../../components/products/Heading";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface UserDetailsProps {
  user: any;
}
const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const router = useRouter();
  return (
    <div className="max-w-[300px] flex flex-col gap-2">
      <Heading title="User Detail"></Heading>
      <p>UserId: {user?.id}</p>
      <p>UserName: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Phone: {user?.phone}</p>
      <p>Image: </p>
      {user.image && (
        <Image
          src={user.image}
          alt="User Image"
          width={100}
          height={100}
          className="object-contain"
        ></Image>
      )}
      <Button
        label="Back to Manage User"
        onClick={() => {
          router.push("/admin/manage-users");
        }}
      ></Button>
    </div>
  );
};
export default UserDetails;
