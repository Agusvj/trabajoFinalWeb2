import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "../Cart";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Cart />
      <Footer />
    </div>
  );
}
