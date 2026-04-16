import { FormEvent, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { login, signup } from "@/lib/api";

type AuthPageProps = {
  mode: "signup" | "login";
};

const authCopy = {
  signup: {
    title: "Create your Kochi Brief account",
    description: "Sign up first, then log in and verify your email to start the newsletter flow.",
    submit: "Sign up",
    alternateLabel: "Already have an account?",
    alternateHref: "/login",
    alternateAction: "Log in",
  },
  login: {
    title: "Log in to your dashboard",
    description: "Use your account credentials to access the home feed and trigger email verification.",
    submit: "Log in",
    alternateLabel: "Need an account first?",
    alternateHref: "/signup",
    alternateAction: "Sign up",
  },
};

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, login: setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const incomingNotice = location.state?.notice;
    if (incomingNotice) {
      setNotice(incomingNotice);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  if (session) {
    return <Navigate to="/home" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (mode === "signup") {
        const response = await signup({ email, password });
        toast.success(response.message);
        navigate("/login", {
          replace: true,
          state: {
            notice: "Account created. Log in next, then send your verification email from the dashboard.",
          },
        });
        return;
      }

      const response = await login({ email, password });
      setSession(response.data);
      toast.success(response.message);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to continue.");
    } finally {
      setSubmitting(false);
    }
  }

  const copy = authCopy[mode];

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(248,245,238,0.98),rgba(238,246,241,0.96))] px-6 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-semibold text-slate-950">
            The Kochi Brief
          </Link>
        </div>

        <section className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md rounded-[32px] border-white/70 bg-white/85 shadow-2xl shadow-slate-900/10 backdrop-blur">
            <CardHeader className="space-y-3">
              <CardTitle className="font-serif text-3xl text-slate-950">{copy.title}</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">{copy.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {notice ? (
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-950">
                  <AlertTitle>Next step</AlertTitle>
                  <AlertDescription>{notice}</AlertDescription>
                </Alert>
              ) : null}

              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>Request failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="h-11 w-full rounded-full" disabled={submitting}>
                  {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                  {copy.submit}
                </Button>
              </form>

              <p className="text-sm text-slate-600">
                {copy.alternateLabel}{" "}
                <Link to={copy.alternateHref} className="font-semibold text-emerald-800 hover:text-emerald-700">
                  {copy.alternateAction}
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
