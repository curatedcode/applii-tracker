/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { zodTutorialStatus } from "../../utils/customVariables";
import Button from "../Button";
import InternalLink from "../Links/InternalLink";
import Modal from "../Modal";

export default function InitialDemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function exitTutorial() {
    window.localStorage.setItem(
      "tutorialStatus",
      zodTutorialStatus.Enum.completed,
    );
    closeModal();
  }

  useEffect(() => {
    setIsMounted(true);
    const tutorialStatus = window.localStorage.getItem("tutorialStatus");

    if (!tutorialStatus) {
      window.localStorage.setItem(
        "tutorialStatus",
        zodTutorialStatus.Enum.notStarted,
      );
      setIsOpen(true);
      return;
    }

    const tutorialStatusParsed = zodTutorialStatus.parse(tutorialStatus);
    setIsOpen(tutorialStatusParsed === "notStarted");
  }, []);

  useEffect(() => {
    if (!isMounted || !isOpen) return;

    document.body.style.overflow = "hidden";
  }, [isMounted, isOpen]);

  return (
    <Modal title="Welcome to Applii!" isOpen={isOpen} setIsOpen={setIsOpen}>
      <img
        alt="Confetti exploding from canister"
        width="200"
        height="200"
        src="/media/confetti.gif"
        className="-my-5 justify-self-center"
      />
      <p>Would you like to view the demo page?</p>
      <div className="mt-4 flex justify-center gap-4">
        <Button onClick={() => exitTutorial()} style="shaded">
          No
        </Button>
        <InternalLink
          onClick={() => exitTutorial()}
          href="/demo"
          style="buttonShaded"
        >
          Yes
        </InternalLink>
      </div>
    </Modal>
  );
}
