"use client";

import { useState } from "react";

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-gold mb-2">Roam</h1>
          <p className="text-sm text-(--text-tertiary) font-light">
            Enter the password to continue
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Password"
            className="w-full bg-bg-surface border border-(--border-subtle) rounded-lg px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-tertiary) focus:border-gold focus:outline-none transition-colors"
          />
          {error && (
            <p className="text-xs text-red-400">
              Incorrect password — try again
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!password || loading}
            className="w-full py-3 bg-gold text-bg-base rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </div>
      </div>
    </div>
  );
}
