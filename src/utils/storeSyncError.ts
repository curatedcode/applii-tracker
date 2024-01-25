import { syncErrorType } from "../types/sync";

export type StoreSyncErrorProps = {
	error: unknown;
};

export default function storeSyncError({ error }: StoreSyncErrorProps) {
	const errorAsString = `${error}`;
	const errorsInStorage = localStorage.getItem("syncErrors");

	if (!errorsInStorage) {
		localStorage.setItem("errorsInStorage", JSON.stringify([errorAsString]));
		return;
	}

	const errorsInStorageParsed = syncErrorType.safeParse(errorsInStorage);

	if (!errorsInStorageParsed.success) {
		localStorage.setItem("errorsInStorage", JSON.stringify([errorAsString]));
		return;
	}

	localStorage.setItem(
		"errorsInStorage",
		JSON.stringify([...errorsInStorageParsed.data, errorAsString]),
	);
}
