import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="flex">

        <Sidebar />

    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden bg-slate-50">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;