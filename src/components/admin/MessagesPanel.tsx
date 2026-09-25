import { useCallback } from "react";
import { useLanguage } from "../../context/LanguageContext";
import type { AdminStrings } from "../../i18n/adminText";
import { ApiError, adminApi } from "../../services/api";
import { createWhatsAppUrl } from "../../utils/whatsapp";
import Icon, { WhatsAppGlyph } from "../common/Icon";
import MemberAvatar from "../common/MemberAvatar";
import { formatDate, useAdminData } from "./useAdminData";

interface Props {
  token: string;
  a: AdminStrings;
  onUnauthorized: () => void;
  onChange: () => void;
}

export default function MessagesPanel({ token, a, onUnauthorized, onChange }: Props) {
  const { lang } = useLanguage();
  const load = useCallback(() => adminApi.messages(token), [token]);
  const { data, setData, error, loading, refresh } = useAdminData(load, onUnauthorized);
  const items = data?.items ?? [];

  const act = async (action: () => Promise<unknown>, optimistic: (list: typeof items) => typeof items) => {
    const before = data;
    setData({ items: optimistic(items) });
    try {
      await action();
      onChange();
    } catch (e) {
      setData(before);
      if (e instanceof ApiError && e.status === 401) onUnauthorized();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end">
        <button type="button" onClick={() => void refresh()} className="btn-ghost btn-sm">
          <Icon name="refresh" className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> {a.refresh}
        </button>
      </div>
      {error && <p className="field-error mt-4">{error}</p>}
      {!loading && items.length === 0 && <p className="mt-8 text-center text-sm text-primary-500">{a.noMessages}</p>}

      <ul className="mt-2 flex flex-col gap-3">
        {items.map((m) => (
          <li
            key={m.id}
            className={`card relative p-5 ${m.read ? "opacity-80" : "ring-2 ring-accent-400/60"}`}
          >
            <div className="flex items-start gap-3">
              <MemberAvatar name={m.name} seed={m.id} className="h-10 w-10 rounded-xl" textClassName="text-base" />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-bold text-primary-900 dark:text-white">
                  {m.name}
                  {!m.read && <span className="h-2 w-2 rounded-full bg-accent-500" aria-label="unread" />}
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400">
                  {formatDate(m.createdAt, lang)}
                  {m.phone && ` · +${m.phone}`}
                </p>
              </div>
            </div>
            {m.message && (
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-primary-800 dark:text-primary-100">{m.message}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {m.phone && (
                <>
                  <a
                    href={createWhatsAppUrl(m.phone, lang === "en" ? `Hello ${m.name},` : `வணக்கம் ${m.name},`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp btn-sm"
                  >
                    <WhatsAppGlyph className="h-4 w-4" /> {a.reply}
                  </a>
                  <a href={`tel:+${m.phone}`} className="btn-ghost btn-sm">
                    <Icon name="phone" className="h-4 w-4" /> {a.call}
                  </a>
                </>
              )}
              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() =>
                  act(
                    () => adminApi.markMessage(token, m.id, !m.read),
                    (list) => list.map((x) => (x.id === m.id ? { ...x, read: !m.read } : x)),
                  )
                }
              >
                <Icon name={m.read ? "eyeOff" : "eye"} className="h-4 w-4" /> {m.read ? a.markUnread : a.markRead}
              </button>
              <button
                type="button"
                className="btn-ghost btn-sm ml-auto text-rose-600 dark:text-rose-400"
                onClick={() =>
                  window.confirm(a.confirmDelete) &&
                  act(
                    () => adminApi.deleteMessage(token, m.id),
                    (list) => list.filter((x) => x.id !== m.id),
                  )
                }
              >
                <Icon name="trash" className="h-4 w-4" /> {a.delete}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
