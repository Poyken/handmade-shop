import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import getCategories from "@/actions/getCategories";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "HandMade-Shop",
  description: "HandMade App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: { background: "rgb(51 65 85)", color: "#fff" },
          }}
        ></Toaster>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <main className="flex-grow">{children}</main>
            <Footer></Footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
