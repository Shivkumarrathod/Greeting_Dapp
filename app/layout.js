import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Providers } from "./components/Providers";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata= {
  title: "Solidity Next.js Starter",
  description:
    "A starter kit for building full stack Ethereum dApps with Solidity and Next.js",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}