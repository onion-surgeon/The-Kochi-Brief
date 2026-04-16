import { ArrowRight, CheckCircle2, Mail, Newspaper, ShieldCheck } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const featureCards = [
  {
    icon: Newspaper,
    title: "Local coverage with less noise",
    description: "Kochi stories are collected into a compact daily reading experience instead of a cluttered homepage.",
  },
  {
    icon: ShieldCheck,
    title: "Verification-first delivery",
    description: "Users sign up, log in, verify their email, and only then receive newsletter bullets in their inbox.",
  },
  {
    icon: Mail,
    title: "Email summaries that save time",
    description: "Verified readers receive concise bullet-point updates so they can scan the day fast.",
  },
];

const steps = [
  "Create your Kochi Brief account with email and password.",
  "Log in to access your dashboard and latest article feed.",
  "Request verification mail and confirm your inbox.",
  "Receive summarised Kochi news bullets by email after verification.",
];

const LandingPage = () => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.18),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(249,115,22,0.16),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(248,245,238,0.96))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,rgba(15,118,110,0.08),transparent_55%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 md:px-8 md:py-8 lg:px-12">
        <header className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-sm font-semibold text-white shadow-lg shadow-emerald-950/15">
              KB
            </div>
            <div>
              <p className="font-serif text-xl font-bold tracking-tight">The Kochi Brief</p>
              <p className="text-sm text-muted-foreground">A calmer way to follow Kochi</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="rounded-full px-6">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 md:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-16">
          <div className="max-w-2xl">
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-slate-950 sm:text-5xl md:text-6xl">
              Know what matters in Kochi without living inside a news app.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              The Kochi Brief gathers local headlines, keeps them visible on your dashboard, and sends verified users concise email bullet summaries.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/signup">
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-slate-300 bg-white/70 px-7">
                <Link to="/login">Already have an account</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {steps.map((step) => (
                <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="overflow-hidden rounded-[24px] border-white/60 bg-white/80 shadow-xl shadow-slate-900/5 backdrop-blur">
                <CardContent className="flex items-start gap-4 p-5 md:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl font-semibold text-slate-950 md:text-2xl">{title}</h2>
                    <p className="text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
