import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderGit2,
  FileSearch,
  MessageSquare,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActive(id);
  };

  useEffect(() => {
    const sections = ["dashboard", "repository", "analysis", "chat"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-[#0F172A] p-6">

      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              RepoMind AI
            </h1>

            <p className="text-xs text-slate-400">
              Repository Intelligence
            </p>
          </div>
        </div>

        <nav className="space-y-3">

          <button
            onClick={() => scrollToSection("dashboard")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
              active === "dashboard"
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => scrollToSection("repository")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
              active === "repository"
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <FolderGit2 size={20} />
            Repository
          </button>

          <button
            onClick={() => scrollToSection("analysis")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
              active === "analysis"
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <FileSearch size={20} />
            Analysis
          </button>

          <button
            onClick={() => scrollToSection("chat")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
              active === "chat"
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <MessageSquare size={20} />
            Chat
          </button>

        </nav>
      </div>

      <div className="mt-auto rounded-2xl border border-slate-700 bg-[#111827] p-5">
        <h2 className="font-semibold">
          RepoMind AI
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          AI-powered repository analysis, architecture mapping and code insights.
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;