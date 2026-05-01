import { ChangeEvent, useEffect } from "react";
import { format, subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, ExternalLink, LoaderCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { fetchArticlesByDay } from "@/lib/api";

function getTodayDateString() {
  return format(new Date(), "yyyy-MM-dd");
}

function resolveDateFromRoute(dayKey: string | undefined) {
  if (!dayKey) {
    return getTodayDateString();
  }

  return dayKey;
}

const NewsByDatePage = () => {
  const navigate = useNavigate();
  const { dayKey } = useParams();
  const { session, logout } = useAuth();

  const selectedDate = resolveDateFromRoute(dayKey);
  const todayDate = getTodayDateString();
  const quickDates = [1, 2].map((daysBack) => format(subDays(new Date(), daysBack), "yyyy-MM-dd"));

  const articlesQuery = useQuery({
    queryKey: ["articles-by-day", selectedDate, session?.token],
    queryFn: () => fetchArticlesByDay(selectedDate, session!.token),
    enabled: Boolean(session?.token),
    retry: false,
  });

  useEffect(() => {
    if (!articlesQuery.error || !session) {
      return;
    }

    const message = articlesQuery.error instanceof Error ? articlesQuery.error.message : "";
    if (message.toLowerCase().includes("credentials") || message.toLowerCase().includes("inactive")) {
      logout();
      navigate("/login", {
        replace: true,
        state: { notice: "Your session expired. Please log in again." },
      });
    }
  }, [articlesQuery.error, logout, navigate, session]);

  if (!session) {
    return null;
  }

  const articles = articlesQuery.data?.data ?? [];

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    const nextDate = event.target.value;
    navigate(`/news/${nextDate}`);
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
                  Catch up on Kochi news by date
                </h1>
                <p className="max-w-2xl text-sm leading-5 text-slate-600">
                  Pick any day to revisit the stories published from Kochi and scan the updates in one place.
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
                <Button
                  type="button"
                  variant={selectedDate === todayDate ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => navigate(`/news/${todayDate}`)}
                >
                  Today
                </Button>
                {quickDates.map((date) => (
                  <Button
                    key={date}
                    type="button"
                    variant={date === selectedDate ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => navigate(`/news/${date}`)}
                  >
                    {format(new Date(`${date}T00:00:00`), "dd MMM")}
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
            {articlesQuery.isLoading ? (
              <div className="flex min-h-72 items-center justify-center text-slate-600">
                <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />
                Loading articles for this day...
              </div>
            ) : articlesQuery.error ? (
              <Alert variant="destructive">
                <AlertTitle>Unable to load articles</AlertTitle>
                <AlertDescription>
                  {articlesQuery.error instanceof Error ? articlesQuery.error.message : "The request failed."}
                </AlertDescription>
              </Alert>
            ) : articles.length ? (
              <div className="space-y-3 overflow-visible pb-4 pt-1 md:h-full md:overflow-y-auto md:pr-3 dashboard-scroll">
                {articles.map((article) => (
                  <a
                    key={`${article.url}-${article.published}`}
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[18px] border border-slate-200 bg-slate-50/80 p-3 transition hover:border-emerald-300 hover:bg-white sm:p-3.5 md:grid md:h-[calc((100%-0.75rem)/2)] md:grid-rows-[auto_minmax(0,1fr)_auto] md:overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <span>{article.source}</span>
                      <span>{format(new Date(article.published), "dd MMM yyyy, hh:mm a")}</span>
                    </div>
                    <h2 className="mt-2 line-clamp-2 self-start font-serif text-base leading-tight text-slate-950 sm:text-lg md:text-xl">
                      {article.title}
                    </h2>
                    <div className="pt-2 flex items-center justify-end gap-3">
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
                No articles are available for this date yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsByDatePage;
