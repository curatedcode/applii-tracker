"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";
import ExternalLink from "../ExternalLink";

export default function FAQAccordion() {
	return (
		<div className="mx-auto grid w-full max-w-3xl animate-shift-gradient-x gap-4 rounded-md bg-gradient-to-bl from-light-primary via-light-primary to-light-secondary px-4 py-5 ring-2 ring-light-secondary dark:from-dark-primary dark:via-dark-primary dark:to-dark-secondary dark:ring-dark-secondary">
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left font-medium ring-2 ring-light-secondary dark:ring-dark-secondary">
							<span>What is Applii?</span>
							<ChevronUpIcon
								className={`${
									open ? "rotate-180" : ""
								} h-5 w-5 transform transition-transform duration-75`}
							/>
						</Disclosure.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-80"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-80"
						>
							<Disclosure.Panel className="px-2 pb-1">
								Applii is a local-first web app that helps you organize,
								monitor, and manage your job applications with cloud sync
								support. It is also open source, meaning you can view and
								contribute to the website on{" "}
								<ExternalLink
									href="https://github.com/curatedcode/applii-tracker"
									className="underline underline-offset-1"
								>
									GitHub
								</ExternalLink>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left font-medium ring-2 ring-light-secondary dark:ring-dark-secondary">
							<span>How do I use Applii?</span>
							<ChevronUpIcon
								className={`${
									open ? "rotate-180" : ""
								} h-5 w-5 transform transition-transform duration-75`}
							/>
						</Disclosure.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-80"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-80"
						>
							<Disclosure.Panel className="px-2 pb-1">
								No sign-up required. Just{" "}
								<Link href="/boards" className="underline underline-offset-1">
									click here
								</Link>{" "}
								to start adding your job applications. You can also go to the
								settings page and choose your preferred sync method or download
								your data at anytime.
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left font-medium ring-2 ring-light-secondary dark:ring-dark-secondary">
							<span>How can I contact Applii?</span>
							<ChevronUpIcon
								className={`${
									open ? "rotate-180" : ""
								} h-5 w-5 transform transition-transform duration-75`}
							/>
						</Disclosure.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-80"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-80"
						>
							<Disclosure.Panel className="px-2 pb-1">
								If you have any questions, feedback, suggestions, or issues
								related to Applii, you can open an issue or discussion on our{" "}
								<ExternalLink
									href="https://github.com/curatedcode/applii-tracker"
									className="underline underline-offset-1"
								>
									GitHub.
								</ExternalLink>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left font-medium ring-2 ring-light-secondary dark:ring-dark-secondary">
							<span>How can I contribute to Applii?</span>
							<ChevronUpIcon
								className={`${
									open ? "rotate-180" : ""
								} h-5 w-5 transform transition-transform duration-75`}
							/>
						</Disclosure.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-80"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-80"
						>
							<Disclosure.Panel className="px-2 pb-1">
								If you want to contribute to Applii’s development, improvement,
								and maintenance, you can find the app’s repository on{" "}
								<ExternalLink
									href="https://github.com/curatedcode/applii-tracker"
									className="underline underline-offset-1"
								>
									GitHub.
								</ExternalLink>{" "}
								You can also report bugs, request features, or submit pull
								requests. We appreciate any help and support.
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
		</div>
	);
}
