import { ChangeEvent, useMemo } from "react";
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { dailyNewsByDate, TODAY_NEWS_DATE, TODAY_NEWS_KEY } from "@/data/newsByDate";

function resolveDateFromRoute(dayKey: string | undefined) {
  if (!dayKey || dayKey === TODAY_NEWS_KEY) {
    return TODAY_NEWS_DATE;
  }

  return dayKey;
}

const NewsByDatePage = () => {
  const navigate = useNavigate();
  const { dayKey } = useParams();

  const selectedDate = resolveDateFromRoute(dayKey);
  const articles = dailyNewsByDate[selectedDate] || [];

  const availableDates = useMemo(
    () => Object.keys(dailyNewsByDate).sort((first, second) => second.localeCompare(first)),
    [],
  );

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    const nextDate = event.target.value;
    navigate(nextDate === TODAY_NEWS_DATE ? `/news/${TODAY_NEWS_KEY}` : `/news/${nextDate}`);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f6f1e8_0%,#f8fbf8_55%,#ffffff_100%)] px-4 py-4 text-foreground sm:px-6 sm:py-6 md:h-[100dvh] md:overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 md:h-full md:min-h-0">
        <header className="rounded-[22px] border border-white/60 bg-white/85 p-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Link to="/home" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-800">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <div className="space-y-1.5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">News by date</p>
                <h1 className="font-serif text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
                  Browse Kochi news for a specific day
                </h1>
                <p className="max-w-2xl text-sm leading-5 text-slate-600">
                  Start with today’s coverage, then jump to another date to revisit the news and its quick summaries.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[220px_auto] sm:items-end">
              <div className="space-y-2">
                <label htmlFor="news-date" className="text-sm font-medium text-slate-700">
                  Choose a date
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="news-date"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="h-11 rounded-full border-slate-200 bg-white pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableDates.slice(0, 3).map((date) => (
                  <Button
                    key={date}
                    type="button"
                    variant={date === selectedDate ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => navigate(date === TODAY_NEWS_DATE ? `/news/${TODAY_NEWS_KEY}` : `/news/${date}`)}
                  >
                    {date === TODAY_NEWS_DATE ? "Today" : format(new Date(`${date}T00:00:00`), "dd MMM")}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <Card className="flex min-h-0 flex-col rounded-[22px] border-white/70 bg-white/90 shadow-xl shadow-slate-900/5 md:overflow-hidden">
          <CardHeader className="space-y-1.5 p-4 pb-3 sm:p-5 sm:pb-4">
            <CardDescription>{format(new Date(`${selectedDate}T00:00:00`), "dd MMMM yyyy")}</CardDescription>
            <CardTitle className="font-serif text-2xl text-slate-950 sm:text-3xl">Daily Kochi roundup</CardTitle>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 p-4 pt-0 sm:p-5 sm:pt-0">
            {articles.length ? (
              <div className="space-y-3 overflow-visible pt-1 pb-4 md:h-full md:overflow-y-auto md:pr-3 dashboard-scroll">
                {articles.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[18px] border border-slate-200 bg-slate-50/80 p-3.5 transition hover:border-emerald-300 hover:bg-white sm:p-4"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <span>{article.source}</span>
                      <span>{format(new Date(article.published), "dd MMM yyyy, hh:mm a")}</span>
                    </div>
                    <h2 className="mt-2 font-serif text-lg leading-tight text-slate-950 sm:text-xl">{article.title}</h2>
                    <p className="mt-2.5 max-w-4xl text-sm leading-6 text-slate-650">{article.summary}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <Badge variant="outline" className="rounded-full px-3 py-1 text-xs text-slate-700">
                        Summarised update
                      </Badge>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800">
                        Open article
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                No hardcoded news is available for this date yet. Try one of the recent dates above.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsByDatePage;
