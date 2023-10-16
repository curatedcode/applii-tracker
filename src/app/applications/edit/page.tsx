"use client";

import AlertDialog from "@/src/components/AlertDialog";
import Button from "@/src/components/Button";
import ContactsFields from "@/src/components/Form/ContactFields";
import FormInput from "@/src/components/Form/FormInput";
import NoteFields from "@/src/components/Form/NoteFields";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import useExitPageConfirm from "@/src/components/Hooks/useExitPageConfirm";
import InternalLink from "@/src/components/Links/InternalLink";
import EditApplicationSkeleton from "@/src/components/Loading/EditApplicationSkeleton";
import {
  FormEditPageProps,
  applicationStatusSelectOptions,
  applicationStatusesArray,
  formSchema,
} from "@/src/customVariables";
import { getApplication, updateApplication } from "@/src/db";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function FormEdit({ searchParams }: FormEditPageProps) {
  const id = Number(useSearchParams().get("id"));
  const router = useRouter();

  const [isDataFetched, setIsDataFetched] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    register,
    control,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const currentStatus = watch("status");
  const currentPosition = watch("position");
  const currentCompany = watch("company");

  async function submit() {
    const {
      dateApplied,
      dateInterviewing,
      dateOffered,
      dateClosed,
      status,
      ...rest
    } = getValues();

    function formatDate(date: string | undefined) {
      if (!date) return;
      return dayjs(date).toISOString();
    }

    await updateApplication({
      id,
      dateApplied: formatDate(dateApplied),
      dateInterviewing: formatDate(dateInterviewing),
      dateOffered: formatDate(dateOffered),
      dateClosed: formatDate(dateClosed),
      status: status.value,
      ...rest,
    });

    setIsFormCompleted(true);
  }

  useEffect(() => {
    if (!currentStatus) return;
    const statusIndex = applicationStatusesArray.indexOf(currentStatus.value);
    setCurrentStatusIndex(statusIndex);
  }, [currentStatus]);

  useExitPageConfirm(isFormCompleted);

  useEffect(() => {
    if (!window) return;
    getApplication({ id }).then((data) => {
      const {
        position,
        company,
        status,
        postingURL,
        contacts,
        notes,
        dateApplied,
        dateInterviewing,
        dateOffered,
        dateClosed,
      } = data;

      setValue("position", position);
      setValue("company", company);
      setValue(
        "status",
        applicationStatusSelectOptions.find(
          (option) => option.value === status,
        ) ?? { label: "Need To Apply", value: "needToApply" },
      );
      setValue("postingURL", postingURL);
      setValue("contacts", contacts);
      setValue("notes", notes);
      setValue("dateApplied", dayjs(dateApplied).format("YYYY-MM-DD"));
      setValue(
        "dateInterviewing",
        dayjs(dateInterviewing).format("YYYY-MM-DD"),
      );
      setValue("dateOffered", dayjs(dateOffered).format("YYYY-MM-DD"));
      setValue("dateClosed", dayjs(dateClosed).format("YYYY-MM-DD"));

      setIsDataFetched(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id || isNaN(id)) return router.push("/not-found");
  if (!isDataFetched) return <EditApplicationSkeleton />;

  return (
    <>
      <div id="loadingEdit" aria-live="polite" className="sr-only">
        <p>Loaded application.</p>
      </div>
      <AlertDialog
        label="Application updated"
        description="Would you like to view this application or go home?"
        open={isFormCompleted}
      >
        <div className="mt-4 flex justify-center gap-4">
          <InternalLink
            href={`/applications/${currentPosition}-at-${currentCompany}?id=${id}`}
            className="!dark:bg-dark-main !bg-light-main text-light-text"
          >
            View
          </InternalLink>
          <InternalLink
            href="/"
            className="!dark:bg-dark-main !bg-light-main text-light-text"
          >
            Home
          </InternalLink>
        </div>
      </AlertDialog>
      <div className="mb-8 grid justify-items-center gap-2 justify-self-center">
        <h1 className="text-3xl font-semibold">Edit Your Application</h1>
        <span>* indicates a required field</span>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid justify-items-center gap-4 md:grid-cols-2"
      >
        <div className="col-span-full flex h-fit w-full max-w-md flex-col p-4 md:min-h-formSection">
          <h2 className="mb-6 self-center border-b-2 px-1 text-lg font-semibold">
            Details
          </h2>
          <div className="grid gap-2">
            <FormInput
              id="positionInput"
              registerName="position"
              label="Position"
              error={errors.position?.message}
              register={register}
              hiddenLabel
              placeholder="Position"
              isRequired
            />
            <FormInput
              id="companyInput"
              registerName="company"
              label="Company"
              error={errors.company?.message}
              register={register}
              hiddenLabel
              placeholder="Company"
              isRequired
            />
            <FormInput
              id="postingURLInput"
              registerName="postingURL"
              label="Posting URL"
              error={errors.postingURL?.message}
              register={register}
              hiddenLabel
              placeholder="Posting URL"
            />
            <Controller
              name="status"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelectInput
                  label="Status"
                  value={value}
                  onChange={onChange}
                  options={applicationStatusSelectOptions}
                />
              )}
            />
            <FormInput
              id="dateAppliedInput"
              label="Date Applied"
              registerName="dateApplied"
              type="date"
              error={errors.dateApplied?.message}
              register={register}
              className={currentStatusIndex >= 1 ? "" : "hidden"}
            />
            <FormInput
              id="dateInterviewedInput"
              label="Date Interviewing"
              registerName="dateInterviewing"
              type="date"
              error={errors.dateInterviewing?.message}
              register={register}
              className={currentStatusIndex >= 2 ? "" : "hidden"}
            />
            <FormInput
              id="dateOfferedInput"
              label="Date Offered"
              registerName="dateOffered"
              type="date"
              error={errors.dateOffered?.message}
              register={register}
              className={currentStatusIndex >= 3 ? "" : "hidden"}
            />
            <FormInput
              id="dateClosedInput"
              label="Date Closed"
              registerName="dateClosed"
              type="date"
              error={errors.dateClosed?.message}
              register={register}
              className={currentStatusIndex >= 4 ? "" : "hidden"}
            />
          </div>
        </div>
        <ContactsFields
          register={register}
          control={control}
          className="grid h-fit w-full max-w-md auto-rows-min p-4 md:min-h-formSection"
        />
        <NoteFields
          register={register}
          control={control}
          className="grid h-fit w-full max-w-md auto-rows-min p-4 md:min-h-formSection"
        />
        <div className="col-span-full mt-12 flex flex-row gap-6">
          <Button onClick={() => router.push("/")}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
}
