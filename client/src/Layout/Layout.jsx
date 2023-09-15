import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <main className="min-h-[90vh] bg-white dark:bg-base-200">
        <Navbar />
        <Sidebar />
        {children}
        <Footer />
      </main>
    </>
  );
}
