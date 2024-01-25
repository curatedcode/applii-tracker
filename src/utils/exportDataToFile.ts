import jsonexport from "jsonexport";
import { RefObject } from "react";
import { FileExportTypeOptionsType } from "../types/file";
import { exportData } from "./db";

export type ExportDataToFileProps = {
	anchorEl: RefObject<HTMLAnchorElement>;
	fileType: FileExportTypeOptionsType;
	fileName: string;
};

export async function exportDataToFile({
	anchorEl,
	fileType,
	fileName,
}: ExportDataToFileProps) {
	if (!anchorEl.current) return;

	const rawData = await exportData();

	let blobURI: string;

	if (fileType === "csv") {
		const csvData = await jsonexport(rawData, {
			headerPathString: "/",
		});
		const fileBlob = new Blob([csvData], { type: "text/csv" });
		blobURI = URL.createObjectURL(fileBlob);
	} else {
		const jsonData = JSON.stringify(rawData);
		const fileBlob = new Blob([jsonData], { type: "text/json" });
		blobURI = URL.createObjectURL(fileBlob);
	}

	anchorEl.current.setAttribute("href", blobURI);
	anchorEl.current.setAttribute("download", `${fileName}.${fileType}`);
	anchorEl.current.click();
	URL.revokeObjectURL(blobURI);
}
