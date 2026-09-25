import { useState } from "react";
import { Link } from "react-router-dom";
import { pick, useLanguage } from "../../context/LanguageContext";
import type { AdminStrings } from "../../i18n/adminText";
import { ApiError, adminApi } from "../../services/api";
import { refreshMembers, useMembers } from "../../services/siteData";
import Icon from "../common/Icon";
import MemberAvatar from "../common/MemberAvatar";

interface Props {
  token: string;
  a: AdminStrings;
  onUnauthorized: () => void;
}

export default function MembersPanel({ token, a, onUnauthorized }: Props) {
  const { lang } = useLanguage();
  const { members } = useMembers({ includeHidden: true });
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (id: string, action: () => Promise<unknown>) => {
    setBusyId(id);
    setError(null);
    try {
      await action();
      refreshMembers();
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onUnauthorized();
      else setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <p className="flex items-start gap-2 rounded-2xl bg-primary-50 p-4 text-sm text-primary-700 dark:bg-primary-800/50 dark:text-primary-200">
        <Icon name="info" className="mt-0.5 h-4 w-4" />
        {a.membersHelp}
      </p>
      {error && <p className="field-error mt-3">{error}</p>}

      <ul className="card mt-4 divide-y divide-primary-100 overflow-hidden dark:divide-primary-800">
        {members.map((m) => (
          <li key={m.id} className={`flex flex-wrap items-center gap-3 p-4 ${m.hidden ? "bg-primary-50/60 dark:bg-primary-950/40" : ""}`}>
            <MemberAvatar
              name={m.name}
              seed={m.id}
              image={m.image}
              className={`h-11 w-11 rounded-xl ${m.hidden ? "opacity-40 grayscale" : ""}`}
              textClassName="text-base"
            />
            <div className="min-w-0 flex-1">
              <p className={`truncate font-semibold ${m.hidden ? "text-primary-400 line-through" : "text-primary-900 dark:text-white"}`}>
                {m.businessName ?? m.name}
              </p>
              <p className="flex flex-wrap items-center gap-1.5 text-xs text-primary-500 dark:text-primary-400">
                {m.name}
                {m.category && <>· {pick(lang, m.category, m.categoryEn)}</>}
                <span
                  className={`chip px-2 py-0 ${
                    m.source === "server"
                      ? "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200"
                      : "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200"
                  }`}
                >
                  {m.source === "server" ? a.server : a.builtIn}
                </span>
                {m.hidden && <span className="chip bg-rose-100 px-2 py-0 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200">{a.hidden}</span>}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {!m.hidden && (
                <Link to={`/members/${m.id}`} className="btn-ghost btn-sm" aria-label={a.viewInDirectory}>
                  <Icon name="eye" className="h-4 w-4" />
                </Link>
              )}
              <button
                type="button"
                disabled={busyId === m.id}
                className="btn-outline btn-sm"
                onClick={() => run(m.id, () => adminApi.setMemberHidden(token, m.id, !m.hidden))}
              >
                <Icon name={m.hidden ? "eye" : "eyeOff"} className="h-4 w-4" />
                {m.hidden ? a.show : a.hide}
              </button>
              {m.source === "server" && (
                <button
                  type="button"
                  disabled={busyId === m.id}
                  aria-label={a.delete}
                  className="btn-ghost btn-sm text-rose-600 dark:text-rose-400"
                  onClick={() => window.confirm(a.confirmDelete) && run(m.id, () => adminApi.deleteMember(token, m.id))}
                >
                  <Icon name="trash" className="h-4 w-4" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
