import { Footer } from "@/components/footer/footer";
import { ProjectMockup } from "@/components/projects-mockup/projects-mockup";
import { projects } from "@/utils/projects";

export default function RocketseatIgnite() {
  return (
    <div
      className="relative w-screen  flex justify-start items-center flex-col max-w-[640px] "
      id="diario"
    >
      <h1 className="text-secondary-foreground text-3xl font-semibold mb-2">
        Ignite Rocketseat
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
            {projects.map((project, index) => (
              <ProjectMockup key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
