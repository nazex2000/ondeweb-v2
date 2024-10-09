import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "../components/layout/layout";

export const metadata = {
  title: "Onde",
  description: "Pesquisa e descobre Moçambique",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
