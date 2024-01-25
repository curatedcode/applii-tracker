"use client";

import getDemoApplication from "@/src/components/Demo/getDemoApplication";
import formatDate from "@/src/components/Fn/formatDate";
import ViewApplicationSkeleton from "@/src/components/Loading/ViewApplicationSkeleton";
import ULItem from "@/src/components/ULItem";
import { readableStatus } from "@/src/types/global";
import { useRouter, useSearchParams } from "next/navigation";

export default function Application() {
	const id = Number(useSearchParams().get("id"));
	const router = useRouter();

	if (!id || Number.isNaN(id)) return router.push("/not-found");

	const application = getDemoApplication(id);
	if (!application) return <ViewApplicationSkeleton />;

	const {
		position,
		company,
		postingURL,
		contacts,
		notes,
		status,
		dateCreated,
		dateApplied,
		dateInterviewing,
		dateOffered,
		dateClosed,
	} = application;

	return (
		<>
			<div id="loadingApplication" aria-live="polite" className="sr-only">
				<p>Loaded application.</p>
			</div>
			<div className="mb-8 flex flex-col items-center gap-6">
				<h1 className="w-fit text-center text-3xl font-semibold">
					{position} at {company}
				</h1>
			</div>
			<div className="grid justify-items-center gap-x-12 gap-y-8 md:grid-cols-2">
				<div className="grid w-full auto-rows-min">
					<h2
						id="detailsHeader"
						className="mb-6 h-fit w-fit justify-self-center border-b px-1 text-lg font-semibold md:text-xl"
					>
						Details
					</h2>
					<ul
						aria-labelledby="detailsHeader"
						className="grid gap-2 rounded-md bg-light-secondary px-4 py-3 dark:bg-dark-secondary"
					>
						<ULItem label="Position" body={position} />
						<ULItem label="Company" body={company} />
						<ULItem
							label="Posting URL"
							body={postingURL ?? "None"}
							isLink={postingURL ? true : false}
						/>
						<ULItem label="Status" body={readableStatus[status]} />
						<ULItem label="Created on" body={formatDate(dateCreated)} />
						{status === "applied" && dateApplied && (
							<ULItem label="Applied on" body={formatDate(dateApplied)} />
						)}
						{status === "interviewing" && dateInterviewing && (
							<ULItem
								label="Interviewing on"
								body={formatDate(dateInterviewing)}
							/>
						)}
						{status === "offer" && dateOffered && (
							<ULItem label="Offered on" body={formatDate(dateOffered)} />
						)}
						{status === "closed" && dateClosed && (
							<ULItem label="Closed on" body={formatDate(dateClosed)} />
						)}
					</ul>
				</div>
				<div className="grid w-full gap-8">
					<div className="grid w-full auto-rows-min">
						<h2
							id="contactsHeader"
							className="mb-6 h-fit w-fit justify-self-center border-b px-1 text-lg font-semibold md:text-xl"
						>
							Contacts
						</h2>
						{contacts && contacts.length > 0 ? (
							<ul
								aria-labelledby="contactsHeader"
								className="grid auto-rows-min gap-3 md:max-h-96 md:overflow-y-scroll md:p-0.5"
							>
								{contacts.map((contact) => (
									<ul
										key={crypto.randomUUID()}
										className="grid gap-2 rounded-md bg-light-secondary px-4 py-3 dark:bg-dark-secondary"
									>
										<ULItem label="Name" body={contact.name} />
										{contact.position && (
											<ULItem label="Position" body={contact.position} />
										)}
										{contact.phone && (
											<ULItem label="Phone" body={contact.phone} />
										)}
										{contact.email && (
											<ULItem label="Email" body={contact.email} />
										)}
									</ul>
								))}
							</ul>
						) : (
							<span
								aria-labelledby="contactsHeader"
								className="justify-self-center md:mb-24"
							>
								No contacts...
							</span>
						)}
					</div>
					<div className="grid w-full auto-rows-min">
						<h2
							id="notesHeader"
							className="mb-6 h-fit w-fit justify-self-center border-b px-1 text-lg font-semibold md:text-xl"
						>
							Notes
						</h2>
						{notes && notes.length > 0 ? (
							<ul
								aria-labelledby="notesHeader"
								className="grid auto-rows-min gap-3 md:max-h-96 md:overflow-y-scroll md:p-0.5"
							>
								{notes.map((note, index) => (
									<ULItem
										label={`Note ${index + 1}`}
										key={crypto.randomUUID()}
										body={note.body}
										className="rounded-md bg-light-secondary px-4 py-3 dark:bg-dark-secondary"
										hiddenLabel={true}
									/>
								))}
							</ul>
						) : (
							<span
								aria-labelledby="notesHeader"
								className="justify-self-center"
							>
								No notes...
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
