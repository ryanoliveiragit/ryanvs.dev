"use client";
import { BlockTitle } from "@/components/blockTitle";
import { Footer } from "@/components/footer/footer";
import { BadgeRotateBorder } from "@/components/new/new";
import AOS from "aos";
import { useEffect } from "react";

export default function Diario() {
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
    <div
      className="relative w-screen  flex justify-start items-center flex-col max-w-[640px] "
      id="diario"
      data-aos="zoom-in"
    >
      <BlockTitle
        title="Explorando em 2024"
        description="Minha trilha de aprendizado neste ano."
      />

      <div className="absolute -top-24 -left-8 h-[99vh] border-l-2 border-dotted border-divider "></div>

      <div className=" flex flex-col gap-4 w-full  duration-200 transition-transform ">
        <div className=" h-full w-full rounded-xl highlight opacity-0 transition-opacity duration-300"></div>
        <a
          className="flex flex-col px-4 py-6 relative rounded-xl transition-colors duration-300 bg-[#ebebeb00] dark:dark:bg-[#1f1f1f00] hover:dark:bg-[#1f1f1f] hover:bg-[#ebebeb]"
          href="/diario/projects"
        >
          <aside className="absolute [writing-mode:vertical-rl] h-full top-0 -left-12 md:-left-16 pr-11 text-center text-sm  dark:dark:text-[#737373] font-['Luxurious_Roman']">
            12 agosto
          </aside>
          <h2 className="text-xl font-semibold flex flex-row gap-2 items-center">Projetos com Resultados <BadgeRotateBorder /></h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-[#737373]">
          Explore projetos reais, entregues com excelência aos clientes. Embora os detalhes completos estejam protegidos por acordos contratuais, esses trabalhos exemplificam a minha capacidade de transformar ideias em sucesso.
          </p>
        </a>

        <a
          className="flex flex-col px-4 py-6 relative rounded-xl transition-colors duration-300 bg-[#ebebeb00] dark:dark:bg-[#1f1f1f00] hover:dark:bg-[#1f1f1f] hover:bg-[#ebebeb]"
          href="/diario/uistart"
        >
          <aside className="absolute [writing-mode:vertical-rl] h-full top-0 -left-12 md:-left-16 pr-11 text-center text-sm  dark:dark:text-[#737373] font-['Luxurious_Roman']">
            09 Janeiro
          </aside>
          <h2 className="text-xl font-semibold ">UI Start</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-[#737373]">
            Conceitos importantes de UI Design.
          </p>
        </a>

        <a
          className="flex flex-col px-4 py-6 relative rounded-xl transition-colors duration-300 bg-[#ebebeb00] dark:dark:bg-[#1f1f1f00] hover:dark:bg-[#1f1f1f] hover:bg-[#ebebeb]"
          href="/diario/rocketseat-ignite"
        >
          <aside className="absolute [writing-mode:vertical-rl] h-full top-0 -left-12 md:-left-16 pr-11 text-center text-sm  dark:dark:text-[#737373] font-['Luxurious_Roman']">
            02 Maio
          </aside>
          <h2 className="text-xl font-semibold ">Rocketseat Ignite</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-[#737373]">
            O Ignite é um programa de aceleração com foco na sua especialização,
            para quem já domina programação
          </p>
        </a>

        <Footer />
      </div>
    </div>
  );
}
