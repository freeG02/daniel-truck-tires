"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { CloseIcon } from "@/components/CartIcons";

const fieldClass =
  "mt-1 w-full border border-black/15 bg-white px-3 py-2 text-sm text-brand-navy-dark outline-none focus:border-brand-navy-dark";
const labelClass =
  "block text-xs font-bold uppercase tracking-wide text-brand-navy-dark/70";

export function AuthDialog({
  onClose,
  message,
  onAuthed,
}: {
  onClose: () => void;
  /** Optional prompt (e.g. "create an account to request your quote"). */
  message?: string;
  /** Called after a successful sign up / sign in. */
  onAuthed?: () => void;
}) {
  const { user, signUp, signIn, resetPassword, signOut } = useAuth();
  const { t } = useLang();
  const a = t.auth;

  const [mode, setMode] = useState<"signup" | "signin" | "reset">("signup");
  const title =
    mode === "signup" ? a.createAccount : mode === "reset" ? a.resetTitle : a.signIn;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res =
      mode === "signup"
        ? signUp({ name, email, password })
        : mode === "reset"
          ? resetPassword(email, password)
          : signIn(email, password);
    if (!res.ok) {
      setError(
        res.error === "exists"
          ? a.exists
          : res.error === "invalid"
            ? mode === "reset"
              ? a.noAccountEmail
              : a.invalid
            : a.required,
      );
      return;
    }
    onAuthed?.();
    onClose();
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={user ? a.account : title}
        className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between bg-brand-navy-dark px-5 py-4 text-brand-cream">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide">
            {user ? a.account : title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={a.account}
            className="text-brand-cream/70 transition-colors hover:text-brand-cream"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {user ? (
          /* Signed-in view */
          <div className="p-6">
            <p className="text-xs uppercase tracking-wide text-black/40">
              {a.signedInAs}
            </p>
            <p className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-brand-navy-dark">
              {user.name}
            </p>
            <p className="text-sm text-black/50">{user.email}</p>
            {user.phone && <p className="text-sm text-black/50">{user.phone}</p>}
            <button
              type="button"
              onClick={() => {
                signOut();
                onClose();
              }}
              className="btn-sweep relative mt-6 flex h-12 w-full items-center justify-center bg-brand-navy-dark text-sm font-semibold text-brand-cream"
            >
              {a.signOut}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6">
            {message && (
              <p className="mb-4 bg-brand-cream px-3 py-2 text-sm text-brand-navy-dark">
                {message}
              </p>
            )}

            <div className="space-y-3">
              {mode === "signup" && (
                <div>
                  <label className={labelClass} htmlFor="au-name">
                    {a.name}
                  </label>
                  <input
                    id="au-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                    autoComplete="name"
                  />
                </div>
              )}
              <div>
                <label className={labelClass} htmlFor="au-email">
                  {a.email}
                </label>
                <input
                  id="au-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="au-password">
                  {mode === "reset" ? a.newPassword : a.password}
                </label>
                <input
                  id="au-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                />
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-brand-red">{error}</p>}

            <button
              type="submit"
              className="btn-sweep relative mt-5 flex h-14 w-full items-center justify-center bg-brand-yellow text-sm font-semibold text-brand-navy-dark"
            >
              {mode === "signup"
                ? a.submitSignUp
                : mode === "reset"
                  ? a.resetSubmit
                  : a.submitSignIn}
            </button>

            {mode === "reset" ? (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMode("signin");
                }}
                className="mt-3 w-full text-center text-xs text-black/50 transition-colors hover:text-brand-navy-dark"
              >
                {a.backSignIn}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setMode(mode === "signup" ? "signin" : "signup");
                  }}
                  className="mt-3 w-full text-center text-xs text-black/50 transition-colors hover:text-brand-navy-dark"
                >
                  {mode === "signup" ? a.toSignIn : a.toSignUp}
                </button>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setMode("reset");
                    }}
                    className="mt-2 w-full text-center text-xs text-black/50 transition-colors hover:text-brand-navy-dark"
                  >
                    {a.forgot}
                  </button>
                )}
              </>
            )}

            <p className="mt-4 text-center text-[11px] leading-relaxed text-black/35">
              {a.prototypeNote}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
