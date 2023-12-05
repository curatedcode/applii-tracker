"use client";

import Button from "@/src/components/Button";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import ExternalLink from "@/src/components/Links/ExternalLink";
import SettingsSkeleton from "@/src/components/Loading/SettingsSkeleton";
import Modal from "@/src/components/Modal";
import useSync from "@/src/components/Sync/useSync";
import ThemeSelectInput from "@/src/components/Theme/ThemeSelectInput";
import { syncSettingsSchema } from "@/src/types/db";
import {
  defaultFileExportName,
  fileExportFormSchema,
  fileExportTypeSelectOptions,
} from "@/src/types/file";
import { getAllSettings, updateSetting } from "@/src/utils/db";
import {
  generateDropboxAuthToken,
  getDropboxAuthURL,
} from "@/src/utils/dropbox";
import { exportDataToFile, importDataFromFile } from "@/src/utils/sync";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Settings() {
  const { triggerSync } = useSync();
  const [showSyncSettings, setShowSyncSettings] = useState(false);

  const searchParams = useSearchParams();
  const dropboxTokenParam = searchParams.get("code");

  const [dbxAuthURL, setDbxAuthURL] = useState("");

  const fileExportRef = useRef<HTMLAnchorElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInputError, setFileInputError] = useState<string>();
  const [showFileExportModal, setShowFileExportModal] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  function submitSyncSettings() {
    setShowSyncSettings(false);

    const { syncInterval } = getFormSettingValues();

    if (syncInterval) {
      updateSetting({ name: "syncInterval", value: syncInterval });
    }

    toast.success("Sync settings updated");
  }

  function submitImportFile(e: ChangeEvent<HTMLInputElement>) {
    const allFiles = e.currentTarget.files;
    if (!allFiles) return;
    if (allFiles.length < 1) return;
    if (allFiles.length > 1) {
      setFileInputError("Please select only one file");
      return;
    }

    const file = allFiles[0];

    if (file.type !== "application/json") {
      setFileInputError("Please select a JSON file");
      return;
    }

    importDataFromFile(file).catch(() => {
      const value = fileInputRef.current?.value;
      if (!value) return;
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

  useEffect(() => {
    console.log(fileExportFormErrors);
  }, [fileExportFormErrors]);

  const currentFileExportFileType = watchFileExportForm("fileType");

  useEffect(() => {
    if (!dropboxTokenParam) return;
    generateDropboxAuthToken({
      initialToken: dropboxTokenParam,
      isSetup: true,
    }).then(() => {
      triggerSync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropboxTokenParam]);

  useEffect(() => {
    getAllSettings().then((allSettings) => {
      const syncInterval = allSettings.find(
        (setting) => setting.name === "syncInterval",
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
    setIsMounted(true);
    getDropboxAuthURL().then((url) => setDbxAuthURL(url));
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
      <div className="grid w-full max-w-md gap-6 justify-self-center">
        <ThemeSelectInput />
        <div className="grid auto-rows-min gap-2">
          <div className="flex h-9 items-center justify-between gap-2">
            <span>Sync data to dropbox account</span>
            {!showSyncSettings && (
              <Button onClick={() => setShowSyncSettings(true)}>Edit</Button>
            )}
          </div>
          {showSyncSettings && (
            <div className="grid gap-2">
              <ExternalLink
                href={dbxAuthURL}
                style="button"
                openInNewTab={false}
              >
                Get new dropbox token
              </ExternalLink>
              <form
                onSubmit={handleSettingFormSubmit(submitSyncSettings)}
                className="grid gap-4"
              >
                <FormInput
                  id="syncIntervalInput"
                  label="Sync Interval (in minutes)"
                  type="number"
                  register={registerFormSetting}
                  placeholder="Ex: 120 is 2 hours"
                  error={settingFormErrors.syncInterval?.message}
                  registerName="syncInterval"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => setShowSyncSettings(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" style="inverse" className="w-full">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="grid gap-6">
          <input
            type="file"
            className="hidden"
            accept=".json"
            ref={fileInputRef}
            onClick={() => setFileInputError(undefined)}
            onChange={(e) => submitImportFile(e)}
          />
          <a aria-hidden="true" className="hidden" ref={fileExportRef}></a>
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
      </div>
      <Modal
        isOpen={showFileExportModal}
        setIsOpen={setShowFileExportModal}
        title="Export settings"
      >
        <form
          onSubmit={handleFileExportFormSubmit(submitExportFile)}
          className="mt-4 grid gap-3 text-base"
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
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button onClick={() => setShowFileExportModal(false)}>
              Cancel
            </Button>
            <Button type="submit" style="inverse">
              Export
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
