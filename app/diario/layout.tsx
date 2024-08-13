import { Layout } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ryanvs | Explorando em 2024",
  description: "Minha trilha neste ano.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
