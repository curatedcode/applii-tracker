"use client";

import getContrastingColor from "@/src/components/Fn/getContrastingColor";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import ErrorMessage from "./ErrorMessage";

export type FormCardColorInputProps = {
	id: string;
	label: string;
	color: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
	error?: string;
	position?: string;
	company?: string;
};

function FormCardColorInput({
	id,
	label,
	color,
	setColor,
	error,
	company,
	position,
}: FormCardColorInputProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <div className="h-[304px]" />;

	return (
		<div className="grid gap-1" data-axe-ignore={true}>
			<div className="flex flex-col md:flex-row md:gap-1">
				<label
					htmlFor={id}
					className="mb-1 ml-1 flex gap-1 text-sm leading-tight opacity-80 md:w-32"
				>
					{label}
				</label>
				<div className="md:items-center flex-col flex w-full gap-3">
					<div id="formCardColorInputColorPicker" className="w-full">
						<HexColorPicker id={id} color={color} onChange={setColor} />
					</div>
					<div
						className="h-board-section-card max-w-board-section w-full rounded-md relative flex flex-col justify-between px-3 py-2"
						style={{
							backgroundColor: color,
							color: getContrastingColor(color.slice(1)),
						}}
					>
						<div className="grid font-medium">
							<span className="line-clamp-1">
								{position ?? "Account Manager"}
							</span>
							<span className="line-clamp-1">
								{company ?? "Leading Company"}
							</span>
						</div>
						<span className="absolute bottom-2 right-3 text-sm">1m</span>
					</div>
				</div>
			</div>
			<ErrorMessage error={error} />
		</div>
	);
}

export default FormCardColorInput;
