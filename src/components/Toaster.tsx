import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Toaster as ToasterRenderer } from "react-hot-toast";

export default function Toaster() {
  return (
    <ToasterRenderer
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        ariaProps: { "aria-live": "polite", role: "status" },
        loading: {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6 animate-spin text-dark-primary dark:text-light-primary"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.75v1.5M17.127 6.873l-1.061 1.061M19.25 12h-1.5M17.127 17.127l-1.061-1.061M12 17.75v1.5M7.934 16.066l-1.06 1.06M6.25 12h-1.5M7.934 7.934l-1.06-1.06"
              />
            </svg>
          ),
        },
        error: {
          icon: (
            <XCircleIcon className="w-6 text-card-closed" aria-hidden="true" />
          ),
        },
        success: {
          icon: (
            <CheckCircleIcon
              className="w-6 text-card-applied"
              aria-hidden="true"
            />
          ),
        },
        className:
          "flex h-fit w-fit text-light-text items-center gap-2 rounded-md border border-light-tertiary bg-light-secondary px-4 py-2 text-sm font-medium shadow-md dark:border-dark-tertiary dark:text-dark-text dark:bg-dark-secondary",
      }}
    />
  );
}
