interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon = "🔍", title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-14 text-center dark:border-primary-700 dark:bg-primary-800/50">
      <span className="text-4xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="text-lg font-bold text-primary-900 dark:text-white">{title}</h3>
      {message && <p className="max-w-sm text-sm text-primary-600 dark:text-primary-300">{message}</p>}
      {action}
    </div>
  );
}
