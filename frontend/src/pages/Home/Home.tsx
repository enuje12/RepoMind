import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import UploadCard from "../../components/Upload/Upload";

function Home() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">

      <Navbar />

      <Hero />

      <UploadCard />

    </div>
  );
}

export default Home;