"use client";

import { SyncContextType } from "@/src/utils/customVariables";
import { createContext, useEffect, useState } from "react";
import useConnectionStatus from "../Hooks/useConnectionStatus";
import { syncData } from "@/src/utils/sync";
import toast from "react-hot-toast";
import { getSetting } from "@/src/utils/db";

export const SyncContext = createContext<SyncContextType>({
  setForceStop: () => {},
  triggerSync: () => {},
});

export default function SyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [forceStop, setForceStop] = useState(false);
  const [syncInterval, setSyncInterval] = useState<number>(600_000);
  const [dbxAccessToken, setDbxAccessToken] = useState<string>();

  const { online } = useConnectionStatus();

  function triggerSync() {
    if (!dbxAccessToken || forceStop) return;
    syncData(dbxAccessToken)
      .then(() => {
        toast.success("Synced successfully");
      })
      .catch((err: { message: string }) => {
        if (!err || !err.message) {
          toast.error("Sync error occurred");
          return;
        }

        toast.error(err.message);
      });
  }

  useEffect(() => {
    const dbxAccessToken = window.localStorage.getItem("dbxAccessToken");
    if (!dbxAccessToken) return;
    setDbxAccessToken(dbxAccessToken);
  }, []);

  useEffect(() => {
    function checkForDBXTokenChange() {
      const dbxAccessTokenInStorage =
        window.localStorage.getItem("dbxAccessToken");
      if (!dbxAccessTokenInStorage) return;
      if (dbxAccessTokenInStorage === dbxAccessToken) return;

      setDbxAccessToken(dbxAccessTokenInStorage);
    }

    window.addEventListener("storage", checkForDBXTokenChange);

    return () => window.removeEventListener("storage", checkForDBXTokenChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSetting({ name: "syncInterval" }).then((setting) =>
      setSyncInterval(setting ? Number(setting.value) * 60_000 : 600_000),
    );
  }, []);

  useEffect(() => {
    if (!dbxAccessToken || forceStop) return;
    if (!online) {
      toast.error("No internet connection");
      return;
    }

    const interval = setInterval(() => triggerSync(), syncInterval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceStop, online, syncInterval, dbxAccessToken]);

  return (
    <SyncContext.Provider value={{ setForceStop, triggerSync }}>
      {children}
    </SyncContext.Provider>
  );
}
