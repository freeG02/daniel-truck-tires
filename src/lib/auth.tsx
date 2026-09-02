"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = { name: string; email: string; phone?: string };
type StoredAccount = User & { password: string };
export type AuthResult = { ok: boolean; error?: "exists" | "invalid" | "required" };

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  signUp: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => AuthResult;
  signIn: (email: string, password: string) => AuthResult;
  /** Local prototype reset: sets a new password for an existing account. */
  resetPassword: (email: string, newPassword: string) => AuthResult;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const ACCOUNTS_KEY = "dtt-accounts";
const SESSION_KEY = "dtt-session";

// NOTE: LOCAL PROTOTYPE. Accounts (including passwords) live only in this
// browser's localStorage — not secure, not shared across devices. This is a
// stand-in until the Supabase backend (the client's chosen provider) is wired
// up, which will handle real auth, cross-device carts and stored invoices.
function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(list: StoredAccount[]) {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
  } catch {
    // Ignore storage failures.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let restored: User | null = null;
    try {
      const email = localStorage.getItem(SESSION_KEY);
      if (email) {
        const acc = readAccounts().find((a) => a.email === email);
        if (acc) restored = { name: acc.name, email: acc.email, phone: acc.phone };
      }
    } catch {
      // Ignore.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session restore
    if (restored) setUser(restored);
    setHydrated(true);
  }, []);

  const signUp = useCallback<AuthContextValue["signUp"]>((data) => {
    const email = data.email.trim().toLowerCase();
    if (!data.name.trim() || !email || !data.password) {
      return { ok: false, error: "required" };
    }
    const accounts = readAccounts();
    if (accounts.some((a) => a.email === email)) {
      return { ok: false, error: "exists" };
    }
    const acc: StoredAccount = {
      name: data.name.trim(),
      email,
      phone: data.phone?.trim() || undefined,
      password: data.password,
    };
    writeAccounts([...accounts, acc]);
    try {
      localStorage.setItem(SESSION_KEY, email);
    } catch {
      // Ignore.
    }
    setUser({ name: acc.name, email: acc.email, phone: acc.phone });
    return { ok: true };
  }, []);

  const signIn = useCallback<AuthContextValue["signIn"]>((emailRaw, password) => {
    const email = emailRaw.trim().toLowerCase();
    const acc = readAccounts().find(
      (a) => a.email === email && a.password === password,
    );
    if (!acc) return { ok: false, error: "invalid" };
    try {
      localStorage.setItem(SESSION_KEY, email);
    } catch {
      // Ignore.
    }
    setUser({ name: acc.name, email: acc.email, phone: acc.phone });
    return { ok: true };
  }, []);

  const resetPassword = useCallback<AuthContextValue["resetPassword"]>(
    (emailRaw, newPassword) => {
      const email = emailRaw.trim().toLowerCase();
      if (!email || !newPassword) return { ok: false, error: "required" };
      const accounts = readAccounts();
      const idx = accounts.findIndex((a) => a.email === email);
      // "invalid" here means: no account exists for that email.
      if (idx === -1) return { ok: false, error: "invalid" };
      accounts[idx] = { ...accounts[idx], password: newPassword };
      writeAccounts(accounts);
      try {
        localStorage.setItem(SESSION_KEY, email);
      } catch {
        // Ignore.
      }
      const acc = accounts[idx];
      setUser({ name: acc.name, email: acc.email, phone: acc.phone });
      return { ok: true };
    },
    [],
  );

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore.
    }
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, hydrated, signUp, signIn, resetPassword, signOut }),
    [user, hydrated, signUp, signIn, resetPassword, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
