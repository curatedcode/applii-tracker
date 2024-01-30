"use client";

import Button from "@/src/components/Button";
import ErrorMessage from "@/src/components/Form/ErrorMessage";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import useTheme from "@/src/components/Hooks/useTheme";
import SettingsSkeleton from "@/src/components/Loading/SettingsSkeleton";
import Modal from "@/src/components/Modals/Modal";
import ModalForm from "@/src/components/Modals/ModalForm";
import PromiseLink from "@/src/components/PromiseLink";
import SelectInput from "@/src/components/SelectInput";
import { useSync } from "@/src/components/SyncProvider";
import { syncSettingsSchema } from "@/src/types/db";
import { dropboxTokenNames } from "@/src/types/dropbox";
import {
	defaultFileExportName,
	fileExportFormSchema,
	fileExportTypeSelectOptions,
} from "@/src/types/file";
import { defaultFocusHoverClasses, themeOptions } from "@/src/types/global";
import { getAllSettings, updateSetting } from "@/src/utils/db";
import { createDropboxToken, getDropboxAuthURL } from "@/src/utils/dropbox";
import { exportDataToFile } from "@/src/utils/exportDataToFile";
import { importDataFromFile } from "@/src/utils/importDataFromFile";
import {
	ArrowDownTrayIcon,
	ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
dayjs.extend(relativeTime);

export default function Settings() {
	const { triggerSync } = useSync();

	const { currentTheme, setCurrentTheme } = useTheme();

	const searchParams = useSearchParams();
	const dropboxTokenParam = searchParams.get("code");

	const fileExportRef = useRef<HTMLAnchorElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileInputError, setFileInputError] = useState<string>();
	const [showFileExportModal, setShowFileExportModal] = useState(false);

	const [showFileImportModal, setShowFileImportModal] = useState(false);

	const [isMounted, setIsMounted] = useState(false);

	const [lastSuccessfulSync, setLastSuccessfulSync] = useState("Never");

	function submitSyncSettings() {
		const { syncInterval } = getFormSettingValues();

		if (syncInterval) {
			updateSetting({ name: "syncInterval", value: syncInterval });
		}

		toast.success("Sync settings updated");
	}

	function submitImportFile() {
		if (!fileInputRef.current) {
			toast.error("Error importing file");
			return;
		}

		const files = fileInputRef.current.files;

		if (!files || files.length < 1) {
			toast.error("Please select a file to import");
			return;
		}

		if (files.length > 1) {
			setFileInputError("Please select only one file to import");
			return;
		}

		const file = files[0];

		if (file.type !== "application/json") {
			setFileInputError("Please select a JSON file");
			return;
		}

		importDataFromFile(file)
			.catch((e) => {
				console.log({ fileImportError: e });
				toast.error("Error importing file. Try again");
				if (!fileInputRef.current?.value) return;
				fileInputRef.current.value = "";
			})
			.finally(() => {
				setShowFileImportModal(false);
				if (!fileInputRef.current?.value) return;
				fileInputRef.current.value = "";
			});
	}

	function submitExportFile() {
		const { fileName, fileType } = getFileExportFormValues();

		toast.promise(
			exportDataToFile({
				anchorEl: fileExportRef,
				fileType: fileType.value,
				fileName,
			}),
			{
				loading: "Exporting file",
				error: "Unable to export file",
				success: "File exported successfully",
			},
		);
	}

	const {
		register: registerFormSetting,
		getValues: getFormSettingValues,
		setValue: setFormSettingValue,
		handleSubmit: handleSettingFormSubmit,
		formState: { errors: settingFormErrors },
	} = useForm<z.infer<typeof syncSettingsSchema>>({
		resolver: zodResolver(syncSettingsSchema),
	});

	const {
		register: registerFileExportForm,
		getValues: getFileExportFormValues,
		setValue: setFileExportFormValue,
		handleSubmit: handleFileExportFormSubmit,
		formState: { errors: fileExportFormErrors },
		control: fileExportFormControl,
		watch: watchFileExportForm,
	} = useForm<z.infer<typeof fileExportFormSchema>>({
		resolver: zodResolver(fileExportFormSchema),
		defaultValues: {
			fileName: defaultFileExportName,
		},
	});

	const currentFileExportFileType = watchFileExportForm("fileType");

	useEffect(() => {
		if (!dropboxTokenParam) return;
		const oldDbxToken = window.localStorage.getItem(
			dropboxTokenNames.initialAuthToken,
		);
		if (oldDbxToken && oldDbxToken === dropboxTokenParam) return;

		window.localStorage.setItem(
			dropboxTokenNames.initialAuthToken,
			dropboxTokenParam,
		);
		createDropboxToken(dropboxTokenParam).then(() => {
			triggerSync();
		});
	}, [dropboxTokenParam, triggerSync]);

	useEffect(() => {
		getAllSettings().then((allSettings) => {
			const syncInterval = allSettings.find(
				(setting) => setting.name === "syncInterval",
			);
			const lastSynced = allSettings.find(
				(setting) => setting.name === "lastSuccessfulSync",
			);
			setLastSuccessfulSync(
				lastSynced ? dayjs(lastSynced.value).fromNow() : "Never",
			);
			setFormSettingValue(
				"syncInterval",
				syncInterval ? syncInterval.value : "5",
			);
		});
	}, [setFormSettingValue]);

	useEffect(() => {
		setFileExportFormValue("fileType", fileExportTypeSelectOptions[0]);
	}, [setFileExportFormValue]);

	useEffect(() => {
		if (!currentTheme) return;
		updateSetting({ name: "theme", value: currentTheme.value });
	}, [currentTheme]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <SettingsSkeleton />;

	return (
		<>
			<div id="loadingSettings" aria-live="polite" className="sr-only">
				<p>Loaded settings.</p>
			</div>
			<div className="mb-12 grid justify-items-center gap-2 justify-self-center text-sm md:flex md:items-center md:gap-4">
				<h1 className="text-3xl font-semibold">Settings</h1>
			</div>
			<div className="grid w-full max-w-lg gap-8 divide-y divide-light-secondary justify-self-center dark:divide-dark-secondary">
				<div className="space-y-4 pt-4">
					<div className="mb-6 space-y-1">
						<h2 className="text-xl font-medium">Appearance</h2>
						<p className="text-sm">Customize the appearance of the app</p>
					</div>
					<SelectInput
						options={themeOptions}
						selected={currentTheme ?? themeOptions[2]}
						setSelected={setCurrentTheme}
						label="Theme"
					/>
				</div>
				<div className="space-y-4 pt-4">
					<div className="mb-6 space-y-1">
						<h2 className="text-xl font-medium">Data</h2>
						<p className="text-sm">Import and export all your data</p>
					</div>
					<div className="grid gap-4">
						<input
							type="file"
							className="hidden"
							accept=".json"
							ref={fileInputRef}
							onClick={() => setFileInputError(undefined)}
							onChange={() => setShowFileImportModal(true)}
						/>
						{/* biome-ignore lint/a11y/useAnchorContent: element is not viewable or interactive, its just meant for downloading files. */}
						{/* biome-ignore lint/a11y/useValidAnchor: element is not viewable or interactive, its just meant for downloading files. */}
						{/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: element is not viewable or interactive, its just meant for downloading files. */}
						<a aria-hidden="true" className="hidden" ref={fileExportRef} />
						<Button onClick={() => setShowFileExportModal(true)}>
							<ArrowUpTrayIcon className="w-4" aria-hidden="true" />
							<span>Export data</span>
						</Button>
						<div className="grid gap-1">
							<Button onClick={() => fileInputRef.current?.click()}>
								<ArrowDownTrayIcon className="w-4" aria-hidden="true" />
								<span>Import data from file</span>
							</Button>
							{fileInputError && (
								<span role="alert" className="text-red-500">
									* {fileInputError}
								</span>
							)}
						</div>
					</div>
					<Modal
						isOpen={showFileImportModal}
						setIsOpen={setShowFileImportModal}
						title="Import file"
						description="Are you sure you want to import this file? Any existing data will be overwritten!"
						secondaryButton={{
							as: "button",
							onClick: () => setShowFileImportModal(false),
							body: "Cancel",
						}}
						primaryButton={{
							as: "button",
							onClick: () => submitImportFile(),
							body: "Import",
						}}
					/>
					<ModalForm
						isOpen={showFileExportModal}
						setIsOpen={setShowFileExportModal}
						title="Export settings"
						description="Choose your file name and type"
						secondaryButton={{
							as: "button",
							onClick: () => setShowFileExportModal(false),
							body: "Cancel",
						}}
						primaryButton={{
							as: "button",
							type: "submit",
							body: "Export",
						}}
						onSubmit={handleFileExportFormSubmit(submitExportFile)}
					>
						<FormInput
							id="fileExportName"
							label="File name"
							type="text"
							register={registerFileExportForm}
							error={fileExportFormErrors.fileName?.message}
							registerName="fileName"
						/>
						<Controller
							name="fileType"
							control={fileExportFormControl}
							render={({ field: { onChange } }) => (
								<FormSelectInput
									label="File type"
									selected={
										currentFileExportFileType ?? fileExportTypeSelectOptions[0]
									}
									setSelected={onChange}
									options={fileExportTypeSelectOptions}
								/>
							)}
						/>
					</ModalForm>
				</div>
				<div className="space-y-4 pt-4">
					<div className="mb-6 space-y-1">
						<h2 className="text-xl font-medium">Sync</h2>
						<p className="text-sm">Edit your sync settings</p>
						<p className="text-sm">Last synced {lastSuccessfulSync}</p>
					</div>
					<div className="grid gap-4">
						<Button onClick={() => triggerSync()}>Trigger sync manually</Button>
						<PromiseLink
							promise={getDropboxAuthURL}
							loading={"Fetching url"}
							error={"Failed to get url"}
							openInNewTab={false}
						>
							Get new dropbox token
						</PromiseLink>
						<form
							onSubmit={handleSettingFormSubmit(submitSyncSettings)}
							className="flex w-full flex-col items-center gap-4 md:flex-row"
						>
							<div className="grid w-full gap-1">
								<div className="flex w-full flex-col md:flex-row md:items-center md:gap-1">
									<label
										htmlFor="syncInterval"
										className="mb-1 ml-1 flex gap-1 text-sm leading-tight opacity-80 md:mb-0 md:ml-0 md:w-32"
									>
										Sync Interval &#40;in minutes&#41;
									</label>
									<input
										id="syncInterval"
										type="number"
										min={1}
										placeholder="Ex: 120 is 2 hours"
										className={`${defaultFocusHoverClasses} w-full rounded-md bg-light-secondary px-3 py-1.5 placeholder:opacity-70 dark:bg-dark-secondary ${
											settingFormErrors.syncInterval?.message
												? "ring-1 ring-red-500"
												: ""
										}`}
										{...registerFormSetting("syncInterval")}
									/>
								</div>
								<ErrorMessage error={settingFormErrors.syncInterval?.message} />
							</div>
							<Button
								type="submit"
								style="inverse"
								className="w-full md:hidden"
							>
								Update interval
							</Button>
							<Button type="submit" style="inverse" className="hidden md:flex">
								Save
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
