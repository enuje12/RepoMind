import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

function MarkdownViewer({ content }: Props) {
  return (
    <article className="rounded-2xl border border-slate-700 bg-[#111827] p-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="first:mt-0 mt-8 mb-4 text-2xl font-bold text-white">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mt-6 mb-3 text-lg font-semibold text-white">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mt-5 mb-2 text-base font-semibold text-white">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-5 text-base leading-8 text-slate-300">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="mb-5 ml-6 list-disc space-y-2 text-slate-300">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-5 ml-6 list-decimal space-y-2 text-slate-300">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-8">
              {children}
            </li>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),

          code: ({ children }) => (
            <code className="rounded-md bg-slate-800 px-1.5 py-1 font-mono text-sm text-indigo-300">
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre className="mb-5 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 p-4">
              {children}
            </pre>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-4 border-indigo-500 pl-4 italic text-slate-400">
              {children}
            </blockquote>
          ),

          table: ({ children }) => (
            <table className="my-5 w-full border-collapse overflow-hidden rounded-lg">
              {children}
            </table>
          ),

          th: ({ children }) => (
            <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left font-semibold text-white">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-slate-700 px-4 py-2 text-slate-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

export default MarkdownViewer;