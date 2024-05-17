"use client";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { Backdrop } from "@mui/material";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className={`p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700`}
        >
          <Avatar src={currentUser?.image}></Avatar>
          <AiFillCaretDown></AiFillCaretDown>
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href={"/profile"}>
                  <MenuItem onClick={toggleOpen}>Your Profile</MenuItem>
                </Link>
                <Link href={"/orders"}>
                  <MenuItem onClick={toggleOpen}>Your Order</MenuItem>
                </Link>
                <Link href={"/admin"}>
                  <MenuItem onClick={toggleOpen}>Dashboard</MenuItem>
                </Link>
                <hr></hr>
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  LogOut
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <MenuItem onClick={toggleOpen}>LogIn</MenuItem>
                </Link>
                <Link href={"/register"}>
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen}></BackDrop> : null}
    </>
  );
};

export default UserMenu;
