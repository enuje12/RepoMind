import { useState } from "react";
import api from "../../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  repoId: string;
};

function WorkflowExplorer({ repoId }: Props) {
  const [workflow, setWorkflow] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    if (!workflow.trim()) return;

    setLoading(true);

    try {
      const response = await api.post("/workflow", {
        repo_id: repoId,
        workflow,
      });

      setAnswer(response.data.answer);
    } catch {
      setAnswer("Unable to explain this workflow.");
    } finally {
      setLoading(false);
    }
  };

  const examples = [
  "Explain the authentication workflow",
  "Explain the API request flow",
  "Explain the database workflow",
  "Explain the deployment workflow",
];

  return (
    <div className="mt-10 rounded-2xl border border-slate-700 bg-[#111827] p-6">

      <h2 className="text-2xl font-bold mb-2">
        AI Workflow Explorer
      </h2>

      <p className="text-slate-400 mb-5">
        Understand how a feature or workflow is implemented across the repository.
      </p>

      <textarea
        value={workflow}
        onChange={(e) => setWorkflow(e.target.value)}
        placeholder="Example: Explain the authentication workflow"
        className="w-full h-28 rounded-xl border border-slate-700 bg-[#0B1120] p-4 text-white outline-none focus:border-indigo-500"
      />

      <div className="mt-4">
  <p className="mb-3 text-sm text-slate-400">
    Try these examples
  </p>

  <div className="flex flex-wrap gap-2">
    {examples.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => setWorkflow(item)}
        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm transition hover:border-indigo-500 hover:bg-slate-700"
      >
        {item}
      </button>
    ))}
  </div>
</div>

      <button
        onClick={explain}
        disabled={loading}
        className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
      >
        {loading ? "Generating..." : "Explain Workflow"}
      </button>

      {answer && (
        <div className="mt-8 rounded-2xl border border-slate-700 bg-[#0B1120] p-6">

          <h3 className="text-lg font-semibold mb-4">
            Workflow Explanation
          </h3>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {answer}
            </ReactMarkdown>
          </div>

        </div>
      )}

    </div>
  );
}

export default WorkflowExplorer;