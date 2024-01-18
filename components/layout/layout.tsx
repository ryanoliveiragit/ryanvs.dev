import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <section className="h-full flex justify-center mx-2">{children}</section>;
};
