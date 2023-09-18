"use client";

import {
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import formatDate from "./formatDate";
import { useState } from "react";
import { deleteApplication } from "../db";
import Button from "./Button";
import { CardApplicationType } from "../customVariables";
import { useMainContext } from "../app/layout";

export default function BoardSectionCard({
  id,
  position,
  company,
  dateModified,
  postingURL,
  status,
}: CardApplicationType) {
  const { setFormIsOpen, setApplicationId, fetchApplications } =
    useMainContext();

  const date = formatDate(dateModified);

  const [showDeletePopup, toggleDeletePopup] = useState(false);

  async function deletePosting() {
    setApplicationId(undefined);
    await deleteApplication({ id });
    toggleDeletePopup(false);
    fetchApplications();
  }

  return (
    <>
      <div className="group bg-site-main rounded-md px-2 py-1 h-[4.5rem]">
        <div
          role="dialog"
          aria-labelledby="deletePostingTitle"
          aria-describedby="deletePostingDesc"
          className={showDeletePopup ? "text-sm grid" : "hidden"}
        >
          <h2 id="deletePostingTitle">Are you sure?</h2>
          <p id="dialog1Desc">This action is permanent</p>
          <div className="flex items-center justify-end">
            <Button onClick={() => deletePosting()}>Delete</Button>
            <Button
              style="transparent"
              onClick={() => toggleDeletePopup(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div
          className={
            showDeletePopup
              ? "hidden"
              : "relative flex flex-col h-full justify-between"
          }
        >
          <div className="grid font-medium text-sm">
            <span className="line-clamp-2">{position}</span>
            <span className="line-clamp-1">{company}</span>
          </div>
          <div className="group-hover:opacity-100 items-center w-full absolute left-0 opacity-0 bottom-0.5 flex gap-1 transition-all duration-75">
            <span className="mr-auto text-xs" title={date.title}>
              {date.time}
            </span>
            <button
              onClick={() => {
                setApplicationId(id), setFormIsOpen(true);
              }}
              className="border border-site-main hover:border-site-main/50 p-0.5 rounded-md"
              title="Edit"
            >
              <PencilSquareIcon className="w-4" aria-hidden />
            </button>
            <button
              onClick={() => toggleDeletePopup(true)}
              className="border border-site-main hover:border-site-main/50 p-0.5 rounded-md"
              title="Delete"
            >
              <TrashIcon className="w-4" aria-hidden />
            </button>
            {postingURL && (
              <a
                rel="nofollow noreferrer"
                target="_blank"
                href={postingURL}
                title={`View posting for ${position} at ${company}`}
                className="border border-site-main hover:border-site-main/50 p-0.5 rounded-md"
              >
                <LinkIcon className="w-4" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
