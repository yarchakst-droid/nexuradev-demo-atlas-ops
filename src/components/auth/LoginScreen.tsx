"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, LogoMark, UserIcon } from "@/components/shared/icons";
import { useLang } from "@/i18n/LangContext";
import { DEMO_CREDENTIALS } from "@/lib/auth";

export default function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const { t, lang } = useLang();
  const [login, setLogin] = useState(DEMO_CREDENTIALS.login);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t.loginPage.genericError);
        return;
      }
      onSuccess();
    } catch {
      setError(t.loginPage.genericError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[1fr_1.1fr]">
      <aside className="hidden flex-col items-center justify-center border-r border-border bg-bg-panel px-10 py-16 lg:flex">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
          <LogoMark className="size-8" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-text">
          Atlas <span className="text-accent">Ops</span>
        </h1>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-text-muted">{t.loginPage.tagline}</p>
        <p className="mt-6 max-w-xs text-center text-sm leading-relaxed text-text-soft">{t.loginPage.blurb}</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
              <LogoMark className="size-6" />
            </span>
            <h1 className="text-xl font-semibold tracking-tight text-text">
              Atlas <span className="text-accent">Ops</span>
            </h1>
          </div>

          <div className="panel rounded-2xl border border-border p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-tight text-text">{t.loginPage.heading}</h2>
            <p className="mt-1.5 text-sm text-text-soft">{t.loginPage.subheading}</p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-text-soft">{t.loginPage.loginLabel}</span>
                <span className="flex items-center gap-2 rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm focus-within:border-accent/40">
                  <UserIcon className="size-4 shrink-0 text-text-muted" />
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    autoComplete="username"
                    className="min-w-0 flex-1 bg-transparent text-text outline-none"
                    disabled={loading}
                  />
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-text-soft">{t.loginPage.passwordLabel}</span>
                <span className="flex items-center gap-2 rounded-lg border border-border-soft bg-bg-panel px-3.5 py-2.5 text-sm focus-within:border-accent/40">
                  <LockIcon className="size-4 shrink-0 text-text-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="min-w-0 flex-1 bg-transparent text-text outline-none"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? t.loginPage.hidePassword : t.loginPage.showPassword}
                    className="shrink-0 text-text-muted hover:text-text"
                  >
                    {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </span>
              </label>

              {error && (
                <p className="rounded-lg border border-critical/30 bg-critical/5 px-3.5 py-2.5 text-xs text-critical">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="pressable mt-1 flex h-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-bg disabled:opacity-60"
              >
                {loading ? t.loginPage.loggingIn : t.loginPage.submit}
              </button>
            </form>
          </div>

          <p className="mt-5 rounded-lg border border-border-soft bg-bg-elevated px-4 py-3 text-center text-xs leading-relaxed text-text-muted">
            {t.loginPage.demoNote}
          </p>
        </div>
      </main>
    </div>
  );
}
