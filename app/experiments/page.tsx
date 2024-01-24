"use client";
import { BlockTitle } from "@/components/blockTitle";
import { ModalMac } from "@/components/modal-mac";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
export default function Jornal() {
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
      className="w-screen flex justify-center items-center flex-col max-w-[640px]"
      id="home"
      data-aos="zoom-in"
    >
      <BlockTitle
        title="Experimentos"
        description="Playground para experimentar novas ideias"
      />
      <ModalMac />
    </div>
  );
}
