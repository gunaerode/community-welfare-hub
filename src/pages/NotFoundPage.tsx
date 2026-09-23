import NotFound from "../components/NotFound";
import PageMeta from "../components/PageMeta";

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="பக்கம் கிடைக்கவில்லை" />
      <NotFound
        title="பக்கம் கிடைக்கவில்லை"
        message="நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது."
        backTo="/"
        backLabel="முகப்பு பக்கத்திற்கு திரும்பு"
      />
    </>
  );
}
