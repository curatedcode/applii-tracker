"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { defaultFocusHoverClasses } from "../../types/global";
import LoadingSpinnerIcon from "../LoadingSpinnerIcon";

export type PromiseLinkProps = {
	promise: () => Promise<string>;
	loading: string;
	error: string;
	maxRetries?: number;
	tryAgainOnError?: boolean;
	children: React.ReactNode;
	className?: string;
	openInNewTab?: boolean;
	errorRetryTime?: number;
};

/**
 * @param promise a promise that returns a string to be used as the href
 * @param loading message displayed while the promise is running
 * @param error message displayed if the promise fails
 * @param maxRetries the max number of retires (default: 3)
 * @param tryAgainOnError if you want the promise to be re-run after a failure (default: false)
 * @param children this will be displayed before the link is clicked
 * @param className any classes you need
 * @param openInNewTab if you want the link to open in a new tab (default: true)
 * @param errorRetryTime shows the initial button after a set time, in ms, after an error. Set to 0 to disable. (default: 3000)
 */
export default function PromiseLink({
	promise,
	className,
	loading,
	error,
	maxRetries = 3,
	tryAgainOnError = false,
	children,
	openInNewTab = true,
	errorRetryTime = 3000,
}: PromiseLinkProps) {
	const linkRef = useRef<HTMLAnchorElement>(null);
	const [promiseHref, setPromiseHref] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [retries, setRetries] = useState(0);

	function retryPromise() {
		if (retries === maxRetries) return;
		setRetries((val) => val + 1);
		setPromiseHref(undefined);
		triggerPromise();
	}

	function triggerPromise() {
		setIsLoading(true);
		promise()
			.then((href) => {
				setPromiseHref(href);
				setIsLoading(false);
			})
			.catch(() => {
				setIsError(true);
				setIsLoading(false);
			});
	}

	useEffect(() => {
		if (!promiseHref) return;
		linkRef.current?.click();
	}, [promiseHref]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: retryPromise changes on every re-render and should not be used as a hook dependency.
	useEffect(() => {
		if (!isError || !tryAgainOnError) return;
		retryPromise();
	}, [isError, tryAgainOnError]);

	useEffect(() => {
		if (!isError) return;
		if (errorRetryTime <= 0) return;
		setTimeout(() => setIsError(false), errorRetryTime);
	}, [isError, errorRetryTime]);

	if (isLoading) {
		return (
			<div
				aria-label="loading"
				className={`${defaultFocusHoverClasses} pointer-events-none flex h-fit min-w-button cursor-wait items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-1.5 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
			>
				<LoadingSpinnerIcon />
				{loading}
			</div>
		);
	}

	if (isError) {
		return (
			<div
				aria-label="error"
				className={`${defaultFocusHoverClasses} pointer-events-none flex h-fit min-w-button cursor-wait items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-1.5 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
			>
				<XCircleIcon className="w-6 text-applii-closed" aria-hidden="true" />
				{error}
			</div>
		);
	}

	if (promiseHref) {
		return (
			<a
				rel="nofollow noreferrer"
				target={openInNewTab ? "_blank" : "_self"}
				ref={linkRef}
				className={`${defaultFocusHoverClasses} flex h-fit min-w-button items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
				href={promiseHref}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			type="button"
			onClick={() => triggerPromise()}
			className={`${defaultFocusHoverClasses} flex h-fit min-w-button cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
		>
			{children}
		</button>
	);
}
