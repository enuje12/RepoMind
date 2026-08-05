type Props = {
  title: string;
  children: React.ReactNode;
};

function FeatureCard({ title, children }: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6 shadow-lg hover:border-indigo-500 transition">

      <h2 className="mb-5 border-b border-slate-700 pb-3 text-xl font-semibold">
        {title}
      </h2>

      <div className="text-slate-300">
        {children}
      </div>

    </div>
  );
}

export default FeatureCard;