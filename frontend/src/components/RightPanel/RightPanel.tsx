type Props = {
  score: number;
};

function RightPanel({ score }: Props) {
  return (
    <aside className="w-72 space-y-6">

      <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

        <h2 className="text-lg font-semibold">
          Repository Score
        </h2>

        <h1 className="mt-4 text-6xl font-bold text-indigo-400">
          {score}
        </h1>

      </div>

      <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

        <h2 className="mb-4 font-semibold">
          Quick Stats
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Languages</span>
            <span>2</span>
          </div>

          <div className="flex justify-between">
            <span>Frameworks</span>
            <span>3</span>
          </div>

          <div className="flex justify-between">
            <span>Suggestions</span>
            <span>5</span>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default RightPanel;