"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRelativeURL() {
	const pathname = usePathname();
	const params = useSearchParams();

	const [relativeURL, setRelativeURL] = useState(pathname);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Needed to make sure the relative url stays in sync to the url
	useEffect(() => {
		if (!window) return;

		setRelativeURL(location.href.replace(location.origin, ""));
	}, [pathname, params]);

	return relativeURL;
}
