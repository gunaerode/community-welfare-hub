import type { ReactNode } from "react";
import SearchIllustration from "./SearchIllustration";

interface EmptyStateProps {
  icon?: string;
  /** Shows the SearchIllustration instead of the emoji icon. */
  illustration?: boolean;
  title: string;
  message?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon = "🔍", illustration = false, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-primary-200 bg-white/60 px-6 py-14 text-center dark:border-primary-800 dark:bg-primary-900/40">
      {illustration ? (
        <SearchIllustration className="h-32 w-32" />
      ) : (
        <span className="text-4xl" aria-hidden="true">
          {icon}
        </span>
      )}
      <h3 className="text-lg font-bold text-primary-900 dark:text-white">{title}</h3>
      {message && <p className="max-w-sm text-sm text-primary-600 dark:text-primary-300">{message}</p>}
      {action}
    </div>
  );
}
