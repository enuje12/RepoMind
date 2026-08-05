import { useRef } from "react";
import { Upload, FolderOpen, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UploadCard() {
  

  const fileInputRef = useRef<HTMLInputElement>(null);


  const navigate = useNavigate();

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.name.endsWith(".zip")) {
    alert("Please upload a ZIP file.");
    return;
  }

  navigate("/loading", {
    state: { file },
  });
};

  return (
    <section className="mx-auto mt-10 max-w-5xl px-6">
      <div className="rounded-3xl border border-slate-700 bg-[#111827] p-12 shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="mb-6 rounded-full bg-indigo-500/10 p-6">
            <Upload className="h-12 w-12 text-indigo-400" />
          </div>

          <h2 className="text-3xl font-semibold">
            Upload Repository
          </h2>

          <p className="mt-3 text-slate-400">
            Drag & Drop your ZIP file to begin AI analysis.
          </p>

          <div className="mt-10 w-full rounded-2xl border-2 border-dashed border-slate-600 p-16 transition hover:border-indigo-500 hover:bg-slate-900">
            <div className="flex flex-col items-center">
              <Upload className="mb-4 h-10 w-10 text-slate-400" />

              <p className="text-lg font-medium">
                Drag & Drop Repository ZIP
              </p>

              <span className="mt-2 text-slate-500">
                or
              </span>

              <input
                type="file"
                accept=".zip"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="mt-8 flex gap-5">
                <button
                onClick={handleBrowse}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
                >
               <FolderOpen size={18} />
               Browse ZIP
               </button>

                <button
  onClick={() => navigate("/github")}
  className="flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-slate-300 hover:border-indigo-500 hover:text-white"
>
  <Code2 size={18} />
  GitHub Repository
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadCard;