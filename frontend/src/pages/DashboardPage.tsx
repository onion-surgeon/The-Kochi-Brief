import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDays, ExternalLink, LoaderCircle, LogOut, MailCheck, RefreshCcw, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { fetchHome, sendVerificationEmail } from "@/lib/api";

const DashboardPage = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f6f1e8_0%,#f8fbf8_50%,#ffffff_100%)] px-4 py-4 text-foreground sm:px-6 sm:py-6 md:h-[100dvh] md:overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 sm:gap-5 md:h-full md:min-h-0">
        <header className="flex flex-col gap-4 rounded-[22px] border border-white/60 bg-white/85 p-4 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link to="/" className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              The Kochi Brief
            </Link>
            <h1 className="font-serif text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">Your Kochi home feed</h1>
            <p className="max-w-2xl text-sm leading-5 text-slate-600">Follow today&apos;s latest Kochi stories and manage your newsletter status in one place.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/news/today">
                <CalendarDays className="h-4 w-4" />
                Browse by date
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => homeQuery.refetch()} disabled={homeQuery.isFetching}>
              {homeQuery.isFetching ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
              Refresh
            </Button>
            <Button
              variant="ghost"
              className="rounded-full text-slate-700"
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:gap-5">
          <Card className="rounded-[22px] border-white/70 bg-white/90 shadow-xl shadow-slate-900/5 md:min-h-0 md:overflow-y-auto">
            <CardHeader className="space-y-2 p-5 pb-4">
              <CardDescription>Account</CardDescription>
              <CardTitle className="break-all font-serif text-xl leading-tight text-slate-950 sm:text-2xl">{session.email}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={home?.is_verified ? "default" : "secondary"} className="rounded-full px-3 py-1">
                  {home?.is_verified ? "Verified" : "Not verified yet"}
                </Badge>
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  Newsletter bullets by email
                </Badge>
              </div>

              <Separator />

              {home?.is_verified ? (
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-950">
                  <MailCheck className="h-4 w-4" />
                  <AlertTitle>Email verification complete</AlertTitle>
                  <AlertDescription>
                    Your account is verified, so this backend flow can send summarised Kochi news bullets to your inbox.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-amber-200 bg-amber-50 text-amber-950">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Verification is still pending</AlertTitle>
                  <AlertDescription>
                    Trigger the verification email, open the link from your inbox, and return here once your status updates.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                className="w-full rounded-full"
                onClick={() => verifyMutation.mutate()}
                disabled={verifyMutation.isPending || Boolean(home?.is_verified)}
              >
                {verifyMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MailCheck className="h-4 w-4" />}
                {home?.is_verified ? "Email already verified" : "Send verification email"}
              </Button>
            </CardContent>
          </Card>

          <Card className="flex min-h-0 flex-col rounded-[22px] border-white/70 bg-white/90 shadow-xl shadow-slate-900/5 md:overflow-hidden">
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
                      className="group rounded-[22px] border border-slate-200 bg-slate-50/75 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white sm:p-5"
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
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
