"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [sent, setSent] = useState(false);
const [error, setError] = useState("");
const searchParams = useSearchParams();

const callbackURL =
  searchParams.get("callbackURL") ??
  "/dashboard";
async function handleSubmit(
e: React.FormEvent<HTMLFormElement>
) {
e.preventDefault();


try {
  setLoading(true);
  setError("");

  await authClient.signIn.magicLink({
    email,
    callbackURL,
  });

  setSent(true);
} catch (err) {
  console.error(err);
  setError("Failed to send link");
} finally {
  setLoading(false);
}


}

if (sent) {
return ( <main className="flex min-h-screen items-center justify-center bg-background px-6"> <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center">

      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

      <h1 className="mt-6 text-3xl font-bold text-foreground">
        Check your email
      </h1>

      <p className="mt-3 text-muted-foreground">
        We sent a secure  link to:
      </p>

      <p className="mt-2 font-medium text-foreground">
        {email}
      </p>

      <p className="mt-6 text-sm text-muted-foreground">
        Open your inbox and click the link to continue.
      </p>

    </div>
  </main>
);


}

return ( <main className="flex min-h-screen items-center justify-center bg-background px-6">


  <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8">

    <div className="mb-8 text-center">

      <h1 className="text-4xl font-bold text-foreground">
        Welcome Back
      </h1>

      <p className="mt-3 text-muted-foreground">
        Continue with Magic Link
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="relative">

        <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-border bg-background pl-12 text-foreground outline-none"
        />

      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-indigo-600 font-medium text-foreground transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading
          ? "Sending..."
          : "Send Magic Link"}
      </button>

    </form>

  </div>

</main>
);
}
