import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../../services/api";

/** Loads admin data with a token; signs out automatically on 401. */
export function useAdminData<T>(load: () => Promise<T>, onUnauthorized: () => void) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(await load());
      setError(null);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onUnauthorized();
      else setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [load, onUnauthorized]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, setData, error, loading, refresh };
}

export function formatDate(iso: string, lang: "ta" | "en") {
  try {
    return new Date(iso).toLocaleString(lang === "ta" ? "ta-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
