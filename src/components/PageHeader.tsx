interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

/** Consistent hero-style header used at the top of inner pages (Members, Rules, Contact). */
export default function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  return (
    <div className="border-b border-primary-100 bg-primary-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-14">
        {icon && (
          <span className="mb-2 inline-block text-3xl" aria-hidden="true">
            {icon}
          </span>
        )}
        <h1 className="text-2xl font-extrabold text-primary-900 sm:text-3xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-2 max-w-2xl text-sm text-primary-700 sm:text-base">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
