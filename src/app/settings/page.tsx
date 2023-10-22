"use client";

import Button from "@/src/components/Button";
import FormInput from "@/src/components/Form/FormInput";
import useDbxToken from "@/src/components/Hooks/useDbxToken";
import ExternalLink from "@/src/components/Links/ExternalLink";
import SettingsSkeleton from "@/src/components/Loading/SettingsSkeleton";
import ThemeSelectInput from "@/src/components/Theme/ThemeSelectInput";
import useToastContext from "@/src/components/Toast/useToastContext";
import { SettingsType, syncSettingsSchema } from "@/src/utils/customVariables";
import { getAllSettings, updateSetting } from "@/src/utils/db";
import { getDropboxAuthURL } from "@/src/utils/sync";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Settings() {
  const { setForceStop } = useToastContext();

  const { token, setToken } = useDbxToken();
  const [showSyncSettings, setShowSyncSettings] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [dropboxAuthURL, setDropboxAuthUrl] = useState("");

  function submitSyncSettings() {
    setShowSyncSettings(false);

    const { dbxToken, syncInterval } = getValues();

    syncInterval &&
      updateSetting({ name: "syncInterval", value: syncInterval });
    dbxToken && setToken(dbxToken);
  }

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof syncSettingsSchema>>();

  useEffect(() => {
    if (showSyncSettings) {
      setForceStop(true);
      return;
    }
    setForceStop(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSyncSettings]);

  useEffect(() => {
    setValue("dbxToken", token);
  }, [setValue, token]);

  useEffect(() => {
    getAllSettings().then((allSettings) => {
      const syncInterval = allSettings.find(
        (setting) => setting.name === "syncInterval",
      );
      setValue("syncInterval", syncInterval?.value);
    });
  }, [setValue]);

  useEffect(() => {
    setIsMounted(true);
    getDropboxAuthURL().then((value) => setDropboxAuthUrl(value));
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
              <ExternalLink href={dropboxAuthURL} style="button">
                Get access token
              </ExternalLink>
              <form
                onSubmit={handleSubmit(submitSyncSettings)}
                className="grid gap-4"
              >
                <FormInput
                  id="dbxTokenInput"
                  label="Dropbox Access Token"
                  register={register}
                  placeholder="Access Token"
                  error={errors.dbxToken?.message}
                  registerName="dbxToken"
                  hiddenLabel
                />
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
      </div>
    </>
  );
}
