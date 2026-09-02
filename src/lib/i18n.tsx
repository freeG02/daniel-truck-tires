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
import {
  dictionaries,
  LANGS,
  type Dict,
  type Lang,
} from "@/data/dictionary";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** The dictionary for the active language. */
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "dtt-lang";

function isLang(value: string): value is Lang {
  return (LANGS as string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in Spanish so the client's first render matches the
  // server-rendered (Spanish) markup, then switch in an effect on mount.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let chosen: Lang | null = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLang(saved)) chosen = saved;
    } catch {
      // Ignore unavailable storage.
    }
    if (!chosen) {
      try {
        const nav = navigator.language.slice(0, 2).toLowerCase();
        if (isLang(nav)) chosen = nav;
      } catch {
        // Ignore.
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time language restore
    if (chosen && chosen !== "es") setLangState(chosen);
  }, []);

  // Keep the document language attribute in sync (accessibility / SEO).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
