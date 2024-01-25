"use client";

import { getSetting } from "@/src/utils/db";
import syncData from "@/src/utils/syncData";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";
import useConnectionStatus from "./Hooks/useConnectionStatus";

export type SyncContextType = {
	setForceStop: (_value: React.SetStateAction<boolean>) => void;
	triggerSync: (_value?: string) => void;
};

export const SyncContext = createContext<SyncContextType>({
	setForceStop: () => {},
	triggerSync: () => {},
});

export const useSync = () => useContext(SyncContext);

export default function SyncProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [forceStop, setForceStop] = useState(false);
	const [syncInterval, setSyncInterval] = useState<number>(600_000);

	const { online } = useConnectionStatus();

	const triggerSync = useCallback(() => {
		if (forceStop) return;
		const syncPromise = syncData();

		toast.promise(syncPromise, {
			success: "Synced successfully",
			loading: "Syncing data...",
			error: (err) => {
				if (typeof err !== "string") {
					return "Sync error (U1)";
				}
				return err;
			},
		});
	}, [forceStop]);

	useEffect(() => {
		getSetting({ name: "syncInterval" }).then((setting) =>
			setSyncInterval(setting ? Number(setting.value) * 60_000 : 600_000),
		);
	}, []);

	useEffect(() => {
		if (forceStop) return;
		if (!online) {
			toast.error("No internet connection");
			return;
		}

		const interval = setInterval(() => triggerSync(), syncInterval);

		return () => clearInterval(interval);
	}, [forceStop, online, syncInterval, triggerSync]);

	return (
		<SyncContext.Provider value={{ setForceStop, triggerSync }}>
			{children}
		</SyncContext.Provider>
	);
}
