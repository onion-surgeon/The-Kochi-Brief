import NewsCard from "./NewsCard";
import { articles } from "@/data/articles";

const HighlightsSection = () => {
  const highlights = articles.filter((a) => a.isHighlight).slice(0, 4);

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Today's Highlights</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {highlights.map((a, i) => (
            <div key={a.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <NewsCard article={a} highlight />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
