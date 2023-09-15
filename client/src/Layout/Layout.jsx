import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Layout({ children, hideBar, hideNav = false }) {
  return (
    <>
      <main className="min-h-[90vh] bg-white dark:bg-base-200">
        {!hideNav && <Navbar />}
        <Sidebar hideBar={hideBar} />
        {children}
        <Footer />
      </main>
    </>
  );
}
