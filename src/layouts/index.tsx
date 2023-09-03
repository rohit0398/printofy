import type { ReactNode } from "react";
import { Header } from "@/molecules/header";

import { ToastContainer } from "react-toastify";

type IProps = {
  children: ReactNode;
  showFooter?: boolean;
};
export function Layout({ children }: IProps) {
  return (
    <div className="container flex flex-col w-screen">
      <Header />
      {children}
      <ToastContainer
        theme="dark"
        className={"mt-10"}
        hideProgressBar={true}
      />
    </div>
  );
}
