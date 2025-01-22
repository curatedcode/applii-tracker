import type { fileExportTypeOption } from "@/src/types/file";
import { exportData } from "@/src/utils/db/helpers";
import jsonexport from "jsonexport";
import type { RefObject } from "react";

export type ExportDataToFileProps = {
	anchorEl: RefObject<HTMLAnchorElement>;
	fileType: fileExportTypeOption;
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

	if (fileType === "CSV") {
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
	anchorEl.current.setAttribute(
		"download",
		`${fileName}.${fileType.toLowerCase()}`,
	);
	anchorEl.current.click();
	URL.revokeObjectURL(blobURI);
}
