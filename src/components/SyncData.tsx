"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Toast from "./Toast/Toast";
import { useEffect, useState } from "react";
import useDbxToken from "./Hooks/useDbxToken";
import { syncData } from "../utils/sync";
import useToastContext from "./Toast/useToastContext";
import useConnectionStatus from "./Hooks/useConnectionStatus";

export default function SyncData() {
  const { showToast, setShowToast, forceStop } = useToastContext();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { isOnline } = useConnectionStatus();
  const { token } = useDbxToken();

  function triggerSync() {
    if (forceStop || !token) return;

    syncData(token)
      .then(() => {
        if (!isOnline) {
          setShowToast(true);
          return;
        }
        setErrorMessage(undefined);
        setShowToast(true);
      })
      .catch((err: { message: string }) => {
        setErrorMessage(err.message);
        setShowToast(true);
      });
  }

  useEffect(() => {
    if (forceStop || !token) return;
    if (isOnline) {
      setErrorMessage(undefined);
    } else {
      setErrorMessage("No internet connection");
      setShowToast(true);
      return;
    }

    const interval = setInterval(() => triggerSync(), 600_000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, forceStop]);

  if (errorMessage) {
    return (
      <Toast show={showToast} setShow={setShowToast}>
        <XCircleIcon className="w-6 text-card-closed" aria-hidden="true" />
        <p className="whitespace-nowrap">{errorMessage}</p>
      </Toast>
    );
  }

  return (
    <Toast show={showToast} setShow={setShowToast}>
      <CheckCircleIcon className="w-6 text-card-applied" aria-hidden="true" />
      <p className="whitespace-nowrap">Synced successfully</p>
    </Toast>
  );
}
