import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Toaster as ToasterRenderer } from "react-hot-toast";
import LoadingSpinner from "./Loading/LoadingSpinner";

export default function Toaster() {
  return (
    <ToasterRenderer
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        ariaProps: { "aria-live": "polite", role: "status" },
        loading: {
          icon: <LoadingSpinner />,
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
          "flex h-fit w-fit text-light-text items-center gap-2 rounded-md border border-light-secondary-shaded bg-light-secondary px-4 py-2 text-sm font-medium shadow-md dark:border-dark-secondary-shaded dark:text-dark-text dark:bg-dark-secondary",
      }}
    />
  );
}
