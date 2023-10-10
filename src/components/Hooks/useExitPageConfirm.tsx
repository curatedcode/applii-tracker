"use client";

import { useEffect } from "react";

export default function useExitPageConfirm(canLeave: boolean) {
  const message = "Changes may not be saved. Are you sure you want to leave?";

  useEffect(() => {
    if (!window) return;
    function windowHandler(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = message;
    }
    if (canLeave) {
      console.log(canLeave);
      window.removeEventListener("beforeunload", windowHandler);
      return;
    }

    window.addEventListener("beforeunload", windowHandler);

    return () => window.removeEventListener("beforeunload", windowHandler);
  }, [canLeave]);
}
