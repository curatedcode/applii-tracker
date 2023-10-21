"use client";

import { ToastContextType } from "@/src/utils/customVariables";
import { createContext, useState } from "react";

export const ToastContext = createContext<ToastContextType>({
  showToast: false,
  forceStop: false,
  setShowToast: () => {},
  setForceStop: () => {},
});

export default function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showToast, setShowToast] = useState(false);
  const [forceStop, setForceStop] = useState(false);

  return (
    <ToastContext.Provider
      value={{ showToast, setShowToast, forceStop, setForceStop }}
    >
      {children}
    </ToastContext.Provider>
  );
}
