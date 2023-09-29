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
import { useMainContext } from "../components/MainContextProvider";

export default function BoardSectionCard({
  id,
  position,
  company,
  dateModified,
  postingURL,
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
    <div
      className="group h-20 rounded-md bg-site-main px-2 py-1"
      data-testid="board-section-card"
    >
      <div
        role="dialog"
        aria-labelledby="deletePostingTitle"
        aria-describedby="deletePostingDesc"
        className={showDeletePopup ? "grid text-sm" : "hidden"}
      >
        <h2 id="deletePostingTitle">Are you sure?</h2>
        <p id="dialog1Desc">This action is permanent</p>
        <div className="flex items-center justify-end">
          <Button onClick={() => deletePosting()}>Delete</Button>
          <Button style="transparent" onClick={() => toggleDeletePopup(false)}>
            Cancel
          </Button>
        </div>
      </div>
      <div
        className={
          showDeletePopup
            ? "hidden"
            : "relative flex h-full flex-col justify-between"
        }
      >
        <div className="grid text-sm font-medium">
          <span className="line-clamp-2">{position}</span>
          <span className="line-clamp-1">{company}</span>
        </div>
        <div className="absolute bottom-0.5 left-0 flex w-full items-center gap-1 opacity-0 transition-all duration-75 group-hover:opacity-100">
          <span className="mr-auto text-xs" title={date.title}>
            {date.time}
          </span>
          <button
            onClick={() => {
              setApplicationId(id), setFormIsOpen(true);
            }}
            className="rounded-md border border-site-main p-0.5 hover:border-site-main/50"
            title="Edit"
          >
            <PencilSquareIcon className="w-4" aria-hidden />
          </button>
          <button
            onClick={() => toggleDeletePopup(true)}
            className="rounded-md border border-site-main p-0.5 hover:border-site-main/50"
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
              className="rounded-md border border-site-main p-0.5 hover:border-site-main/50"
            >
              <LinkIcon className="w-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
