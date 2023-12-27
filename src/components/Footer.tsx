import dayjs from "dayjs";
import getRandomMotivationalQuote from "./Motivational/getRandomMotivationalQuote";

export default function Footer() {
  const motivationalQuote = getRandomMotivationalQuote();
  return (
    <footer className="mt-auto grid space-y-8 border-t border-light-secondary border-opacity-40 px-2 py-10 text-sm dark:border-dark-secondary">
      <section className="max-w-lg justify-self-center opacity-80">
        &quot;{motivationalQuote}&quot; - &#10084;
      </section>
      <section className="flex flex-col items-center gap-2 sm:flex-row sm:justify-start">
        <a
          href="/policies#privacy-policy"
          className="underline underline-offset-1 opacity-80 transition-opacity hover:opacity-100"
        >
          Privacy Policy
        </a>
        <div className="hidden opacity-80 sm:block">|</div>
        <a
          href="/policies#terms-of-service"
          className="underline underline-offset-1 opacity-80 transition-opacity hover:opacity-100"
        >
          Terms of service
        </a>
        <span className="mt-4 opacity-80 sm:ml-auto sm:mt-0">
          &copy; {dayjs().year()} Applii
        </span>
      </section>
    </footer>
  );
}
