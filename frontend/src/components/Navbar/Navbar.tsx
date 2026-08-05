function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-[#0B1120]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-indigo-400">
          RepoMind AI
        </h1>

        <div className="flex items-center gap-8 text-sm text-slate-300">
          <button className="hover:text-white transition">
            Features
          </button>

          <button className="hover:text-white transition">
            Docs
          </button>

          <button className="hover:text-white transition">
            GitHub
          </button>

          <button className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500 transition">
            Analyze Repository
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;