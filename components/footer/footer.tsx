import { FaHeart } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center mb-14">
      <div className="scale-x-100">
        <hr className="w-[5rem] m-[3rem]" />
      </div>

      <p className="text-muted-foreground font-light text-sm text-wrap text-center flex flex-row items-center gap-1">
        Feito com <span className="text-red-500">❤</span>por{" "}
        <a
          href="https://www.linkedin.com/in/ryan-oliveira-169a371a4/"
          target="_blank"
          className="font-normal dark:text-gray-200 hover:underline"
        >
          Ryan Oliveira
        </a>
      </p>
    </footer>
  );
};
