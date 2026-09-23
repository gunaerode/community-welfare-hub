import { Link } from "react-router-dom";
import SearchIllustration from "./SearchIllustration";

interface NotFoundProps {
  title: string;
  message: string;
  backTo: string;
  backLabel: string;
}

/** Reusable "not found" panel used for the 404 page and invalid member routes. */
export default function NotFound({ title, message, backTo, backLabel }: NotFoundProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-20 text-center">
      <SearchIllustration />
      <h1 className="text-2xl font-extrabold text-primary-900 dark:text-white">{title}</h1>
      <p className="text-sm text-primary-600 dark:text-primary-300">{message}</p>
      <Link
        to={backTo}
        className="mt-2 rounded-full bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
      >
        {backLabel}
      </Link>
    </div>
  );
}
