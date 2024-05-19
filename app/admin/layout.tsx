import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Trang quản trị Handmade-Shop",
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
