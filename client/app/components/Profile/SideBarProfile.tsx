/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const profileImage =
    user?.avatar?.url && typeof user.avatar.url === "string"
      ? user.avatar.url
      : avatar && typeof avatar === "string"
      ? avatar
      : avatarDefault;

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}>
        <Image
          src={profileImage}
          alt="User Avatar"
          width={40}
          height={40}
          className="w-[30px] h-[30px] 800px:w-[50px] 800px:h-[50px] cursor-pointer rounded-full object-cover"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}>
        <RiLockPasswordLine
          size={20}
          className="ml-1 dark:fill-white fill-black"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}>
        <SiCoursera size={20} className="ml-1 dark:fill-white fill-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
          }`}
          href={"/admin"}>
          <GrUserAdmin size={20} className="ml-1 dark:fill-white fill-black" />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}>
        <AiOutlineLogout
          size={20}
          className="ml-1 dark:fill-white fill-black"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
