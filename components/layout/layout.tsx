import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <section className="w-full h-full flex justify-center px-4">{children}</section>;
};
