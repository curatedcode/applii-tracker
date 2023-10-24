"use client";

import { useEffect, useState } from "react";

export default function useConnectionStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    function online() {
      setOnline(true);
    }
    function offline() {
      setOnline(false);
    }

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  return { online };
}
