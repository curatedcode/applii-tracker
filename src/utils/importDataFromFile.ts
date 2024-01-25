import toast from "react-hot-toast";
import { importData } from "./db";

export async function importDataFromFile(file: File) {
	const fr = new FileReader();

	fr.addEventListener("load", async () => {
		const data = fr.result;
		if (typeof data !== "string") {
			toast.error("Imported data is invalid");
			return;
		}
		const dataParsed = JSON.parse(data);
		const importPromise = importData(dataParsed);
		toast.promise(importPromise, {
			loading: "Importing data",
			error: "Imported data is invalid",
			success: "Data imported successfully",
		});
	});
	fr.readAsText(file);
}
