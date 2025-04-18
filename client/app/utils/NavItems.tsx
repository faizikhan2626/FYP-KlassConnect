import React from "react";
import Link from "next/link";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "Ai Quiz",
    url: "/quiz",
  },
  {
    name: "Ai Assignment",
    url: "/assignment",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/privacy",
  },
  {
    name: "FAQ",
    url: "faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex font-bold ">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a392]  text-[crimson]"
                    : "text-black dark:text-white"
                } font-Poppins font-[600] text-[18px] px-6`}>
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="mt-5 800px:hidden ">
          <div className="w-full h-[80px] flex items-center justify-between p-3 ">
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-[800]  dark:text-[#37a392] text-[crimson]`}>
              KlassConnect
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link key={index} href="/" passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a392] text-[crimson] font-bold"
                      : "text-black dark:text-white"
                  } font-Poppins font-[400] text-[18px] px-6 block py-6`}>
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
