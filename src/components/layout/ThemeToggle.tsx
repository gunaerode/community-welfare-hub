import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import Icon from "../common/Icon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.themeToggleToLight : t.themeToggleToDark}
      title={isDark ? t.themeToggleToLight : t.themeToggleToDark}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-700 transition-colors hover:bg-primary-50 dark:text-accent-300 dark:hover:bg-primary-800"
    >
      <Icon name={isDark ? "sun" : "moon"} className="h-5 w-5" />
    </button>
  );
}
