import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import type { AdminStrings } from "../../i18n/adminText";
import { adminApi } from "../../services/api";
import { refreshMembers } from "../../services/siteData";
import type { JoinRequest, RequestStatus } from "../../types/server";
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

const STATUS_STYLE: Record<RequestStatus, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  rejected: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

function RequestCard({ item, token, a, onDone, onUnauthorized }: { item: JoinRequest; token: string; a: AdminStrings; onDone: () => void; onUnauthorized: () => void }) {
  const { lang } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extra, setExtra] = useState({ categoryEn: "", locationEn: "", descriptionEn: "", image: "" });

  const run = async (action: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
      onDone();
    } catch (e) {
      if (e instanceof Error && "status" in e && (e as { status: number }).status === 401) onUnauthorized();
      else setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const rows: [string, string][] = [
    ["📞", `+${item.phone}`],
    ["🏷️", item.category],
    ["📍", item.location],
    ["🛠️", item.services],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <li className="card p-5">
      <div className="flex items-start gap-3">
        <MemberAvatar name={item.name} seed={item.id} className="h-12 w-12 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-primary-900 dark:text-white">{item.businessName || item.name}</h3>
            <span className={`chip ${STATUS_STYLE[item.status]}`}>{a[item.status]}</span>
          </div>
          {item.businessName && <p className="text-sm text-primary-600 dark:text-primary-300">{item.name}</p>}
          <p className="mt-0.5 text-xs text-primary-500 dark:text-primary-400">{formatDate(item.createdAt, lang)}</p>
        </div>
      </div>

      <ul className="mt-4 grid gap-1.5 text-sm text-primary-800 sm:grid-cols-2 dark:text-primary-100">
        {rows.map(([icon, value]) => (
          <li key={icon} className="flex gap-2">
            <span aria-hidden="true">{icon}</span>
            <span className="min-w-0 break-words">{value}</span>
          </li>
        ))}
      </ul>
      {item.description && <p className="mt-3 rounded-xl bg-primary-50 p-3 text-sm text-primary-800 dark:bg-primary-800/60 dark:text-primary-100">{item.description}</p>}
      {item.wantsToSendPhotos && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-700 dark:text-accent-300">
          <Icon name="image" className="h-3.5 w-3.5" /> {a.wantsPhotos}
        </p>
      )}

      {item.status === "pending" && (
        <details className="mt-4 rounded-xl border border-primary-100 p-3 dark:border-primary-800">
          <summary className="cursor-pointer text-sm font-semibold text-primary-700 dark:text-primary-200">{a.englishOptional}</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(["categoryEn", "locationEn", "image"] as const).map((key) => (
              <label key={key} className="flex flex-col gap-1 text-xs font-semibold text-primary-700 dark:text-primary-200">
                {key === "image" ? a.imageUrl : a[key]}
                <input
                  className="field-input py-2"
                  type={key === "image" ? "url" : "text"}
                  value={extra[key]}
                  onChange={(e) => setExtra((x) => ({ ...x, [key]: e.target.value }))}
                />
              </label>
            ))}
            <label className="flex flex-col gap-1 text-xs font-semibold text-primary-700 sm:col-span-2 dark:text-primary-200">
              {a.descriptionEn}
              <textarea
                className="field-input py-2"
                rows={2}
                value={extra.descriptionEn}
                onChange={(e) => setExtra((x) => ({ ...x, descriptionEn: e.target.value }))}
              />
            </label>
          </div>
        </details>
      )}

      {error && <p className="field-error mt-3">{error}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.status === "pending" && (
          <>
            <button type="button" disabled={busy} className="btn-primary btn-sm" onClick={() => run(() => adminApi.approve(token, item.id, extra).then(refreshMembers))}>
              <Icon name="check" className="h-4 w-4" /> {a.approve}
            </button>
            <button type="button" disabled={busy} className="btn-outline btn-sm" onClick={() => run(() => adminApi.reject(token, item.id))}>
              <Icon name="x" className="h-4 w-4" /> {a.reject}
            </button>
          </>
        )}
        {item.status === "approved" && item.memberId && (
          <Link to={`/members/${item.memberId}`} className="btn-outline btn-sm">
            <Icon name="eye" className="h-4 w-4" /> {a.viewInDirectory}
          </Link>
        )}
        <a
          href={createWhatsAppUrl(item.phone, lang === "en" ? `Hello ${item.name},` : `வணக்கம் ${item.name},`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-sm"
        >
          <WhatsAppGlyph className="h-4 w-4 text-whatsapp" /> {a.reply}
        </a>
        <button
          type="button"
          disabled={busy}
          className="btn-ghost btn-sm ml-auto text-rose-600 dark:text-rose-400"
          onClick={() => window.confirm(a.confirmDelete) && run(() => adminApi.deleteJoinRequest(token, item.id))}
        >
          <Icon name="trash" className="h-4 w-4" /> {a.delete}
        </button>
      </div>
    </li>
  );
}

export default function JoinRequestsPanel({ token, a, onUnauthorized, onChange }: Props) {
  const [filter, setFilter] = useState<RequestStatus | "all">("pending");
  const load = useCallback(() => adminApi.joinRequests(token), [token]);
  const { data, error, loading, refresh } = useAdminData(load, onUnauthorized);

  const items = (data?.items ?? []).filter((r) => filter === "all" || r.status === filter);
  const count = (s: RequestStatus) => (data?.items ?? []).filter((r) => r.status === s).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
              filter === f ? "bg-primary-700 text-white" : "bg-white text-primary-700 hover:bg-primary-50 dark:bg-primary-900 dark:text-primary-200"
            }`}
          >
            {a[f]} {f !== "all" && <span className="opacity-70">({count(f)})</span>}
          </button>
        ))}
        <button type="button" onClick={() => void refresh()} className="btn-ghost btn-sm ml-auto">
          <Icon name="refresh" className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> {a.refresh}
        </button>
      </div>

      {error && <p className="field-error mt-4">{error}</p>}
      {!loading && items.length === 0 && <p className="mt-8 text-center text-sm text-primary-500">{a.noRequests}</p>}

      <ul className="mt-4 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <RequestCard
            key={item.id}
            item={item}
            token={token}
            a={a}
            onUnauthorized={onUnauthorized}
            onDone={() => {
              void refresh();
              onChange();
            }}
          />
        ))}
      </ul>
    </div>
  );
}
