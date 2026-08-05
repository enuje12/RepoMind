import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Dashboard from "./pages/Dashboard/Dasboard";
import GitHub from "./pages/GitHub/GitHub";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/github" element={<GitHub />}/>

      <Route path="/loading" element={<LoadingPage />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;