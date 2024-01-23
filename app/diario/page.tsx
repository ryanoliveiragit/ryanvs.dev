import { Footer } from "@/components/footer/footer";

export default function Diario() {
  return (
    <div
      className="relative w-screen  flex justify-start items-center flex-col max-w-[640px] "
      id="diario"
    >
      <h1 className="text-secondary-foreground text-3xl font-semibold mb-2">
        Explorando em 2024
      </h1>
      <h2 className="text-muted-foreground">
        Minha trilha de aprendizado neste ano.
      </h2>
      <div className="scale-x-100">
        <hr className="w-[5rem] m-[3rem]" />
      </div>

      <div className="absolute -top-24 -left-8 h-[99vh] border-l-2 border-dotted border-divider "></div>

      <div className=" flex flex-col gap-4 w-full  duration-200 transition-transform ">
        <div className=" h-full w-full rounded-xl highlight opacity-0 transition-opacity duration-300"></div>
        <a
          className="flex flex-col px-4 py-6 relative rounded-xl transition-colors duration-300 bg-[#ebebeb00] dark:dark:bg-[#1f1f1f00] hover:dark:bg-[#1f1f1f] hover:bg-[#ebebeb]"
          href="/diario/uistart"
        >
          <aside className="absolute [writing-mode:vertical-rl] h-full top-0 -left-12 md:-left-16 pr-11 text-center text-sm  dark:dark:text-[#737373] font-['Luxurious_Roman']">
            January 09th
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
            May 02th
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
