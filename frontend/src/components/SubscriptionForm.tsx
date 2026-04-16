import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, Mail } from "lucide-react";

interface SubscriptionFormProps {
  compact?: boolean;
}

const SubscriptionForm = ({ compact = false }: SubscriptionFormProps) => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center gap-2 animate-fade-in-up ${compact ? "py-2" : "py-6"}`}>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <p className="font-serif text-lg font-semibold text-foreground">You're subscribed to The Kochi Brief 🎉</p>
        <p className="text-sm text-muted-foreground">Check your inbox for a welcome email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 w-full ${compact ? "max-w-md" : "max-w-lg"}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={!isValidEmail || status === "loading"}>
          {status === "loading" ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing...</>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      {!compact && (
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">Frequency:</span>
          {(["daily", "weekly"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                frequency === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
              }`}
            >
              {f === "daily" ? "Daily Brief" : "Weekly Roundup"}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SubscriptionForm;
