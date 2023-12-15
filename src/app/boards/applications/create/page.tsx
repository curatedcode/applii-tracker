"use client";

import Button from "@/src/components/Button";
import ContactFields from "@/src/components/Form/ContactFields";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import NoteFields from "@/src/components/Form/NoteFields";
import useStorageUsage from "@/src/components/Hooks/useStorageUsage";
import InternalLink from "@/src/components/Links/InternalLink";
import Modal from "@/src/components/Modal";
import {
  ApplicationStatusLabelValueType,
  applicationStatusSelectOptions,
  applicationStatuses,
  applicationStatusesArray,
  formSchema,
} from "@/src/types/applications";
import { createApplication } from "@/src/utils/db";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Create() {
  const searchParams = useSearchParams();

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    register,
    control,
    watch,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

    const result = await createApplication({
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

    setApplicationId(result.id);
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (!currentStatus) return;
    const statusIndex = applicationStatusesArray.indexOf(currentStatus.value);
    setCurrentStatusIndex(statusIndex);
  }, [currentStatus]);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const parsedStatus = applicationStatuses.safeParse(statusParam);

    if (!parsedStatus.success) return;
    const statusOption = applicationStatusSelectOptions.find(
      (val) => val.value === parsedStatus.data,
    ) as ApplicationStatusLabelValueType;
    setValue("status", statusOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        title="Application created"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <p className="text-base">
          Would you like to view this application or go home?
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <InternalLink
            href={`/boards/applications/${currentPosition}-at-${currentCompany}?id=${applicationId}`}
          >
            View
          </InternalLink>
          <InternalLink href="/boards" style="inverse">
            Home
          </InternalLink>
        </div>
      </Modal>
      <h1 className="mb-8 text-center text-3xl font-semibold">
        Create your application
      </h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid justify-items-center gap-x-12 gap-y-8 md:grid-cols-2"
      >
        <div className="flex w-full flex-col">
          <h2 className="mb-6 self-center border-b px-1 text-lg font-semibold">
            Details
          </h2>
          <div className="grid gap-2 md:gap-3">
            <FormInput
              id="positionInput"
              registerName="position"
              label="Position"
              error={errors.position?.message}
              register={register}
              isRequired
            />
            <FormInput
              id="companyInput"
              registerName="company"
              label="Company"
              error={errors.company?.message}
              register={register}
              isRequired
            />
            <FormInput
              id="postingURLInput"
              registerName="postingURL"
              label="Posting URL"
              error={errors.postingURL?.message}
              register={register}
            />
            <Controller
              name="status"
              control={control}
              render={({ field: { onChange } }) => (
                <FormSelectInput
                  label="Status"
                  selected={currentStatus ?? applicationStatusSelectOptions[0]}
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
        <ContactFields register={register} control={control} />
        <NoteFields register={register} control={control} />
        <Button style="inverse" type="submit" className="col-span-full mt-12">
          Submit
        </Button>
      </form>
    </>
  );
}
