import React from "react";
import {
  Github,
  Home,
  FlaskConical,
  ShoppingBag,
  Pencil,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/toggle-mode";

export const Header = () => {
  return (
    <header className="h-[61px] flex justify-center items-center sticky top-0 z-30 mb-10 bg-gray-50 dark:bg-gray-900 transition-[background-color] bg-opacity-0 backdrop-blur-none dark:bg-opacity-0 duration-300">
      <nav className="flex flex-row justify-between items-center w-[650px] mx-2">
        <Link
          href="/"
          className="hover:text-secondary-foreground text-primary cursor-pointer"
        >
          <Home size={18} />
        </Link>
        <ul className="flex flex-row items-center p-0 list-none gap-4 text-primary">
          <Link
            href="/experiments"
            className="hover:text-secondary-foreground cursor-pointer"
          >
            <FlaskConical size={18} />
          </Link>

          <Link
            href="/jornal"
            className="hover:text-secondary-foreground cursor-pointer"
          >
            <Pencil size={18} />
          </Link>

          <Link
            href="/jornal"
            className="hover:text-secondary-foreground cursor-pointer"
          >
            <ShoppingBag size={18} />
          </Link>
          <hr className="h-[1rem] w-[1px] bg-muted-foreground" />
          <Link
            href="/jornal"
            className="hover:text-secondary-foreground cursor-pointer"
          >
            <Instagram size={18} />
          </Link>

          <Link
            href="/jornal"
            className="hover:text-secondary-foreground cursor-pointer"
          >
            <Github size={18} />
          </Link>
          <hr className="h-[1rem] w-[1px] bg-muted-foreground" />
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};
