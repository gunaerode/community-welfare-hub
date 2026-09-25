import { Link } from "react-router-dom";
import Icon from "./Icon";
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
    <div className="container-page py-16 sm:py-24">
      <div className="card mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-12 text-center">
        <p className="text-6xl font-black tracking-tight text-primary-100 dark:text-primary-800" aria-hidden="true">
          404
        </p>
        <SearchIllustration className="-mt-6 h-36 w-36" />
        <h1 className="text-2xl font-extrabold text-primary-900 dark:text-white">{title}</h1>
        <p className="text-sm text-primary-600 dark:text-primary-300">{message}</p>
        <Link to={backTo} className="btn-primary mt-2">
          <Icon name="arrowLeft" className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}
