import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Handmade-shop Admin",
  description: "Handmade-Shop Admin DashBoard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav></AdminNav>
      {children}
    </div>
  );
};

export default AdminLayout;
