import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </>
  );
}