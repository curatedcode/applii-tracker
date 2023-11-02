"use client";

import Button from "@/src/components/Button";
import FormInput from "@/src/components/Form/FormInput";
import ExternalLink from "@/src/components/Links/ExternalLink";
import SettingsSkeleton from "@/src/components/Loading/SettingsSkeleton";
import useSync from "@/src/components/Sync/useSync";
import ThemeSelectInput from "@/src/components/Theme/ThemeSelectInput";
import { syncSettingsSchema } from "@/src/utils/customVariables";
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
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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

  const [isMounted, setIsMounted] = useState(false);

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

  function submitSyncSettings() {
    setShowSyncSettings(false);

    const { syncInterval } = getValues();

    if (syncInterval) {
      updateSetting({ name: "syncInterval", value: syncInterval });
    }

    toast.success("Sync settings updated");
    triggerSync();
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

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof syncSettingsSchema>>();

  useEffect(() => {
    getAllSettings().then((allSettings) => {
      const syncInterval = allSettings.find(
        (setting) => setting.name === "syncInterval",
      );
      setValue("syncInterval", syncInterval ? syncInterval.value : "5");
    });
  }, [setValue]);

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
      <div className="flex w-full max-w-sm flex-col gap-6 justify-self-center">
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
                onSubmit={handleSubmit(submitSyncSettings)}
                className="grid gap-4"
              >
                <FormInput
                  id="syncIntervalInput"
                  label="Sync Interval (in minutes)"
                  type="number"
                  register={register}
                  placeholder="Ex: 120 is 2 hours"
                  error={errors.syncInterval?.message}
                  registerName="syncInterval"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => setShowSyncSettings(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-dark-secondary dark:bg-light-secondary dark:text-light-text"
                  >
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
          <Button onClick={() => exportDataToFile(fileExportRef)}>
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
    </>
  );
}
