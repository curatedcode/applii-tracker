"use client";

import { useEffect, useState } from "react";

export default function useScrollbar() {
	const [scrollbarWidth, setScrollbarWidth] = useState(0);

	function updateScrollbarWidth() {
		const htmlElement = document.getElementsByTagName("html").item(0);

		if (!htmlElement) {
			setScrollbarWidth(0);
			return;
		}

		const isScrollbarVisible =
			htmlElement.scrollHeight > htmlElement.clientHeight;
		if (!isScrollbarVisible) {
			setScrollbarWidth(0);
			return;
		}

		const outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.overflow = "scroll";
		document.body.appendChild(outer);

		const inner = document.createElement("div");
		outer.appendChild(inner);

		const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

		outer.parentNode?.removeChild(outer);

		setScrollbarWidth(scrollbarWidth);
	}

	useEffect(() => {
		updateScrollbarWidth();
		window.addEventListener("resize", updateScrollbarWidth);

		return () => window.removeEventListener("resize", updateScrollbarWidth);
	}, []);

	return {
		width: scrollbarWidth,
	};
}
