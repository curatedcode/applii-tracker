import ExternalLink from "./Links/ExternalLink";

export default function IndexedDBNotSupported() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p role="error" className="w-full max-w-md">
        Your browser is not supported. Please exit incognito or private mode.
        Otherwise download a supported browser like{" "}
        <ExternalLink
          href="https://www.mozilla.org/en-US/firefox/new/"
          className="underline"
        >
          Firefox
        </ExternalLink>{" "}
        or{" "}
        <ExternalLink
          href="https://www.google.com/chrome/index.html"
          className="underline"
        >
          Google Chrome
        </ExternalLink>
      </p>
    </div>
  );
}
