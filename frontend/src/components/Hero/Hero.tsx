import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
      <div className="mb-6 flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2">
        <Sparkles size={16} className="text-indigo-400" />
        <span className="text-sm text-indigo-300">
          AI-Powered Repository Intelligence
        </span>
      </div>

      <h1 className="max-w-5xl text-6xl font-bold leading-tight tracking-tight">
        Understand Any
        <span className="text-indigo-400"> Repository </span>
        in Seconds.
      </h1>

      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
        Upload any GitHub repository or ZIP file and instantly understand its
        architecture, technology stack, workflow, dependencies, and AI-powered
        insights.
      </p>

      <div className="mt-12 flex gap-4">
        <button className="rounded-xl bg-indigo-600 px-7 py-3 font-medium text-white transition hover:bg-indigo-500">
          Analyze Repository
        </button>

        <button className="rounded-xl border border-slate-700 px-7 py-3 text-slate-300 transition hover:border-indigo-400 hover:text-white">
          View Demo
        </button>
      </div>
    </section>
  );
}

export default Hero;