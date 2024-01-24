import Image from "next/image";
import Link from "next/link";

export const ModalMac = () => {
  return (
    <Link
      href="/experiments/githubContribuitions"
      className="grayscale hover:grayscale-0"
    >
      <section className=" group flex h-full w-full max-w-[640px] flex-col overflow-hidden rounded-lg border border-divider cursor-ne-resize hover:scale-[1.03] transition-all ease-out duration-300">
        <div className="relative flex h-12 w-full flex-row items-center space-x-2 px-4 bg-gray-100 text-[#747474] dark:bg-[#171717] group-hover:text-gray-700 dark:group-hover:text-gray-300">
          <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-[#292929] opacity-1 xs:opacity-100 text-black flex group-hover:bg-[#FF453A] transition-all ease-out duration-300"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-[#292929] opacity-1 xs:opacity-100 text-black flex group-hover:bg-[#FFD60A] transition-all ease-out duration-300"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-[#292929] opacity-1 xs:opacity-100 text-black flex group-hover:bg-[#30D158] transition-all ease-out duration-300"></div>
          <span className="flex-grow"></span>
          <div className="absolute left-0 !ml-0 w-full">
            <div className="mx-auto w-[calc(100%-16px)] whitespace-nowrap rounded-md bg-gray-200 py-1 px-4 text-center text-sm dark:bg-[#292929] 00 xs:w-72 sm:w-80 transition-all ease-out duration-300">
              Github Contributions
            </div>
          </div>
          <span className="opacity-1 xs:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all ease-out duration-300">
            →
          </span>
        </div>

        <div className="flex bg-gray-50 glass dark:bg-[#111111] h-60 p-8 xs:h-80 transition-all ease-out duration-300 ">
          <section className="p-2 flex justify-center items-center">
            <Image
              width={900}
              height={700}
              src="https://alexandru.so/images/experiments/github-contributions.svg"
              alt=""
            />
          </section>
        </div>
      </section>
    </Link>
  );
};
