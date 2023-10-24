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
  setToken: () => {},
  token: "",
});

export default function SyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [forceStop, setForceStop] = useState(false);
  const [syncInterval, setSyncInterval] = useState<number>(600_000);

  const { online } = useConnectionStatus();

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("dbxToken");
    if (token && token !== tokenInStorage) {
      localStorage.setItem("dbxToken", token);
      return;
    }
    if (tokenInStorage) {
      setToken(tokenInStorage);
    }
  }, [token]);

  function triggerSync() {
    if (!token || forceStop) return;
    syncData(token)
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
    getSetting({ name: "syncInterval" }).then((setting) =>
      setSyncInterval(setting ? Number(setting.value) * 60_000 : 600_000),
    );
  }, []);

  useEffect(() => {
    if (!token || forceStop) return;
    if (!online) {
      toast.error("No internet connection");
      return;
    }

    const interval = setInterval(() => triggerSync(), syncInterval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceStop, online, syncInterval, token]);

  return (
    <SyncContext.Provider
      value={{ setForceStop, triggerSync, setToken, token }}
    >
      {children}
    </SyncContext.Provider>
  );
}
