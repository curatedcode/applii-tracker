"use client";

import { ApplicationStatusType } from "@/src/utils/customVariables";
import formatDate from "@/src/components/Fn/formatDate";
import { useRouter, useSearchParams } from "next/navigation";
import ULItem from "@/src/components/ULItem";
import ViewApplicationSkeleton from "@/src/components/Loading/ViewApplicationSkeleton";
import getDemoApplication from "@/src/components/Demo/getDemoApplication";

export default function Application() {
  const id = Number(useSearchParams().get("id"));
  const router = useRouter();

  function readableStatus(status: ApplicationStatusType) {
    if (status === "needToApply") return "Need to apply";
    if (status === "applied") return "Applied";
    if (status === "interviewing") return "Interviewing";
    if (status === "offer") return "Offer";
    return "Closed";
  }

  if (!id || isNaN(id)) return router.push("/not-found");

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
      <div id="loadingSlug" aria-live="polite" className="sr-only">
        <p>Loaded application.</p>
      </div>
      <div className="mb-8 flex flex-col items-center gap-6">
        <h1 className="w-fit text-center text-3xl font-semibold">
          {position} at {company}
        </h1>
      </div>
      <div className="grid w-full justify-items-center gap-x-12 gap-y-20 justify-self-center md:max-w-5xl md:grid-cols-2">
        <div className="grid w-full max-w-md auto-rows-min justify-items-center md:max-w-none">
          <h2
            id="detailsHeader"
            className="mb-6 w-fit justify-self-center border-b px-1 text-lg font-semibold md:text-xl"
          >
            Details
          </h2>
          <ul
            aria-labelledby="detailsHeader"
            className="grid w-full max-w-full gap-2 rounded-md bg-light-secondary p-4 dark:bg-dark-secondary"
          >
            <ULItem label="Position" body={position} />
            <ULItem label="Company" body={company} />
            <ULItem
              label="Posting URL"
              body={postingURL ?? "None"}
              isLink={postingURL ? true : false}
            />
            <ULItem label="Status" body={readableStatus(status)} />
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
        <div className="grid w-full max-w-md auto-rows-min justify-items-center md:max-w-none">
          <h2
            id="contactsHeader"
            className="mb-6 w-fit justify-self-center border-b px-1 text-lg font-semibold md:text-xl"
          >
            Contacts
          </h2>
          {contacts && contacts.length > 0 ? (
            <ul
              aria-labelledby="contactsHeader"
              className="content-scrollbar grid w-full gap-4 overflow-y-auto md:max-h-[30rem] md:px-1"
            >
              {contacts.map((contact, index) => {
                const { name, position, phone, email } = contact;
                return (
                  <ul
                    key={index}
                    className="grid max-w-full gap-2 rounded-md bg-light-secondary p-4 dark:bg-dark-secondary"
                  >
                    <ULItem label="Name" body={name} />
                    {position && <ULItem label="Position" body={position} />}
                    {phone && <ULItem label="Phone" body={phone} />}
                    {email && <ULItem label="Email" body={email} />}
                  </ul>
                );
              })}
            </ul>
          ) : (
            <span
              aria-labelledby="contactsHeader"
              className="justify-self-center"
            >
              No contacts...
            </span>
          )}
        </div>
        <div className="grid w-full max-w-md auto-rows-min justify-items-center md:col-span-full md:max-w-none">
          <h2
            id="notesHeader"
            className="mb-6 w-fit justify-self-center border-b px-1 text-lg font-semibold md:text-xl"
          >
            Notes
          </h2>
          {notes && notes.length > 0 ? (
            <ul
              aria-labelledby="notesHeader"
              className="grid w-full gap-4 md:flex md:flex-wrap md:justify-center"
            >
              {notes.map((note, index) => {
                const { title, body } = note;
                return (
                  <li
                    key={index}
                    className="main-scrollbar grid h-64 w-full max-w-full auto-rows-min gap-1 divide-y divide-light-text divide-opacity-30 overflow-y-auto rounded-md bg-light-secondary p-4 dark:divide-dark-text dark:bg-dark-secondary md:max-w-xs"
                  >
                    <p className="overflow-x-auto break-words">{title}</p>
                    <p className="overflow-x-auto break-words pt-1">{body}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span aria-labelledby="notesHeader" className="justify-self-center">
              No notes...
            </span>
          )}
        </div>
      </div>
    </>
  );
}
