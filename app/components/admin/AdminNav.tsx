"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminNavItem from "./AdminNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
  MdOutlineCategory,
} from "react-icons/md";
import Container from "../Container";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href={"/admin"}>
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            ></AdminNavItem>
          </Link>
          <Link href={"/admin/add-products"}>
            <AdminNavItem
              label="AddProducts"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-products"}
            ></AdminNavItem>
          </Link>
          <Link href={"/admin/manage-products"}>
            <AdminNavItem
              label="ManageProducts"
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
            ></AdminNavItem>
          </Link>
          <Link href={"/admin/manage-orders"}>
            <AdminNavItem
              label="ManageOrders"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-orders"}
            ></AdminNavItem>
          </Link>
          <Link href={"/admin/manage-users"}>
            <AdminNavItem
              label="ManageUsers"
              icon={FaRegUserCircle}
              selected={pathname === "/admin/manage-users"}
            ></AdminNavItem>
          </Link>
          <Link href={"/admin/add-categories"}>
            <AdminNavItem
              label="AddCategories"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-categories"}
            ></AdminNavItem>
          </Link>
          <Link href={"/admin/manage-categories"}>
            <AdminNavItem
              label="ManageCategories"
              icon={MdOutlineCategory}
              selected={pathname === "/admin/manage-categories"}
            ></AdminNavItem>
          </Link>
        </div>
        <Link href={"/"}>
          <AdminNavItem
            label="Back to Home"
            icon={IoMdArrowBack}
            selected={pathname === "/"}
          ></AdminNavItem>
        </Link>
      </Container>
    </div>
  );
};

export default AdminNav;
