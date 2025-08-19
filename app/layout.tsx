import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import PlausibleProvider from "next-plausible";
const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ryanvs | Frontend Developer",
  description: "Frontend Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const GAID = process.env.GaID || '';
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <GoogleAnalytics gaId="G-M7QWT8CMKQ" />
      <PlausibleProvider domain="ryanvs.dev">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
        </body>
      </PlausibleProvider>
    </html>
  );
}
