"use client";

import { useEffect, useState } from "react";
import useDbxToken from "./Hooks/useDbxToken";
import { syncData } from "../utils/sync";
import useConnectionStatus from "./Hooks/useConnectionStatus";
import { getSetting } from "../utils/db";
import toast from "react-hot-toast";

export default function SyncData() {
  const [syncInterval, setSyncInterval] = useState<number>(600_000);
  const { online } = useConnectionStatus();
  const { token } = useDbxToken();

  useEffect(() => {
    getSetting({ name: "syncInterval" }).then((setting) =>
      setSyncInterval(setting ? Number(setting.value) * 60_000 : 600_000),
    );
  }, []);

  useEffect(() => {
    if (!token) return;
    if (!online) {
      toast.error("No internet connection");
      return;
    }

    const interval = setInterval(() => {
      if (!token) return;

      syncData(token)
        .then(() => {
          toast.success("Synced successfully");
        })
        .catch((err: { message: string }) => {
          toast.error(err.message);
        });
    }, syncInterval);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online, syncInterval, token]);

  return null;
}
