import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createApplication, getApplication, updateApplication } from "../db";
import Button from "./Button";
import { applicationStatuses } from "../customVariables";
import dayjs from "dayjs";
import { useMainContext } from "../app/layout";

const schema = z.object({
  position: z.string().min(1, { message: "Position can't be empty" }),
  company: z.string().min(1, { message: "Company can't be empty" }),
  postingURL: z.string(),
  status: applicationStatuses,
  datePicker: z.string(),
});

export default function Form() {
  const { formIsOpen, setFormIsOpen, applicationId, setApplicationId } =
    useMainContext();

  const {
    formState: { errors: errors },
    handleSubmit,
    getValues,
    register,
    reset,
    watch,
    setValue,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function submitForm() {
    const dateNow = new Date().toISOString();
    const { status, datePicker, ...rest } = getValues();
    const datePicked = dayjs(datePicker).toISOString();

    const formValues = {
      ...rest,
      status,
      dateCreated: dateNow,
      dateModified: dateNow,
      dateApplied: status === "applied" ? datePicked : undefined,
      dateInterviewed: status === "interviewing" ? datePicked : undefined,
      dateClosed: status === "closed" ? datePicked : undefined,
      dateOffered: status === "offer" ? datePicked : undefined,
    };

    if (applicationId) {
      console.log("update");
      await updateApplication({ id: applicationId, ...formValues });
      reset();
    } else {
      await createApplication(formValues);
    }

    setFormIsOpen(false);
  }

  function cancelForm() {
    if (applicationId) {
      setApplicationId(undefined);
    }
    reset();
    setFormIsOpen(false);
  }

  useEffect(() => {
    const firstElement = document.getElementById(
      "position"
    ) as HTMLInputElement | null;
    const lastElement = document.getElementById(
      "cancelBtn"
    ) as HTMLButtonElement | null;

    if (!firstElement || !lastElement) return;

    lastElement?.addEventListener("blur", handleBlur);
    function handleBlur() {
      firstElement?.focus();
    }

    return () => lastElement?.removeEventListener("blur", handleBlur);
  }, []);

  useEffect(() => {
    if (!applicationId) {
      reset();
      return;
    }

    getApplication({ id: applicationId }).then((data) => {
      let date = "";

      switch (data.status) {
        case "needToApply":
          break;
        case "applied":
          date = data.dateApplied as string;
          break;
        case "interviewing":
          date = data.dateInterviewed as string;
          break;
        case "offer":
          date = data.dateOffered as string;
          break;
        case "closed":
          date = data.dateClosed as string;
          break;
      }
      setValue("position", data.position);
      setValue("company", data.company);
      setValue("postingURL", data.postingURL ?? "");
      setValue("status", data.status);
      setValue("datePicker", dayjs(date).format("YYYY-MM-DD"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  return (
    <div
      className={
        formIsOpen
          ? "opacity-100 z-10 w-screen h-screen bg-black/80 backdrop-blur-sm fixed"
          : "hidden"
      }
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        className="grid gap-4 w-full max-w-sm relative left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3"
      >
        <div className="grid gap-1">
          <div className="flex gap-1 items-center">
            <label htmlFor="position" className="w-36">
              Position
            </label>
            <input
              id="position"
              className={`duration-50 rounded-md border-2 bg-neutral-100 px-3 py-1 transition-colors focus-within:border-neutral-400 focus-within:outline-none text-site-main ${
                errors.position?.message
                  ? "border-red-500 focus-within:border-red-500"
                  : ""
              }`}
              {...register("position")}
            />
          </div>
          <span
            className={
              errors.position?.message
                ? "text-red-500 text-sm font-semibold"
                : "hidden"
            }
          >
            {errors.position?.message}
          </span>
        </div>
        <div className="grid gap-1">
          <div className="flex gap-1 items-center">
            <label htmlFor="company" className="w-36">
              Company
            </label>
            <input
              id="company"
              className={`duration-50 rounded-md border-2 bg-neutral-100 px-3 py-1 transition-colors focus-within:border-neutral-400 focus-within:outline-none text-site-main ${
                errors.company?.message
                  ? "border-red-500 focus-within:border-red-500"
                  : ""
              }`}
              {...register("company")}
            />
          </div>
          <span
            className={
              errors.company?.message
                ? "text-red-500 text-sm font-semibold"
                : "hidden"
            }
          >
            {errors.company?.message}
          </span>
        </div>
        <div className="grid gap-1">
          <div className="flex gap-1 items-center">
            <label htmlFor="postingURL" className="w-36">
              Posting URL
            </label>
            <input
              id="postingURL"
              className={`duration-50 rounded-md border-2 bg-neutral-100 px-3 py-1 transition-colors focus-within:border-neutral-400 focus-within:outline-none text-site-main ${
                errors.postingURL?.message
                  ? "border-red-500 focus-within:border-red-500"
                  : ""
              }`}
              {...register("postingURL")}
            />
          </div>
          <span
            className={
              errors.postingURL?.message
                ? "text-red-500 text-sm font-semibold"
                : "hidden"
            }
          >
            {errors.postingURL?.message}
          </span>
        </div>
        <div className="grid gap-1">
          <div className="flex gap-1 items-center">
            <label htmlFor="status" className="w-36">
              Status
            </label>
            <select
              id="status"
              className={`duration-50 rounded-md border-2 bg-neutral-100 px-3 py-1 transition-colors focus-within:border-neutral-400 focus-within:outline-none text-site-main ${
                errors.status?.message
                  ? "border-red-500 focus-within:border-red-500"
                  : ""
              }`}
              {...register("status")}
            >
              <option value="needToApply">Need To Apply</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <span
            className={
              errors.status?.message
                ? "text-red-500 text-sm font-semibold"
                : "hidden"
            }
          >
            {errors.status?.message}
          </span>
        </div>
        <div
          className={
            watch("status") === "needToApply" ? "hidden" : "grid gap-1"
          }
        >
          <div className="flex gap-1 items-center">
            <label htmlFor="datePicker" className="w-36">
              {watch("status") === "applied" && "Date Applied"}
              {watch("status") === "interviewing" && "Date Interviewing"}
              {watch("status") === "offer" && "Date Offered"}
              {watch("status") === "closed" && "Date Closed"}
            </label>
            <input
              id="datePicker"
              type="date"
              className={`duration-50 rounded-md border-2 bg-neutral-100 px-3 py-1 transition-colors focus-within:border-neutral-400 focus-within:outline-none text-site-main ${
                errors.datePicker?.message
                  ? "border-red-500 focus-within:border-red-500"
                  : ""
              }`}
              {...register("datePicker")}
            />
          </div>
          <span
            className={
              errors.datePicker?.message
                ? "text-red-500 text-sm font-semibold"
                : "hidden"
            }
          >
            {errors.datePicker?.message}
          </span>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Done</Button>
          <Button
            id="cancelBtn"
            type="button"
            onClick={() => cancelForm()}
            style="transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
