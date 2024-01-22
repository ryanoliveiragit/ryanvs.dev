"use client";
import React, { useEffect, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoFlask } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { ModeToggle } from "../ui/toggle-mode";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    // Adiciona um ouvinte de evento de rolagem quando o componente é montado
    window.addEventListener("scroll", handleScroll);

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`h-[61px] flex justify-center items-center sticky top-0 z-30 mb-10 bg-gray-50 ${
        scrolled ? "dark:bg-opacity-30" : "dark:bg-opacity-0"
      } dark:bg-[#111111] transition-[background-color] bg-opacity-0 ${
        scrolled ? "backdrop-blur-sm" : "backdrop-blur-none"
      }  dark:bg-opacity-0 duration-300"`}
    >
      <nav
        className={`flex flex-row mt-2 justify-between items-center w-[650px] mx-2 py-4`}
      >
        <Link
          href="/"
          className="dark:text-[#c7c7c7] hover:dark:text-[#fffefe] text-primary cursor-pointer "
        >
          <BiHomeAlt2 size={20} strokeWidth={0.3} />
        </Link>
        <ul className="flex flex-row items-center p-0 list-none gap-4 text-primary">
          <Link
            href="/experiments"
            className="dark:text-[#c7c7c7] hover:dark:text-[#fffefe] text-primary cursor-pointer "
          >
            <IoFlask size={20} strokeWidth={0.3} />
          </Link>

          <Link
            href="/diario"
            className="dark:text-[#c7c7c7] hover:dark:text-[#fffefe] text-primary cursor-pointer "
          >
            <GoPencil size={20} strokeWidth={0.3} />
          </Link>

          <Link
            href="/jornal"
            className="dark:text-[#c7c7c7] hover:dark:text-[#fffefe] text-primary cursor-pointer "
          >
            <RiShoppingBag3Line size={20} strokeWidth={0.3} />
          </Link>
          <hr className="h-[1.5rem] w-[2px] bg-muted-foreground opacity-30" />
          <Link
            href="/jornal"
            className="dark:text-[#c7c7c7] hover:dark:text-[#fffefe] text-primary cursor-pointer "
          >
            <BiLogoInstagramAlt size={20} strokeWidth={0.3} />
          </Link>

          <Link
            href="/jornal"
            className="dark:text-[#c7c7c7] hover:dark:text-[#fffefe] text-primary cursor-pointer "
          >
            <FaGithub size={20} strokeWidth={0.3} />
          </Link>
          <hr className="h-[1.5rem] w-[2px] bg-muted-foreground opacity-30" />
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};
