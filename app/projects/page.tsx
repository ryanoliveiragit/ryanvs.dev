
import { Footer } from "@/components/footer/footer";
import { TableDemo } from "@/components/table";

export default function Projects() {

  return (
    <div
      className="w-screen flex justify-center items-center flex-col max-w-[640px] p-4"
      id="home"
      data-aos="zoom-in"
    >
      <div data-aos="fade-up" className="flex flex-col items-center">
        <h1 className="text-secondary-foreground text-3xl font-semibold mb-2">
          Projetos
        </h1>
        <h2 className="text-muted-foreground">
          Seleção alegre do meu trabalho
        </h2>
      </div>
      <div className="scale-x-100">
        <hr className="w-[5rem] m-[3rem]" />
      </div>
      <TableDemo />
      <Footer />
    </div>
  );
}
