"use client";

import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import BoardSectionCardMock from "../Board/BoardSectionCardMock";
import ErrorMessage from "./ErrorMessage";

export type FormColorInputProps = {
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
}: FormColorInputProps) {
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
					<BoardSectionCardMock
						company={company}
						position={position}
						bgColor={color}
					/>
				</div>
			</div>
			<ErrorMessage error={error} />
		</div>
	);
}

export default FormCardColorInput;
