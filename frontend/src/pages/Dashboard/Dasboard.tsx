import { Navigate, useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import RightPanel from "../../components/RightPanel/RightPanel";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import Badge from "../../components/Badge/Badge";
import MarkdownViewer from "../../components/MarkdownViewer/MarkdownViewer";
import ExportButtons from "../../components/ExportButtons/ExportButtons";

function Dashboard() {
  const location = useLocation();

  const data = location.state;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-[#0B1120] text-white">

      <Sidebar />

      <main className="ml-64 mr-80 flex-1 overflow-y-auto p-8">

        <div id="dashboard" className="mb-10">

          <h1 className="text-4xl font-bold">
            Project Analysis
          </h1>

          <p className="mt-2 text-slate-400">
            {data.repository}
          </p>

        </div>

        <div
  id="repository"
  className="grid grid-cols-1 xl:grid-cols-2 gap-6"
>

          <FeatureCard title="Project Overview">
  <p className="leading-8 text-slate-300">
    {data.overview}
  </p>
</FeatureCard>

          <FeatureCard title="Architecture">
  <p className="leading-8 text-slate-300">
    {data.architecture}
  </p>
</FeatureCard>

          <FeatureCard title="Languages">
            <div className="flex flex-wrap gap-2">
              {data.languages?.map((language: string, index: number) => (
                <Badge
                  key={index}
                  text={language}
                />
              ))}
            </div>
          </FeatureCard>

          <FeatureCard title="Frameworks">
            <div className="flex flex-wrap gap-2">
              {data.frameworks?.map((framework: string, index: number) => (
                <Badge
                  key={index}
                  text={framework}
                />
              ))}
            </div>
          </FeatureCard>

          <FeatureCard title="Strengths">
  <ul className="space-y-5">
    {data.strengths?.map((item: string, index: number) => (
      <li key={index} className="flex items-start gap-3">
        <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"></div>

        <span className="leading-8 text-slate-200">
          {item}
        </span>
      </li>
    ))}
  </ul>
</FeatureCard>

<FeatureCard title="Weaknesses">
  <ul className="space-y-5">
    {data.weaknesses?.map((item: string, index: number) => (
      <li key={index} className="flex items-start gap-3">
        <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500"></div>

        <span className="leading-8 text-slate-200">
          {item}
        </span>
      </li>
    ))}
  </ul>
</FeatureCard>

          <FeatureCard title="Suggestions">
  <ul className="space-y-5">
    {data.suggestions?.map((item: string, index: number) => (
      <li key={index} className="flex items-start gap-3">
        <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500"></div>

        <span className="leading-8 text-slate-200">
          {item}
        </span>
      </li>
    ))}
  </ul>
</FeatureCard>

          <FeatureCard title="Resume Summary">
  <p className="leading-8 text-slate-300">
    {data.resume_summary}
  </p>
</FeatureCard>

        </div>

        <div id="analysis" className="mt-12">

  <div className="mb-6 flex items-center justify-between">
  <div>
    <h2 className="text-3xl font-bold">
      Detailed Technical Report
    </h2>

    <p className="mt-2 text-slate-400">
      Comprehensive architectural analysis generated using Retrieval-Augmented Generation.
    </p>
  </div>

  <ExportButtons
    content={data.analysis}
    repository={data.repository}
  />
  </div>

<MarkdownViewer
  content={data.analysis}
/>

</div>

     
  

      </main>

      <div className="fixed right-0 top-0 h-screen w-80 border-l border-slate-800 bg-[#0B1120] p-6">
  <RightPanel score={data.score} />
</div>

    </div>
  );
}

export default Dashboard;