type BadgeProps = {
  text: string;
};

function Badge({ text }: BadgeProps) {
  return (
    <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20">
      {text}
    </span>
  );
}

export default Badge;