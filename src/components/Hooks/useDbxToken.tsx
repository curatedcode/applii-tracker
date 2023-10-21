"use client";

import { useEffect, useState } from "react";

export default function useDbxToken() {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("dbxToken");
    if (tokenInStorage) {
      setToken(tokenInStorage);
    }
    if (token && token !== tokenInStorage) {
      localStorage.setItem("dbxToken", token);
    }
  }, [token]);

  return { token, setToken };
}
