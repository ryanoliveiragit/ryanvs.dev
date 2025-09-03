"use client";
import { BlockTitle } from "@/components/blockTitle";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import { ArrowRight, Github, ExternalLink, Mail } from "lucide-react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out-cubic'
    });
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <section
      className="w-full flex justify-center items-center flex-col max-w-2xl mx-auto px-6"
      id="home"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16 mt-4">
        <BlockTitle title="Ryan Oliveira" description="Frontend Developer" />
        
        <div data-aos="fade-up" data-aos-delay="200">
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg mx-auto">
            Criando experiências digitais modernas com foco em{" "}
            <span className="text-black dark:text-white font-medium">
              performance
            </span>
            ,{" "}
            <span className="text-black dark:text-white font-medium">
              usabilidade
            </span>{" "}
            e design limpo.
          </p>
        </div>
      </div>

   

      {/* Featured Project Preview */}
      <div 
        className="w-full p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg"
        data-aos="fade-up" 
        data-aos-delay="800"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              Projeto em Destaque
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Aplicação web moderna construída com as melhores práticas
            </p>
          </div>
          <div className="flex gap-3">
            <a 
              href="#" 
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Ver código no GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Ver projeto ao vivo"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['React', 'TypeScript', 'Next.js', 'Tailwind'].map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <a
          href="/diario"
          className="group inline-flex items-center gap-2 text-black dark:text-white font-medium hover:gap-3 transition-all duration-200"
        >
          Ver todos os projetos
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

    </section>
  );
}