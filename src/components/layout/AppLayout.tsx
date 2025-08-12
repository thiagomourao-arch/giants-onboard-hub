import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* compensate fixed header/footer heights */}
      <main className="container pt-16 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
