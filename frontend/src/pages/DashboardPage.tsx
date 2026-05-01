import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { BadgeCheck, Bell, BellOff, CalendarDays, ExternalLink, LoaderCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { fetchHome, sendVerificationEmail, subscribeToNewsletter, unsubscribeFromNewsletter } from "@/lib/api";

const DashboardPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, logout } = useAuth();

  const homeQuery = useQuery({
    queryKey: ["home", session?.token],
    queryFn: () => fetchHome(session!.token),
    enabled: Boolean(session?.token),
    retry: false,
  });

  const verifyMutation = useMutation({
    mutationFn: () => sendVerificationEmail(session!.token),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to send verification email.");
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: () =>
      homeQuery.data?.data?.is_subscribed ? unsubscribeFromNewsletter(session!.token) : subscribeToNewsletter(session!.token),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["home", session?.token] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to update newsletter subscription.");
    },
  });

  useEffect(() => {
    if (!homeQuery.error || !session) {
      return;
    }

    const message = homeQuery.error instanceof Error ? homeQuery.error.message : "";
    if (message.toLowerCase().includes("credentials") || message.toLowerCase().includes("inactive")) {
      logout();
      navigate("/login", {
        replace: true,
        state: { notice: "Your session expired. Please log in again." },
      });
    }
  }, [homeQuery.error, logout, navigate, session]);

  if (!session) {
    return null;
  }

  const home = homeQuery.data?.data;
  const displayName = home?.user.username?.trim() || home?.user.email || session.email;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f6f1e8_0%,#f8fbf8_50%,#ffffff_100%)] px-4 py-4 text-foreground sm:px-6 sm:py-6 md:h-[100dvh] md:overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 sm:gap-5 md:h-full md:min-h-0">
        <header className="flex flex-col gap-4 rounded-[22px] border border-white/60 bg-white/85 p-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <Link to="/" className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                The Kochi Brief
              </Link>
              <div className="space-y-1">
                <h1 className="font-serif text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">Your Kochi home feed</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-medium text-slate-800">{displayName}</p>
                  {home?.is_verified ? (
                    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-emerald-600 px-3 text-xs font-medium text-white">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : null}
                </div>
                <p className="max-w-2xl text-sm leading-5 text-slate-600">
                  Stay on top of fresh Kochi stories.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:max-w-[32rem] lg:justify-end">
              {!home?.is_verified ? (
                <Button className="rounded-full" disabled={verifyMutation.isPending} onClick={() => verifyMutation.mutate()} variant="outline">
                  {verifyMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
                  Verify email
                </Button>
              ) : null}

              <Button
                variant="outline"
                className="rounded-full"
                disabled={subscriptionMutation.isPending || !home?.is_verified}
                onClick={() => subscriptionMutation.mutate()}
              >
                {subscriptionMutation.isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : home?.is_subscribed ? (
                  <BellOff className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
                {home?.is_subscribed ? "Unsubscribe" : "Subscribe"}
              </Button>

              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/news/${format(new Date(), "yyyy-MM-dd")}`}>
                  <CalendarDays className="h-4 w-4" />
                  Browse by date
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </header>

        <Card className="flex min-h-0 flex-1 flex-col rounded-[22px] border-white/70 bg-white/90 shadow-xl shadow-slate-900/5 md:overflow-hidden">
          <CardHeader className="space-y-2 p-5 pb-4">
            <CardDescription>Latest stories</CardDescription>
            <CardTitle className="font-serif text-2xl text-slate-950 sm:text-3xl">Latest Kochi articles</CardTitle>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 p-5 pt-0">
            {homeQuery.isLoading ? (
              <div className="flex min-h-72 items-center justify-center text-slate-600">
                <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />
                Loading your home feed...
              </div>
            ) : homeQuery.error ? (
              <Alert variant="destructive">
                <AlertTitle>Unable to load the home feed</AlertTitle>
                <AlertDescription>
                  {homeQuery.error instanceof Error ? homeQuery.error.message : "The request failed."}
                </AlertDescription>
              </Alert>
            ) : !home?.articles?.length ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                No articles are available yet from the backend.
              </div>
            ) : (
              <div className="grid gap-3 overflow-visible pb-1 md:h-full md:overflow-y-auto md:pr-3 dashboard-scroll">
                {home.articles.map((article) => (
                    <a
                      key={`${article.url}-${article.published}`}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[22px] border border-slate-200 bg-slate-50/75 p-4 transition hover:border-emerald-300 hover:bg-white sm:p-5"
                    >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      <span>{article.source}</span>
                      <span>{format(new Date(article.published), "dd MMM yyyy, hh:mm a")}</span>
                    </div>
                    <h2 className="mt-3 font-serif text-xl leading-tight text-slate-950 transition group-hover:text-emerald-800 sm:text-2xl">
                      {article.title}
                    </h2>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-800">
                      Open article
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
