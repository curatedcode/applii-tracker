"use client";

import Button from "@/src/components/Button";
import createDemoApplication from "@/src/components/Demo/createDemoApplication";
import getNewDemoApplicationId from "@/src/components/Demo/getNewDemoApplicationId";
import getRandomHexColor from "@/src/components/Fn/getRandomHexColor";
import ContactFields from "@/src/components/Form/ContactFields";
import FormCardColorInput from "@/src/components/Form/FormCardColorInput";
import FormInput from "@/src/components/Form/FormInput";
import FormSelectInput from "@/src/components/Form/FormSelectInput";
import NoteFields from "@/src/components/Form/NoteFields";
import useStorageUsage from "@/src/components/Hooks/useStorageUsage";
import Modal from "@/src/components/Modals/Modal";
import {
	type ApplicationStatusLabelValueType,
	applicationStatusSelectOptions,
	zApplicationForm,
} from "@/src/types/applications";
import { zApplication } from "@/src/types/db";
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
	} = useForm<zApplicationForm>({
		resolver: zodResolver(zApplicationForm),
		defaultValues: {
			company: {
				name: "Awesome Company!",
			},
			status: {
				label: "Need To Apply",
				value: "Need To Apply",
			},
			dateCreated: "",
			dateModified: "",
		},
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
	const [applicationId, setApplicationId] = useState<number>();

	const currentPosition = watch("position");
	const currentCompany = watch("company");

	const currentStatus = watch("status");
	const currentCardColor = watch("cardColor");

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
				status: status.value,
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
		const statusIndex = zApplication.GET.shape.status.options.indexOf(
			currentStatus.value,
		);
		setCurrentStatusIndex(statusIndex);
	}, [currentStatus]);

	useEffect(() => {
		const statusParam = searchParams.get("status");
		const parsedStatus = zApplication.GET.shape.status.safeParse(statusParam);

		if (!parsedStatus.success) return;
		const statusOption = applicationStatusSelectOptions.find(
			(val) => val.value === parsedStatus.data,
		) as ApplicationStatusLabelValueType;
		setValue("status", statusOption);
	}, [setValue, searchParams]);

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
					href: `/demo/applications/${currentPosition}-at-${currentCompany.name}?id=${applicationId}`,
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
							registerName="position"
							label="Position"
							error={errors.position?.message}
							register={register}
							isRequired
						/>
						<FormInput
							id="companyInput"
							registerName="company.name"
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
									selected={currentStatus}
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
						<Controller
							name="cardColor"
							control={control}
							render={({ field: { onChange } }) => (
								<FormCardColorInput
									id="cardColorInput"
									label="Card Color"
									company={currentCompany.name}
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
