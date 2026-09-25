import type { ReactNode } from "react";
import Icon from "./Icon";

interface SubmitSuccessProps {
  title: string;
  message: string;
  children?: ReactNode;
}

/** Friendly confirmation panel shown after a form is saved on the server. */
export default function SubmitSuccess({ title, message, children }: SubmitSuccessProps) {
  return (
    <div role="status" className="card flex flex-col items-center gap-3 px-6 py-12 text-center animate-slide-up">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-accent-300">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary-300/40 motion-reduce:hidden" aria-hidden="true" />
        <Icon name="checkCircle" className="relative h-8 w-8" />
      </span>
      <h2 className="text-xl font-extrabold text-primary-900 dark:text-white">{title}</h2>
      <p className="max-w-sm text-sm text-primary-600 dark:text-primary-300">{message}</p>
      {children && <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">{children}</div>}
    </div>
  );
}
