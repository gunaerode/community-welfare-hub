interface MemberSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemberSearch({ value, onChange }: MemberSearchProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="member-search" className="sr-only">
        உறுப்பினர்கள் தேடல்
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" aria-hidden="true">
        🔍
      </span>
      <input
        id="member-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="பெயர் / business தேடுங்கள்..."
        className="w-full rounded-full border border-primary-200 bg-white py-2.5 pl-10 pr-4 text-sm text-primary-900 placeholder:text-primary-400 focus:border-primary-400 focus:outline-none"
      />
    </div>
  );
}
