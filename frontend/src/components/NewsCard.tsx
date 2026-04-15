import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/data/articles";

const categoryColors: Record<string, string> = {
  Local: "bg-accent text-accent-foreground",
  Business: "bg-primary/10 text-primary",
  Traffic: "bg-orange-100 text-orange-700",
  Events: "bg-violet-100 text-violet-700",
  Weather: "bg-sky-100 text-sky-700",
};

interface NewsCardProps {
  article: Article;
  highlight?: boolean;
}

const NewsCard = ({ article, highlight = false }: NewsCardProps) => {
  return (
    <Link
      to={`/article/${article.id}`}
      className={`group block rounded-lg border bg-card p-5 transition-all duration-200 hover:shadow-md ${
        highlight ? "md:p-6" : ""
      }`}
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Badge variant="secondary" className={categoryColors[article.category] || ""}>
          {article.category}
        </Badge>
        <span className="text-xs text-muted-foreground">{article.readTime}</span>
        <span className="text-xs text-muted-foreground ml-auto">{article.date}</span>
      </div>

      <h3 className={`font-serif font-semibold text-foreground group-hover:text-primary transition-colors mb-2 ${
        highlight ? "text-xl" : "text-lg"
      }`}>
        {article.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
        {article.summary}
      </p>

      <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {highlight ? "Read Full Story" : "Read Full Article"}
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
};

export default NewsCard;
