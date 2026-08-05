import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GitHub() {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const analyzeRepository = () => {
    if (!url.trim()) return;

    navigate("/loading", {
      state: {
        githubUrl: url,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6">

      <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-[#111827] p-10">

        <h1 className="text-3xl font-bold text-white">
          Analyze GitHub Repository
        </h1>

        <p className="mt-3 text-slate-400">
          Paste any public GitHub repository URL.
        </p>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/user/repository"
          className="mt-8 w-full rounded-xl border border-slate-700 bg-[#0B1120] p-4 text-white outline-none focus:border-indigo-500"
        />

        <button
          onClick={analyzeRepository}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-500"
        >
          Analyze Repository
        </button>

      </div>

    </div>
  );
}

export default GitHub;