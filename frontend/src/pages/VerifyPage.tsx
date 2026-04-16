import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyEmailToken } from "@/lib/api";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verificationQuery = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmailToken(token!),
    enabled: Boolean(token),
    retry: false,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f4f8f3_0%,#fffdf8_100%)] px-6 py-8">
      <Card className="w-full max-w-xl rounded-[32px] border-white/70 bg-white/90 shadow-2xl shadow-slate-900/10">
        <CardHeader className="space-y-3 text-center">
          <CardDescription>Email verification</CardDescription>
          <CardTitle className="font-serif text-4xl text-slate-950">Confirm your Kochi Brief inbox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {!token ? (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Missing verification token</AlertTitle>
              <AlertDescription>The verification link is incomplete. Request a new verification email after logging in.</AlertDescription>
            </Alert>
          ) : verificationQuery.isLoading ? (
            <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center text-slate-600">
              <LoaderCircle className="h-8 w-8 animate-spin text-emerald-700" />
              <p>Checking your verification link...</p>
            </div>
          ) : verificationQuery.isError ? (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Verification failed</AlertTitle>
              <AlertDescription>
                {verificationQuery.error instanceof Error ? verificationQuery.error.message : "This link could not be processed."}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-emerald-200 bg-emerald-50 text-emerald-950">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Verification complete</AlertTitle>
              <AlertDescription>
                {verificationQuery.data?.message || "Your email was verified successfully."}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1 rounded-full">
              <Link to="/login">Go to login</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 rounded-full">
              <Link to="/home">Open dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyPage;
