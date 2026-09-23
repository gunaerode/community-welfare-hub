import { useEffect } from "react";
import { SITE } from "../constants/site";

interface PageMetaProps {
  title: string;
  description?: string;
}

/** Sets document title + meta description per page for basic SEO. */
export default function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE.nameEnglish}`;
    document.title = fullTitle;

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
