"use client";

import Button from "@/src/components/Button";
import ContactsFields from "@/src/components/Form/ContactFields";
import FormInput from "@/src/components/Form/FormInput";
import NoteFields from "@/src/components/Form/NoteFields";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import InternalLink from "@/src/components/Links/InternalLink";
import EditApplicationSkeleton from "@/src/components/Loading/EditApplicationSkeleton";
import {
  applicationStatusSelectOptions,
  applicationStatusesArray,
  formSchema,
} from "@/src/utils/customVariables";
import { getApplication, updateApplication } from "@/src/utils/db";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import useStorageUsage from "@/src/components/Hooks/useStorageUsage";
import toast from "react-hot-toast";
import Modal from "@/src/components/Modal";

export default function FormEdit() {
  const id = Number(useSearchParams().get("id"));
  const router = useRouter();

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

  const [isDataFetched, setIsDataFetched] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const currentStatus = watch("status");
  const currentPosition = watch("position");
  const currentCompany = watch("company");

  const { usagePercent } = useStorageUsage();

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

    if (usagePercent && usagePercent >= 80) {
      toast.error("Storage almost full");
    }

    setIsModalOpen(true);
  }

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

  useEffect(() => {
    if (!currentStatus) return;
    const statusIndex = applicationStatusesArray.indexOf(currentStatus.value);
    setCurrentStatusIndex(statusIndex);
  }, [currentStatus]);

  if (!id || isNaN(id)) return router.push("/not-found");
  if (!isDataFetched) return <EditApplicationSkeleton />;

  return (
    <>
      <div id="loadingEdit" aria-live="polite" className="sr-only">
        <p>Loaded application.</p>
      </div>
      <Modal
        title="Application updated"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <p>Would you like to view this application or go home?</p>
        <div className="mt-4 flex justify-center gap-4">
          <InternalLink
            href={`/applications/${currentPosition}-at-${currentCompany}?id=${id}`}
            style="buttonShaded"
          >
            View
          </InternalLink>
          <InternalLink href="/" style="buttonShaded">
            Home
          </InternalLink>
        </div>
      </Modal>
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
              render={({ field: { onChange } }) => (
                <FormSelectInput
                  label="Status"
                  selected={
                    applicationStatusSelectOptions.find(
                      (val) => val.value === currentStatus.value,
                    ) ?? applicationStatusSelectOptions[0]
                  }
                  setSelected={onChange}
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
