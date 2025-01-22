"use client";

import Button from "@/src/components/Button";
import createDemoApplication from "@/src/components/Demo/createDemoApplication";
import getNewDemoApplicationId from "@/src/components/Demo/getNewDemoApplicationId";
import getRandomHexColor from "@/src/components/Fn/getRandomHexColor";
import ContactFields from "@/src/components/Form/ContactFields";
import CustomFields from "@/src/components/Form/CustomFields";
import FormCardColorInput from "@/src/components/Form/FormCardColorInput";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import NoteFields from "@/src/components/Form/NoteFields";
import useStorageUsage from "@/src/components/Hooks/useStorageUsage";
import Modal from "@/src/components/Modals/Modal";
import { zApplication, zWageType } from "@/src/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
	} = useForm<zApplication["INSERT"]>({
		resolver: zodResolver(zApplication.INSERT),
		defaultValues: {
			company: {
				name: "Awesome Company!",
			},
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

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
	const [applicationId, setApplicationId] = useState<number>();

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

		const newId = getNewDemoApplicationId();

		createDemoApplication(
			{
				...rest,
				dateCreated: dayjs().toISOString(),
				dateModified: dayjs().toISOString(),
				dateApplied: formatDate(dateApplied),
				dateInterviewing: formatDate(dateInterviewing),
				dateOffered: formatDate(dateOffered),
				dateClosed: formatDate(dateClosed),
			},
			newId,
		);

		if (usagePercent && usagePercent >= 80) {
			toast.error("Storage almost full");
		}

		setApplicationId(newId);
		setIsModalOpen(true);
	}

	useEffect(() => {
		if (!currentStatus) return;
		const statusIndex =
			zApplication.GET.shape.status.options.indexOf(currentStatus);
		setCurrentStatusIndex(statusIndex);
	}, [currentStatus]);

	useEffect(() => {
		const statusParam = searchParams.get("status");
		const parsedStatus = zApplication.GET.shape.status.safeParse(statusParam);

		if (!parsedStatus.success) return;
		const statusOption = zApplication.GET.shape.status.options.find(
			(val) => val === parsedStatus.data,
		) as zApplication["GET"]["status"];
		setValue("status", statusOption);
	}, [setValue, searchParams]);

	/**
	 * @todo if salary is select show the annual amount with a comma
	 */

	return (
		<>
			<Modal
				title="Application created"
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				description="Would you like to view this application or go home?"
				primaryButton={{
					as: "link",
					body: "Home",
					href: "/demo",
				}}
				secondaryButton={{
					as: "link",
					body: "View",
					href: `/demo/applications/${currentPosition}-at-${currentCompanyName}?id=${applicationId}`,
				}}
			/>
			<h1 className="mb-8 text-center text-3xl font-semibold">
				Create your application
			</h1>
			<form
				onSubmit={handleSubmit(submit)}
				className="grid justify-items-center gap-x-12 gap-y-8 opacity-[0.97] md:grid-cols-2"
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
									color={currentCardColor ?? getRandomHexColor()}
									setColor={onChange}
								/>
							)}
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
