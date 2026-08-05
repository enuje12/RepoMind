import { useState } from "react";
import api from "../../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  repoId: string;
};

function ChatBox({ repoId }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    console.log("Repo ID:", repoId);
    console.log("Question:", question);

    setLoading(true);

    try {
      const payload = {
        repo_id: repoId,
        question,
      };

      console.log("Payload:", payload);

      const response = await api.post("/chat", payload);

      setAnswer(response.data.answer);
      setSources(response.data.sources || []);
    } catch (error) {
      console.error(error);
      setAnswer("Unable to answer your question.");
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-2xl border border-slate-700 bg-[#111827] p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Chat with Repository
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about this repository..."
        className="h-32 w-full rounded-xl border border-slate-700 bg-[#0B1120] p-4 text-white outline-none focus:border-indigo-500"
      />

      <button
        onClick={askQuestion}
        disabled={loading}
        className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-medium transition hover:bg-indigo-500 disabled:opacity-60"
      >
        {loading ? "Thinking..." : "Ask RepoMind"}
      </button>

      {answer && (
        <div className="mt-8 rounded-2xl border border-slate-700 bg-[#0B1120] p-6">

          <h3 className="mb-4 text-lg font-semibold">
            Answer
          </h3>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {answer}
            </ReactMarkdown>
          </div>

          {sources.length > 0 && (
            <>
              <h3 className="mt-8 mb-3 text-lg font-semibold">
                Sources
              </h3>

              <div className="flex flex-wrap gap-2">
                {sources.map((source, index) => (
                  <span
                    key={index}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-sm text-slate-300"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default ChatBox;