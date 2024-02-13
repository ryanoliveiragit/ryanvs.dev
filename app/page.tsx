"use client";
import { BlockTitle } from "@/components/blockTitle";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
    });
    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <section
      className="w-full flex justify-center items-center flex-col max-w-[640px]"
      id="home"
    >
      <BlockTitle title="Ryan Oliveira" description="Frontend Developer" />
      <div data-aos="zoom-in">
        <p className="text-gray-600 dark:text-gray-400">
          Em uma jornada para criar{" "}
          <span className="group relative top-[6px] inline-block cursor-text overflow-hidden">
            <span className="invisible">aplicativos de alta qualidade</span>
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text absolute top-0 left-0 group-hover:-translate-y-full transition-transform duration-500 ease-in-out hover:duration-300">
              aplicativos de alta qualidade
            </span>
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out hover:duration-300">
              aplicativos de alta qualidade
            </span>
          </span>
          , meu foco está na criação de{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500 after:bg-gradient-to-r relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-[130px] after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out">
            interfaces fluidas
          </span>
          , que combinam{" "}
          <span className="group relative">
            <span className="absolute -inset-0 bg-gradient-to-r from-blue-500 to-purple-400 rounded-lg opacity-10 blur group-hover:opacity-40 group-hover:blur-md animate-tilt transition-all duration-300 ease-in-out"></span>
            <span className="relative bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
              usabilidade e design
            </span>
          </span>
        </p>
     
      </div>
    </section>
  );
}
