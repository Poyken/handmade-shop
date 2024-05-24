"use client";
import { useCallback, useState } from "react";
import { FaBars } from "react-icons/fa";
import BackDrop from "./BackDrop";
import { categories } from "@/utils/Categories";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { signOut } from "next-auth/react";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";
interface ICategory {
  categories: any;
}
const ToggleBar: React.FC<ICategory> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) return null;
  return (
    <>
      <div className={`relative z-${isOpen ? 30 : 20}`}>
        <div
          onClick={toggleOpen}
          className={`p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700`}
        >
          <FaBars></FaBars>
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer pb-4">
            <div className="bg-white">
              <Container>
                <div
                  className="pt-4 flex flex-col overflow-x-auto"
                  onClick={toggleOpen}
                >
                  {categories.map(
                    (item: any) =>
                      item.status === "active" && (
                        <div className="hover:bg-slate-100 w-full">
                          <Category
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={
                              category === item.label ||
                              (category === null && item.label === "All")
                            }
                          ></Category>
                        </div>
                      )
                  )}
                </div>
              </Container>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} z={1}></BackDrop> : null}
    </>
  );
};

export default ToggleBar;
