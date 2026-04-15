import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import MidPageSubscribe from "@/components/MidPageSubscribe";
import NewsFeedSection from "@/components/NewsFeedSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <HeroSection />
      <HighlightsSection />
      <MidPageSubscribe />
      <NewsFeedSection />
    </main>
    <Footer />
  </div>
);

export default Index;
