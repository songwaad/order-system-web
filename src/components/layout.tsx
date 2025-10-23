import type { ReactNode } from "react";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar /> 
      <main className="w-4xl mt-20 mx-auto">{children}</main>
    </div>
  );
}