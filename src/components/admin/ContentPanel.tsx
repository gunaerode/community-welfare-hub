import { useState, type FormEvent, type ReactNode } from "react";
import type { AdminStrings } from "../../i18n/adminText";
import { ApiError, adminApi } from "../../services/api";
import { refreshSiteContent, useSiteContent } from "../../services/siteData";
import type { AnnouncementContent, SiteNoticeConfig } from "../../types/community";
import Icon from "../common/Icon";

interface Props {
  token: string;
  a: AdminStrings;
  onUnauthorized: () => void;
}

const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

function Input({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold text-primary-800 dark:text-primary-100 ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
    </label>
  );
}

function useSaver(token: string, onUnauthorized: () => void) {
  const [state, setState] = useState<{ busy: boolean; ok: boolean; error: string | null }>({ busy: false, ok: false, error: null });
  const save = async (body: Parameters<typeof adminApi.updateContent>[1]): Promise<void> => {
    setState({ busy: true, ok: false, error: null });
    try {
      await adminApi.updateContent(token, body);
      await refreshSiteContent();
      setState({ busy: false, ok: true, error: null });
      window.setTimeout(() => setState((s) => ({ ...s, ok: false })), 4000);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) onUnauthorized();
      setState({ busy: false, ok: false, error: e instanceof Error ? e.message : "Error" });
    }
  };
  return { ...state, save };
}

type FormProps<T> = { initial: T; isLive: boolean; onResetDone: () => void } & Props;

function AnnouncementForm({ initial, isLive, token, a, onUnauthorized, onResetDone }: FormProps<AnnouncementContent>) {
  const [f, setF] = useState({
    title: initial.title,
    titleEn: initial.titleEn ?? "",
    intro: initial.intro,
    introEn: initial.introEn ?? "",
    points: initial.points.join("\n"),
    pointsEn: (initial.pointsEn ?? []).join("\n"),
    note: initial.note,
    noteEn: initial.noteEn ?? "",
  });
  const { busy, ok, error, save } = useSaver(token, onUnauthorized);
  const set = (key: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void save({
      announcement: {
        ...initial,
        title: f.title,
        titleEn: f.titleEn,
        intro: f.intro,
        introEn: f.introEn,
        points: lines(f.points),
        pointsEn: lines(f.pointsEn),
        note: f.note,
        noteEn: f.noteEn,
      },
    });
  };

  return (
    <form onSubmit={submit} className="card p-6">
      <Header title={a.announcementHeading} live={isLive} a={a} icon="megaphone" />
      <p className="mt-1 text-xs text-primary-500 dark:text-primary-400">{a.announcementHelp}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input label={a.titleTa}>
          <input className="field-input" value={f.title} onChange={set("title")} required maxLength={120} />
        </Input>
        <Input label={a.titleEn}>
          <input className="field-input" value={f.titleEn} onChange={set("titleEn")} maxLength={120} />
        </Input>
        <Input label={a.introTa}>
          <textarea className="field-input" rows={2} value={f.intro} onChange={set("intro")} maxLength={400} />
        </Input>
        <Input label={a.introEn}>
          <textarea className="field-input" rows={2} value={f.introEn} onChange={set("introEn")} maxLength={400} />
        </Input>
        <Input label={a.pointsTa}>
          <textarea className="field-input" rows={6} value={f.points} onChange={set("points")} required />
        </Input>
        <Input label={a.pointsEn}>
          <textarea className="field-input" rows={6} value={f.pointsEn} onChange={set("pointsEn")} />
        </Input>
        <Input label={a.noteTa}>
          <input className="field-input" value={f.note} onChange={set("note")} maxLength={300} />
        </Input>
        <Input label={a.noteEn}>
          <input className="field-input" value={f.noteEn} onChange={set("noteEn")} maxLength={300} />
        </Input>
      </div>
      <Actions busy={busy} ok={ok} error={error} a={a} onReset={isLive ? () => void save({ announcement: null }).then(onResetDone) : undefined} />
    </form>
  );
}

function NoticeForm({ initial, isLive, token, a, onUnauthorized, onResetDone }: FormProps<SiteNoticeConfig>) {
  const [f, setF] = useState({ ...initial, messageEn: initial.messageEn ?? "" });
  const { busy, ok, error, save } = useSaver(token, onUnauthorized);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void save({ siteNotice: f });
      }}
      className="card p-6"
    >
      <Header title={a.noticeHeading} live={isLive} a={a} icon="info" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input label={a.messageTa}>
          <textarea className="field-input" rows={2} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} maxLength={300} />
        </Input>
        <Input label={a.messageEn}>
          <textarea className="field-input" rows={2} value={f.messageEn} onChange={(e) => setF({ ...f, messageEn: e.target.value })} maxLength={300} />
        </Input>
        <div className="flex flex-wrap gap-5 sm:col-span-2">
          {(["enabled", "dismissible"] as const).map((key) => (
            <label key={key} className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-primary-800 dark:text-primary-100">
              <input
                type="checkbox"
                checked={f[key]}
                onChange={(e) => setF({ ...f, [key]: e.target.checked })}
                className="h-5 w-5 rounded accent-primary-700"
              />
              {a[key]}
            </label>
          ))}
        </div>
      </div>
      <Actions busy={busy} ok={ok} error={error} a={a} onReset={isLive ? () => void save({ siteNotice: null }).then(onResetDone) : undefined} />
    </form>
  );
}

function Header({ title, live, a, icon }: { title: string; live: boolean; a: AdminStrings; icon: "megaphone" | "info" }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="flex items-center gap-2 text-lg font-extrabold text-primary-900 dark:text-white">
        <Icon name={icon} className="h-5 w-5 text-accent-600" />
        {title}
      </h3>
      <span
        className={`chip ${live ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200"}`}
      >
        {live ? a.usingLive : a.usingDefault}
      </span>
    </div>
  );
}

function Actions({ busy, ok, error, a, onReset }: { busy: boolean; ok: boolean; error: string | null; a: AdminStrings; onReset?: () => void }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button type="submit" className="btn-primary btn-sm py-2.5" disabled={busy}>
        <Icon name="send" className="h-4 w-4" />
        {a.save}
      </button>
      {onReset && (
        <button type="button" className="btn-ghost btn-sm" disabled={busy} onClick={onReset}>
          <Icon name="refresh" className="h-4 w-4" />
          {a.resetDefault}
        </button>
      )}
      {ok && (
        <span role="status" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <Icon name="checkCircle" className="h-4 w-4" /> {a.saved}
        </span>
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function ContentPanel(props: Props) {
  const { announcement, siteNotice, status, custom } = useSiteContent();
  // Bumped after "reset to default" so the forms re-mount showing the default values.
  const [version, setVersion] = useState(0);

  if (status === "loading") {
    return <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-700" />;
  }
  const onResetDone = () => setVersion((v) => v + 1);
  return (
    <div className="flex flex-col gap-6" key={version}>
      <AnnouncementForm {...props} initial={announcement} isLive={custom.announcement} onResetDone={onResetDone} />
      <NoticeForm {...props} initial={siteNotice} isLive={custom.siteNotice} onResetDone={onResetDone} />
    </div>
  );
}
