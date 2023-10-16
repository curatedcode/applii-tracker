import { AlertDialogProps } from "../customVariables";
import FocusTrap from "focus-trap-react";

export default function AlertDialog({
  label,
  description,
  open,
  children,
}: AlertDialogProps) {
  if (!open) return null;

  return (
    <FocusTrap>
      <div className="fixed left-0 top-0 z-10 h-screen w-screen px-4 backdrop-blur-md">
        <div
          className="relative left-1/2 top-1/3 grid w-full max-w-md -translate-x-1/2 -translate-y-1/3 gap-2 rounded-md bg-light-secondary px-5 py-8 text-center text-lg outline-none ring-2 ring-black ring-opacity-20 ring-offset-black focus-within:outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-black focus-visible:ring-offset-black dark:bg-dark-secondary"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialogLabel"
          aria-describedby="dialogDesc"
        >
          <h2
            id="dialogLabel"
            className="justify-self-center text-2xl font-semibold"
          >
            {label}
          </h2>
          <p id="dialogDesc">{description}</p>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}
