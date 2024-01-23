import { Footer } from "@/components/footer/footer";
import Image from "next/image";

export default function UiStart() {
  return (
    <div
      className="relative w-screen  flex justify-start items-center flex-col max-w-[640px] "
      id="diario"
    >
      <h1 className="text-secondary-foreground text-3xl font-semibold mb-2">
        UI Start
      </h1>
      <h2 className="text-muted-foreground">
        conhecer conceitos importantes de UI Design
      </h2>
      <div className="scale-x-100">
        <hr className="w-[5rem] m-[3rem]" />
      </div>

      <div className=" flex flex-col gap-2 w-full  duration-200 transition-transform">
        <div className="absolute -top-24 -left-8 h-full border-l-2 border-dotted border-divider "></div>
        <div className="flex flex-1 flex-col px-4 py-6 relative rounded-xl transition-colors duration-300 bg-[#ebebeb00] dark:dark:bg-[#1f1f1f00]">
          <aside className="absolute  [writing-mode:vertical-rl] h-[250px] -top-44 -left-12 md:-left-16 pr-11 text-center text-sm  dark:text-[#737373] font-['Luxurious_Roman']">
            09 de janeiro 2024 • 2 min de leitura
          </aside>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold ">O que é?</h2>
              <h3 className="dark:text-[#b8b8b8] text-sm">
                Este curso abrange fundamentos essenciais, desde teoria do
                design até ferramentas modernas.
              </h3>
              <Image
                alt="a"
                height={200}
                width={900}
                src="https://cdn.discordapp.com/attachments/1179982136015589477/1198845771248849048/open-graph.png?ex=65c06321&is=65adee21&hm=3da787706229bd0a5b992a67f40bf5a3e552e6d733dcfbfe4958815a7e65039a&"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-xl font-semibold ">Introdução</h2>
              <h3 className="dark:text-[#b8b8b8] text-sm">
                Curso abrange introdução ao UI/UX, fundamentos de design,
                processos de criação de interfaces e prática em mobile e web,
                proporcionando habilidades para desenvolver interfaces
                eficientes e atraentes.
              </h3>
            </div>
            <hr />
            <div className="flex flex-col gap-3 mt-4">
              <h2 className="text-xl font-semibold ">Dashboard</h2>
              <h3 className="text-md font-semibold ">
                ⚡️ Monitoramento em Tempo Real com Consumo de APIs
              </h3>
              <p className="dark:text-[#b8b8b8] text-sm">
                Este painel proporciona uma visão holística, capacitando os
                usuários a extrair conhecimentos valiosos de maneira eficiente.
              </p>
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <Image
                alt="a"
                height={200}
                width={900}
                src="https://cdn.discordapp.com/attachments/1179982136015589477/1198843462280286300/Default.png?ex=65c060fa&is=65adebfa&hm=618ad9d87ea21332b9fee2d94e0329fe30f86bde9ecfa580f5061b55a5380190&"
              />
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <h2 className="text-xl font-semibold ">Tela de logIn</h2>
              <h3 className="text-md font-semibold ">⚡️ Simples e objetiva</h3>
              <p className="dark:text-[#b8b8b8] text-sm">
                projetada para oferecer uma experiência simples e intuitiva aos
                usuários, proporcionando um acesso fácil e seguro. Com um design
                limpo e minimalista, a interface busca facilitar a interação do
                usuário, mantendo a atenção nos elementos essenciais. O layout é
                organizado de forma lógica, com campos de entrada para e-mail e
                senha claramente visíveis.
              </p>
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <Image
                alt="a"
                height={200}
                width={900}
                src="https://cdn.discordapp.com/attachments/1179982136015589477/1198842889128656946/Desktop_-_11.png?ex=65c06072&is=65adeb72&hm=b796d8176deddb30ffd93ac04170805db79f122a89498e8214d13bb60efe971e&"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
