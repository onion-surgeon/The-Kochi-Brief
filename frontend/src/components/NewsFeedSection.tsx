import { useState } from "react";
import NewsCard from "./NewsCard";
import { articles, categories } from "@/data/articles";

const NewsFeedSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Latest News</h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.map((a, i) => (
            <div key={a.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <NewsCard article={a} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No articles in this category yet.</p>
        )}
      </div>
    </section>
  );
};

export default NewsFeedSection;
