import { FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

type HoverCardType = {
  image: string;
  name: string;
  href?: string
};

export function HoverCardDemo({ image, name, href }: HoverCardType) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="hover:no-underline -ml-4">
          <a
            target="_blank"
            href={href}
            className={`flex flex-row gap-2 items-center text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 after:bg-blue-600 after:hover:bg-blue-700 dark:after:bg-blue-300 dark:after:hover:bg-blue-400 relative whitespace-nowrap after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:rounded-full hover:after:w-full after:ease after:transition-[width] after:duration-200 hover:after:ease-out`}
          >
            {name} <FaExternalLinkAlt size={12} />
          </a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="dark:bg-[#161616] p-[.8rem]">
        <Image width={300} height={300} alt="" src={`${image}`} />
      </HoverCardContent>
    </HoverCard>
  );
}
