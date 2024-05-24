import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import getCategories from "@/actions/getCategories";
import { FaBars } from "react-icons/fa";
import { useCallback, useState } from "react";
import BackDrop from "./BackDrop";
import ToggleBar from "./ToggleBar";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });
const NavBar = async () => {
  const currentUser = await getCurrentUser();
  const categories = await getCategories();
  return (
    <>
      <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex  items-center justify-between gap-3 md:gap-0 ">
              <Link
                href="/"
                className={`${redressed.className} font-bold text-2xl`}
              >
                Handmade-Shop
              </Link>
              <div className="hidden md:block">
                <SearchBar></SearchBar>
              </div>
              <div className="flex items-center gap-8 md:gap-12">
                <CartCount></CartCount>
                <UserMenu currentUser={currentUser} />
                <div className="sm:hidden">
                  <ToggleBar categories={categories}></ToggleBar>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className=" hidden sm:block">
          <Categories categories={categories}></Categories>
        </div>
      </div>
    </>
  );
};

export default NavBar;
