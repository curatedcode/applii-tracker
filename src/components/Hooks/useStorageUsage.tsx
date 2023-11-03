"use client";

import { useEffect, useState } from "react";

/**
 * Only available in secure context or on localhost
 * @returns A number (0-100) that represents the usage percent
 */
export default function useStorageUsage() {
  const [usagePercent, setUsagePercent] = useState<number>();
  const [estimate, setEstimate] = useState<StorageEstimate>();

  useEffect(() => {
    if (!window || !window.indexedDB) return;
    if (!window.isSecureContext) return;

    navigator.storage.estimate().then((estimate) => setEstimate(estimate));
  }, []);

  useEffect(() => {
    if (!window || !window.indexedDB) return;
    if (!estimate) return;
    if (!estimate.usage || !estimate.quota) return;

    const usage = (estimate.usage / estimate.quota) * 100;
    setUsagePercent(Number(usage.toFixed(1)));
  }, [estimate]);

  return {
    usagePercent,
  };
}
