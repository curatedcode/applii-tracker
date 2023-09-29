"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { GetAllApplicationsReturnType, getAllApplications } from "../db";

type MainContextType = {
  formIsOpen: boolean;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
  applicationId: undefined | number;
  setApplicationId: Dispatch<SetStateAction<number | undefined>>;
  fetchApplications: () => void;
  allApplications: undefined | GetAllApplicationsReturnType;
};

const MainContext = createContext<MainContextType>({
  formIsOpen: false,
  setFormIsOpen: () => {},
  applicationId: undefined,
  setApplicationId: () => {},
  fetchApplications: () => {},
  allApplications: undefined,
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [applicationId, setApplicationId] = useState<undefined | number>(
    undefined,
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
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
