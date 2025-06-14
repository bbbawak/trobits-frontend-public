import { ReactNode } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/Footer/Footer";
// import CryptoNavbar from "../shared/navbar/CryptoNavbar";
// import Footer from "../shared/Footer/Footer";

export default function WithCommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <CryptoNavbar /> */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
