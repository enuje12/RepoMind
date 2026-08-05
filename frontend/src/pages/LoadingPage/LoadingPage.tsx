import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, CheckCircle2 } from "lucide-react";
import api from "../../services/api";

function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { file, githubUrl } = location.state || {};

  useEffect(() => {
    if (!file && !githubUrl) {
      navigate("/");
      return;
    }

    const analyzeRepository = async () => {
      try {
        let response;

        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          response = await api.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          response = await api.post("/github", {
            github_url: githubUrl,
          });
        }

        navigate("/dashboard", {
          state: response.data,
        });
      } catch (error) {
        console.error(error);
        alert("Unable to analyze repository.");
        navigate("/");
      }
    };

    analyzeRepository();
  }, [file, githubUrl, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-[#111827] p-10 shadow-2xl">

        <div className="flex justify-center">
          <LoaderCircle
            size={72}
            className="animate-spin text-indigo-500"
          />
        </div>

        <h1 className="mt-8 text-center text-4xl font-bold">
          Analyzing Repository
        </h1>

        <p className="mt-3 text-center text-slate-400">
          RepoMind AI is understanding your project and generating technical insights.
        </p>

        <div className="mt-10 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full animate-pulse rounded-full bg-indigo-500" />
        </div>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-3">
            <CheckCircle2
              size={20}
              className="text-emerald-500"
            />
            <span>Uploading repository</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2
              size={20}
              className="text-emerald-500"
            />
            <span>Extracting project structure</span>
          </div>

          <div className="flex items-center gap-3">
            <LoaderCircle
              size={20}
              className="animate-spin text-indigo-400"
            />
            <span>Reading important source files</span>
          </div>

          <div className="flex items-center gap-3">
            <LoaderCircle
              size={20}
              className="animate-spin text-indigo-400"
            />
            <span>Generating AI repository analysis</span>
          </div>

          <div className="flex items-center gap-3">
            <LoaderCircle
              size={20}
              className="animate-spin text-indigo-400"
            />
            <span>Preparing dashboard</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LoadingPage;