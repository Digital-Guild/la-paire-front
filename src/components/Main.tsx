import { ReactNode } from "react";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

type MainProps = {
  children: ReactNode;
};
function Main({ children }: MainProps) {
  return (
    <>
      <Header />
      <div className="flex flex-col mt-[100px] max-w-[1440px] mx-auto">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Main;
