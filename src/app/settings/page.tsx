"use client";

import Button from "@/src/components/Button";
import FormInput from "@/src/components/Form/FormInput";
import useDbxToken from "@/src/components/Hooks/useDbxToken";
import ExternalLink from "@/src/components/Links/ExternalLink";
import SettingsSkeleton from "@/src/components/Loading/SettingsSkeleton";
import ThemeSelectInput from "@/src/components/Theme/ThemeSelectInput";
import useToastContext from "@/src/components/Toast/useToastContext";
import { getDropboxAuthURL } from "@/src/utils/sync";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Settings() {
  const { setForceStop } = useToastContext();

  const { token, setToken } = useDbxToken();
  const [showTokenSection, setShowTokenSection] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [dropboxAuthURL, setDropboxAuthUrl] = useState("");

  function submitToken() {
    setShowTokenSection(false);
    setShowTokenInput(false);
    const newToken = getValues("dbxToken");
    if (newToken.length > 1) return;
    setToken(newToken);
  }

  const schema = z.object({ dbxToken: z.string() });
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ defaultValues: { dbxToken: token } });

  useEffect(() => {
    if (showTokenSection) {
      setForceStop(true);
      return;
    }
    setForceStop(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTokenSection]);

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
            {!showTokenSection && (
              <Button onClick={() => setShowTokenSection(true)}>
                Set Token
              </Button>
            )}
          </div>
          {showTokenSection && (
            <div className="grid gap-2">
              <ExternalLink
                href={dropboxAuthURL}
                onClick={() => setShowTokenInput(true)}
                className="flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-all duration-100 focus-within:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary"
              >
                Get access token
              </ExternalLink>
              {showTokenInput && (
                <form onSubmit={submitToken} className="grid gap-4">
                  <FormInput
                    id="dbxTokenInput"
                    label="Dropbox Access Token"
                    register={register}
                    placeholder="Access Token"
                    error={errors.dbxToken?.message}
                    registerName="dbxToken"
                    hiddenLabel
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => {
                        setShowTokenSection(false);
                        setShowTokenInput(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full bg-dark-secondary dark:bg-light-secondary dark:text-light-text"
                    >
                      Save Token
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
