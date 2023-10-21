"use client";

import { useEffect, useState } from "react";

export default function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function online() {
      setIsOnline(true);
    }
    function offline() {
      setIsOnline(false);
    }

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  return { isOnline };
}
