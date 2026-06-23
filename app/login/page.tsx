"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [sent, setSent] = useState(false);
const [error, setError] = useState("");

async function handleSubmit(
e: React.FormEvent<HTMLFormElement>
) {
e.preventDefault();


try {
  setLoading(true);
  setError("");

  await authClient.signIn.magicLink({
    email,
    callbackURL: "/onboarding",
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
return ( <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6"> <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">

      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

      <h1 className="mt-6 text-3xl font-bold text-white">
        Check your email
      </h1>

      <p className="mt-3 text-slate-400">
        We sent a secure  link to:
      </p>

      <p className="mt-2 font-medium text-white">
        {email}
      </p>

      <p className="mt-6 text-sm text-slate-500">
        Open your inbox and click the link to continue.
      </p>

    </div>
  </main>
);


}

return ( <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">


  <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8">

    <div className="mb-8 text-center">

      <h1 className="text-4xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-3 text-slate-400">
        Continue with Magic Link
      </p>

    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div className="relative">

        <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-white/10 bg-slate-800 pl-12 text-white outline-none"
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
        className="h-12 w-full rounded-xl bg-indigo-600 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
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
