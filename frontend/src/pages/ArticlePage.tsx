import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold mb-2">Article not found</h1>
            <Link to="/" className="text-primary hover:underline text-sm">← Back to home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="container max-w-2xl py-12 animate-fade-in-up">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">{article.readTime}</span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-4">
            {article.summary}
          </p>

          <div className="prose prose-neutral max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-foreground/90 leading-relaxed mb-4 text-[15px]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
