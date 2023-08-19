import { Header } from '@/molecules/header';
import type { ReactNode } from 'react';


type IProps = {
  children: ReactNode;
  showFooter?: boolean;
};
export function Layout({ children }: IProps) {
  return (
    <div className=" container flex flex-col h-screen w-screen">
      <Header />
      {children}
    </div>
  );
}
