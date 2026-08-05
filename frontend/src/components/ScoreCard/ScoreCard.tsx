type ScoreCardProps = {
  score: number;
};

function ScoreCard({ score }: ScoreCardProps) {
  const getStatus = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  const getColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6 shadow-lg">
      <p className="text-sm text-slate-400">
        Repository Score
      </p>

      <h1 className="mt-3 text-6xl font-bold text-indigo-400">
        {score}
      </h1>

      <p className={`mt-2 font-medium ${getColor(score)}`}>
        {getStatus(score)}
      </p>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Architecture</span>
          <span>92%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Maintainability</span>
          <span>88%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Documentation</span>
          <span>81%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Security</span>
          <span>90%</span>
        </div>

      </div>
    </div>
  );
}

export default ScoreCard;