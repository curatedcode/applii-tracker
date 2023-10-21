"use client";

import { useContext } from "react";
import { ToastContext } from "./ToastContextProvider";

const useToastContext = () => useContext(ToastContext);

export default useToastContext;
