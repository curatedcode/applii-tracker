"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRelativeURL() {
  const pathname = usePathname();
  const params = useSearchParams();

  const [relativeURL, setRelativeURL] = useState(pathname);

  useEffect(() => {
    if (!window) return;

    setRelativeURL(location.href.replace(location.origin, ""));
  }, [pathname, params]);

  return relativeURL;
}
