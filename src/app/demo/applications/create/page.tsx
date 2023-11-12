"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  applicationStatusSelectOptions,
  applicationStatusesArray,
  formSchema,
} from "@/src/utils/customVariables";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import ContactFields from "@/src/components/Form/ContactFields";
import NoteFields from "@/src/components/Form/NoteFields";
import { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import InternalLink from "@/src/components/Links/InternalLink";
import dayjs from "dayjs";
import useStorageUsage from "@/src/components/Hooks/useStorageUsage";
import toast from "react-hot-toast";
import getNewMockApplicationId from "@/src/components/Demo/getNewDemoApplicationId";
import createDemoApplication from "@/src/components/Demo/createDemoApplication";
import Modal from "@/src/components/Modal";

export default function Create() {
  const {
    formState: { errors },
    handleSubmit,
    getValues,
    register,
    control,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: applicationStatusSelectOptions[0] },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [applicationId, setApplicationId] = useState<number>();

  const currentPosition = watch("position");
  const currentCompany = watch("company");

  const currentStatus = watch("status");

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

    const newId = getNewMockApplicationId();

    createDemoApplication({
      id: newId,
      dateCreated: dayjs().toISOString(),
      dateModified: dayjs().toISOString(),
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

    setApplicationId(newId);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (!currentStatus) return;
    const statusIndex = applicationStatusesArray.indexOf(currentStatus.value);
    setCurrentStatusIndex(statusIndex);
  }, [currentStatus]);

  return (
    <>
      <Modal
        title="Application created"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <p>Would you like to view this application or go home?</p>
        <div className="mt-4 flex justify-center gap-4">
          <InternalLink
            href={`/demo/applications/${currentPosition}-at-${currentCompany}?id=${applicationId}`}
            style="buttonShaded"
          >
            View
          </InternalLink>
          <InternalLink href="/demo" style="buttonShaded">
            Home
          </InternalLink>
        </div>
      </Modal>
      <div className="mb-8 grid justify-items-center gap-2 justify-self-center">
        <h1 className="text-center text-3xl font-semibold">
          Create Your Application
        </h1>
        <span>* indicates a required field</span>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid justify-items-center gap-4 md:grid-cols-2"
      >
        <div className="col-span-full flex h-fit w-full max-w-md flex-col p-4 md:min-h-formSection">
          <h2 className="mb-6 self-center border-b px-1 text-lg font-semibold">
            Details
          </h2>
          <div className="grid gap-2">
            <FormInput
              id="positionInput"
              registerName="position"
              label="Position"
              error={errors.position?.message}
              register={register}
              className="col-span-full"
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
        <ContactFields
          register={register}
          control={control}
          className="grid h-fit w-full max-w-md auto-rows-min p-4 md:min-h-formSection"
        />
        <NoteFields
          register={register}
          control={control}
          className="grid h-fit w-full max-w-md auto-rows-min p-4 md:min-h-formSection"
        />
        <Button type="submit" className="col-span-full mt-12">
          Submit
        </Button>
      </form>
    </>
  );
}
