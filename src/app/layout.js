import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Inicío | Instituto Nília",
  description: "Implementando estratégias psico-pedagógicas para o desenvolvimento integral dos alunos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
