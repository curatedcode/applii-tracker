"use client";

import Button from "@/src/components/Button";
import ContactsFields from "@/src/components/Form/ContactFields";
import CustomFields from "@/src/components/Form/CustomFields";
import FormCardColorInput from "@/src/components/Form/FormCardColorInput";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import NoteFields from "@/src/components/Form/NoteFields";
import useStorageUsage from "@/src/components/Hooks/useStorageUsage";
import EditApplicationSkeleton from "@/src/components/Loading/EditApplicationSkeleton";
import Modal from "@/src/components/Modals/Modal";
import { zApplication, zWageType } from "@/src/types/db";
import db from "@/src/utils/db";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
	} = useForm<zApplication["INSERT"]>({
		resolver: zodResolver(zApplication.INSERT),
		defaultValues: {
			dateCreated: "",
			dateModified: "",
			wage: {
				payType: "- Select- ",
			},
			jobType: "- Select- ",
			submission: "- Select- ",
			location: "- Select- ",
		},
	});

	/**
	 * @todo change app slug page to show delete button after u click edit and go to that page
	 */

	const [isDataFetched, setIsDataFetched] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

	const currentPosition = watch("position");
	const currentStatus = watch("status");
	const currentCompanyName = watch("company.name");
	const currentWagePayType = watch("wage.payType");
	const currentCardColor = watch("cardColor");

	const { usagePercent } = useStorageUsage();

	async function submit() {
		const { dateApplied, dateInterviewing, dateOffered, dateClosed, ...rest } =
			getValues();

		function formatDate(date: string | undefined) {
			if (!date) return;
			return dayjs(date).toISOString();
		}

		await db.application.put({
			data: {
				...rest,
				id,
				dateModified: dayjs().toISOString(),
				dateApplied: formatDate(dateApplied),
				dateInterviewing: formatDate(dateInterviewing),
				dateOffered: formatDate(dateOffered),
				dateClosed: formatDate(dateClosed),
			},
		});

		if (usagePercent && usagePercent >= 80) {
			toast.error("Storage almost full");
		}

		setIsModalOpen(true);
	}

	useEffect(() => {
		if (!window) return;
		db.application.get({ id }).then((data) => {
			setValue("position", data.position);
			setValue("company", data.company);
			setValue(
				"status",
				zApplication.GET.shape.status.options.find(
					(option) => option === data.status,
				) as zApplication["GET"]["status"],
			);
			setValue("contacts", data.contacts);
			setValue("notes", data.notes);
			setValue("dateApplied", dayjs(data.dateApplied).format("YYYY-MM-DD"));
			setValue(
				"dateInterviewing",
				dayjs(data.dateInterviewing).format("YYYY-MM-DD"),
			);
			setValue("dateOffered", dayjs(data.dateOffered).format("YYYY-MM-DD"));
			setValue("dateClosed", dayjs(data.dateClosed).format("YYYY-MM-DD"));
			setValue("cardColor", data.cardColor);

			if (data.wage) {
				setValue("wage.payType", data.wage.payType);

				switch (data.wage.payType) {
					case "Hourly":
						setValue("wage.rate", data.wage.rate);
						break;
					case "Salary":
						setValue("wage.rate", data.wage.annualSalary);
						break;
					case "Contract":
						setValue("wage.totalAmount", data.wage.totalAmount);
						setValue("wage.duration", data.wage.duration);
				}
			}

			setValue("jobType", data.jobType);
			setValue("submission", data.submission);
			setValue("location", data.location);
			setValue("customFields", data.customFields);

			setIsDataFetched(true);
		});
	}, [id, setValue]);

	useEffect(() => {
		if (!currentStatus) return;
		const statusIndex =
			zApplication.GET.shape.status.options.indexOf(currentStatus);
		setCurrentStatusIndex(statusIndex);
	}, [currentStatus]);

	if (!id || Number.isNaN(id)) return router.push("/not-found");
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
				description="Would you like to view this application or go home?"
				secondaryButton={{
					as: "link",
					href: `/boards/applications/${currentPosition}-at-${currentCompanyName}?id=${id}`,
					body: "View",
				}}
				primaryButton={{
					as: "link",
					href: "/boards",
					body: "Home",
				}}
			/>
			<h1 className="mb-8 text-center text-3xl font-semibold">
				Edit your application
			</h1>
			<form
				onSubmit={handleSubmit(submit)}
				className="grid justify-items-center gap-x-12 gap-y-8 md:grid-cols-2"
			>
				<div className="flex w-full flex-col">
					<h2 className="mb-6 self-center border-b px-1 text-lg font-semibold">
						Details
					</h2>
					<div className="grid gap-3">
						<FormInput
							id="positionInput"
							label="Position"
							error={errors.position?.message}
							isRequired
							{...register("position")}
						/>
						<FormInput
							id="companyInput"
							label="Company"
							error={errors.company?.message}
							isRequired
							{...register("company.name")}
						/>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<FormSelectInput
									{...field}
									label="Status"
									value={currentStatus}
									options={zApplication.GET.shape.status.options}
								/>
							)}
						/>
						<FormInput
							id="dateAppliedInput"
							label="Date Applied"
							type="date"
							error={errors.dateApplied?.message}
							className={currentStatusIndex >= 1 ? "" : "hidden"}
							{...register("dateApplied")}
						/>
						<FormInput
							id="dateInterviewedInput"
							label="Date Interviewing"
							type="date"
							error={errors.dateInterviewing?.message}
							className={currentStatusIndex >= 2 ? "" : "hidden"}
							{...register("dateInterviewing")}
						/>
						<FormInput
							id="dateOfferedInput"
							label="Date Offered"
							type="date"
							error={errors.dateOffered?.message}
							className={currentStatusIndex >= 3 ? "" : "hidden"}
							{...register("dateOffered")}
						/>
						<FormInput
							id="dateClosedInput"
							label="Date Closed"
							type="date"
							error={errors.dateClosed?.message}
							className={currentStatusIndex >= 4 ? "" : "hidden"}
							{...register("dateClosed")}
						/>
						<Controller
							name="wage.payType"
							control={control}
							render={({ field }) => (
								<FormSelectInput
									{...field}
									label="Pay type"
									options={zWageType.options}
								/>
							)}
						/>
						{currentWagePayType === "Hourly" && (
							<FormInput
								id="wageHourlyRate"
								label="Rate"
								type="number"
								{...register("wage.rate")}
							/>
						)}
						{currentWagePayType === "Salary" && (
							<FormInput
								id="wageSalaryAnnualSalary"
								label="Annual salary"
								type="number"
								{...register("wage.annualSalary")}
							/>
						)}
						{currentWagePayType === "Contract" && (
							<>
								<FormInput
									id="wageContractTotalAmount"
									label="Total amount"
									type="number"
									{...register("wage.totalAmount")}
								/>
								<FormInput
									id="wageContractDuration"
									label="Duration"
									{...register("wage.duration")}
								/>
							</>
						)}
						<Controller
							name="jobType"
							control={control}
							render={({ field }) => (
								<FormSelectInput
									{...field}
									label="Job type"
									options={zApplication.GET.shape.jobType.options}
								/>
							)}
						/>
						<Controller
							name="submission"
							control={control}
							render={({ field }) => (
								<FormSelectInput
									{...field}
									label="Submission"
									options={zApplication.GET.shape.submission.options}
								/>
							)}
						/>
						<Controller
							name="location"
							control={control}
							render={({ field }) => (
								<FormSelectInput
									{...field}
									label="Location"
									options={zApplication.GET.shape.location.options}
								/>
							)}
						/>
						<CustomFields register={register} control={control} />
						<Controller
							name="cardColor"
							control={control}
							render={({ field: { onChange } }) => (
								<FormCardColorInput
									id="cardColorInput"
									label="Card Color"
									company={currentCompanyName}
									position={currentPosition}
									color={currentCardColor}
									setColor={onChange}
								/>
							)}
						/>
					</div>
				</div>
				<ContactsFields register={register} control={control} />
				<NoteFields register={register} control={control} />
				<div className="col-span-full mt-12 flex flex-row gap-6">
					<Button onClick={() => router.push("/boards")}>Cancel</Button>
					<Button type="submit" style="inverse">
						Submit
					</Button>
				</div>
			</form>
		</>
	);
}
