import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

const PageContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <main
    className={`bg-white text-slate-950 w-full md:w-3/4 mx-auto md:p-8 pb-8 ${inter.className}`}
  >
    {children}
  </main>
);

export default PageContainer;
