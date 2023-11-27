import dayjs from "dayjs";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-2 px-2 py-6 text-sm sm:flex-row sm:justify-start">
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
    </footer>
  );
}
