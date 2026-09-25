import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Small label above the title, e.g. the section name. */
  eyebrow?: string;
  /** Optional actions/content rendered under the subtitle. */
  children?: ReactNode;
}

/** Consistent banner used at the top of inner pages (Members, Rules, Contact…). */
export default function PageHeader({ title, subtitle, icon, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
      <div className="bg-dots-light absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-primary-400/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-10 -bottom-24 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" aria-hidden="true" />

      <div className="relative container-page py-10 text-center sm:py-14">
        {icon && (
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/20 backdrop-blur">
            <Icon name={icon} className="h-7 w-7" />
          </span>
        )}
        {eyebrow && <p className="mb-2 text-xs font-bold tracking-widest text-accent-300 uppercase">{eyebrow}</p>}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-100 sm:text-base">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
