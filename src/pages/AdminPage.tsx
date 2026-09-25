import { useCallback, useEffect, useState, type FormEvent } from "react";
import ContentPanel from "../components/admin/ContentPanel";
import JoinRequestsPanel from "../components/admin/JoinRequestsPanel";
import MembersPanel from "../components/admin/MembersPanel";
import MessagesPanel from "../components/admin/MessagesPanel";
import Icon, { type IconName } from "../components/common/Icon";
import PageHeader from "../components/common/PageHeader";
import PageMeta from "../components/common/PageMeta";
import { API_URL, SERVER_ENABLED } from "../config/runtime";
import { useLanguage } from "../context/LanguageContext";
import { adminText, type AdminStrings } from "../i18n/adminText";
import { ApiError, adminApi } from "../services/api";
import { useMembers } from "../services/siteData";

const TOKEN_KEY = "cvs-admin-token";
type Tab = "requests" | "messages" | "members" | "content";

function readToken(): string {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

function Login({ a, onLogin }: { a: AdminStrings; onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setBusy(true);
    setError(null);
    try {
      await adminApi.verify(password);
      onLogin(password);
    } catch (err) {
      setError(err instanceof ApiError && (err.status === 401 || err.status === 429) ? (err.status === 401 ? a.wrongPassword : err.message) : a.serverUnreachable);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="card mx-auto flex max-w-sm flex-col gap-4 p-7">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-accent-300">
        <Icon name="lock" className="h-7 w-7" />
      </span>
      <label htmlFor="admin-password" className="field-label">
        {a.passwordLabel}
      </label>
      <div className="relative">
        <input
          id="admin-password"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={a.passwordPlaceholder}
          className="field-input pr-12"
          aria-invalid={Boolean(error)}
          autoFocus
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-800"
        >
          <Icon name={show ? "eyeOff" : "eye"} className="h-4 w-4" />
        </button>
      </div>
      {error && (
        <p role="alert" className="field-error">
          <Icon name="info" className="h-3.5 w-3.5" /> {error}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={busy || !password}>
        {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <Icon name="logOut" className="h-4 w-4 rotate-180" />}
        {a.login}
      </button>
    </form>
  );
}

function Dashboard({ token, a, onLogout }: { token: string; a: AdminStrings; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("requests");
  const [counts, setCounts] = useState({ pending: 0, unread: 0 });
  const { members } = useMembers();

  const loadCounts = useCallback(async () => {
    try {
      const [jr, msgs] = await Promise.all([adminApi.joinRequests(token), adminApi.messages(token)]);
      setCounts({
        pending: jr.items.filter((r) => r.status === "pending").length,
        unread: msgs.items.filter((m) => !m.read).length,
      });
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onLogout();
    }
  }, [token, onLogout]);

  useEffect(() => {
    void loadCounts();
  }, [loadCounts]);

  const tabs: { id: Tab; label: string; icon: IconName; badge?: number }[] = [
    { id: "requests", label: a.tabRequests, icon: "userPlus", badge: counts.pending },
    { id: "messages", label: a.tabMessages, icon: "inbox", badge: counts.unread },
    { id: "members", label: a.tabMembers, icon: "users" },
    { id: "content", label: a.tabContent, icon: "megaphone" },
  ];

  const stats: { label: string; value: number; icon: IconName }[] = [
    { label: a.stats.pending, value: counts.pending, icon: "userPlus" },
    { label: a.stats.unread, value: counts.unread, icon: "inbox" },
    { label: a.stats.members, value: members.length, icon: "users" },
  ];

  const panelProps = { token, a, onUnauthorized: onLogout };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-800 dark:text-accent-300">
              <Icon name={s.icon} />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-primary-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-primary-600 dark:text-primary-300">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label={a.title} className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                tab === t.id
                  ? "bg-primary-700 text-white shadow"
                  : "bg-white text-primary-700 hover:bg-primary-50 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
              }`}
            >
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
              {Boolean(t.badge) && (
                <span className="rounded-full bg-accent-500 px-1.5 text-xs font-bold text-primary-950">{t.badge}</span>
              )}
            </button>
          ))}
        </div>
        <button type="button" onClick={onLogout} className="btn-ghost btn-sm self-end sm:self-auto">
          <Icon name="logOut" className="h-4 w-4" /> {a.logout}
        </button>
      </div>

      <div role="tabpanel">
        {tab === "requests" && <JoinRequestsPanel {...panelProps} onChange={loadCounts} />}
        {tab === "messages" && <MessagesPanel {...panelProps} onChange={loadCounts} />}
        {tab === "members" && <MembersPanel {...panelProps} />}
        {tab === "content" && <ContentPanel {...panelProps} />}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { lang } = useLanguage();
  const a = adminText(lang);
  const [token, setToken] = useState(readToken);

  const login = (value: string) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, value);
    } catch {
      /* not persisted across reloads — fine */
    }
    setToken(value);
  };
  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setToken("");
  }, []);

  return (
    <>
      <PageMeta title={a.title} />
      <PageHeader icon="shield" title={a.title} subtitle={a.subtitle} />
      <section className="container-page py-8">
        {!SERVER_ENABLED ? (
          <div className="card mx-auto flex max-w-xl flex-col items-center gap-3 p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-700 dark:bg-accent-900/60 dark:text-accent-300">
              <Icon name="server" className="h-7 w-7" />
            </span>
            <h2 className="text-lg font-extrabold text-primary-900 dark:text-white">{a.staticTitle}</h2>
            <p className="text-sm text-primary-600 dark:text-primary-300">{a.staticText}</p>
            <code className="mt-2 rounded-lg bg-primary-50 px-3 py-1.5 text-xs text-primary-800 dark:bg-primary-800 dark:text-primary-100">
              VITE_API_URL=https://your-api.example.com
            </code>
          </div>
        ) : token ? (
          <Dashboard token={token} a={a} onLogout={logout} />
        ) : (
          <>
            <Login a={a} onLogin={login} />
            <p className="mt-4 text-center text-xs text-primary-400">API: {API_URL}</p>
          </>
        )}
      </section>
    </>
  );
}
