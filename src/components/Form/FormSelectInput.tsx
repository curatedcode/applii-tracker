"use client";

import { defaultFocusHoverClasses } from "@/src/types/global";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { type ForwardedRef, Fragment, forwardRef, useRef } from "react";
import type { Noop, RefCallBack } from "react-hook-form";

export type FormSelectInputProps = {
	label: string;
	error?: string;
	isRequired?: boolean;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	options: string[];
	onBlur: Noop;
	value: string;
	disabled?: boolean;
	name: string;
	ref: RefCallBack;
};

const FormSelectInput = forwardRef(
	// biome-ignore lint/suspicious/noExplicitAny: forwarding the ref
	(props: FormSelectInputProps, ref: ForwardedRef<any>) => {
		const { label, onChange, options, error, isRequired, value, name } = props;

		const buttonRef = useRef<HTMLButtonElement>(null);

		return (
			<div className="grid gap-1">
				<Listbox value={value} onChange={onChange}>
					<div className="relative flex flex-col md:flex-row md:items-center md:gap-1">
						<Listbox.Label
							className="mb-1 ml-1 flex w-32 gap-1 text-sm opacity-80"
							htmlFor={`${name}-input`}
							onClick={() => buttonRef.current?.click()}
						>
							{label}
							{isRequired && <span className="text-red-500">*</span>}
						</Listbox.Label>
						<div className="relative w-full">
							<Listbox.Button
								className={`${defaultFocusHoverClasses} relative w-full cursor-pointer rounded-md bg-light-secondary py-1.5 pl-3 pr-10 text-left shadow-sm dark:bg-dark-secondary`}
								ref={buttonRef}
								aria-label={label}
							>
								<span className="block truncate">{value}</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options
									className="absolute top-0 z-[1] mt-11 max-h-60 min-w-full overflow-auto rounded-md bg-light-secondary shadow-md outline-none ring-1 ring-dark-secondary ring-opacity-100 transition duration-100 focus:outline-none dark:bg-dark-secondary dark:ring-light-secondary"
									ref={ref}
								>
									{options.map((option) => (
										<Listbox.Option
											key={option}
											data-testid={`${option}-option`}
											className={({ active }) =>
												`${defaultFocusHoverClasses} relative cursor-pointer select-none py-2 pl-8 pr-4 ${
													active
														? "bg-light-tertiary dark:bg-dark-tertiary"
														: ""
												}`
											}
											value={option}
										>
											{({ selected: isSelected }) => (
												<>
													<span
														className={`block truncate ${
															isSelected ? "font-medium" : "font-normal"
														}`}
													>
														{option}
													</span>
													{isSelected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-2 text-light-text dark:text-dark-text">
															<CheckIcon
																className="w-4 text-dark-secondary dark:text-light-secondary"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</div>
				</Listbox>
				{error && <span role="alert">{error}</span>}
			</div>
		);
	},
);

export default FormSelectInput;
