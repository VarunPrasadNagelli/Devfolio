import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="font-semibold tracking-tight">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md hover:bg-slate-100 ${
                  isActive ? "text-slate-900" : "text-slate-600"
                }`
              }
            >
              VarunPrasad Nagelli
            </NavLink>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md hover:bg-slate-100 ${
                  isActive ? "text-slate-900" : "text-slate-600"
                }`
              }
            >
              Projects
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 text-xs text-slate-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} VarunPrasad Nagelli</div>
          <div className="space-x-4">
            <a
              className="hover:underline"
              href="mailto:nagellivarunprasad44@gmail.com"
            >
              Email
            </a>
            <a
              className="hover:underline"
              href="https://www.linkedin.com/in/varunprasad-nagelli-5310a0215/"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="hover:underline"
              href="https://github.com/VarunPrasadNagelli"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
