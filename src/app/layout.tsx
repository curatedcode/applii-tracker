"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { createContext, useContext, useEffect, useState } from "react";
import { MainContextType } from "../customVariables";
import { GetAllApplicationsReturnType, getAllApplications } from "../db";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applii",
  description:
    "Comprehensive job application tracker, helping you organize, monitor, and manage your job applications effortlessly",
  themeColor: "#014EE8",
};

const MainContext = createContext<MainContextType>({
  formIsOpen: false,
  setFormIsOpen: () => {},
  applicationId: undefined,
  setApplicationId: () => {},
  fetchApplications: () => {},
  allApplications: undefined,
});

export const useMainContext = () => useContext(MainContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [applicationId, setApplicationId] = useState<undefined | number>(
    undefined
  );
  const [allApplications, setAllApplications] =
    useState<GetAllApplicationsReturnType>();

  function fetchApplications() {
    getAllApplications().then((data) => setAllApplications(data));
  }

  useEffect(() => {
    if (formIsOpen) return;
    fetchApplications();
  }, [formIsOpen]);

  return (
    <MainContext.Provider
      value={{
        formIsOpen,
        setFormIsOpen,
        applicationId,
        setApplicationId,
        fetchApplications,
        allApplications,
      }}
    >
      <html lang="en" className="bg-site-main text-white">
        <body className={font.className}>{children}</body>
      </html>
    </MainContext.Provider>
  );
}
