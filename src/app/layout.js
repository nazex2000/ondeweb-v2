import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "../components/layout/layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
