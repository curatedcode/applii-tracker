import { NoSymbolIcon } from "@heroicons/react/24/outline";
import ExternalLink from "./Links/ExternalLink";

export default function IndexedDBNotSupported() {
  return (
    <div className="mt-24 grid w-full max-w-sm place-items-center gap-6 justify-self-center">
      <div className="flex gap-2 text-lg font-semibold md:text-xl">
        <NoSymbolIcon className="w-6" aria-hidden="true" />
        <h1>Your browser is not supported</h1>
      </div>
      <p>
        Please exit incognito or private mode. Otherwise, download a supported
        browser like{" "}
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
        .
      </p>
    </div>
  );
}
