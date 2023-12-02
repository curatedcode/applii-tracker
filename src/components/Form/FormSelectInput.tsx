"use client";

import { FormOptionType } from "@/src/types/applications";
import { defaultFocusHoverClasses } from "@/src/types/global";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export type FormSelectInputProps = {
  label: string;
  error?: string;
  selected: FormOptionType;
  options: FormOptionType[];
  isRequired?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<FormOptionType>>;
};

export default function FormSelectInput({
  label,
  selected,
  setSelected,
  error,
  options,
  isRequired,
}: FormSelectInputProps) {
  if (!selected) return;

  return (
    <div className="grid gap-1">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative flex flex-col md:flex-row md:items-center md:gap-1">
          <Listbox.Label className="mb-1 ml-1 flex w-32 gap-1 text-sm opacity-80">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </Listbox.Label>
          <Listbox.Button
            className={`${defaultFocusHoverClasses} relative w-full cursor-pointer rounded-md bg-light-secondary py-1.5 pl-3 pr-10 text-left shadow-sm dark:bg-dark-secondary md:ml-0.5`}
          >
            <span className="block truncate">{selected.label}</span>
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
            <Listbox.Options className="absolute right-0 top-0 z-[1] mt-[4.25rem] max-h-60 w-full overflow-auto rounded-md bg-light-secondary shadow-md outline-none ring-1 ring-dark-secondary ring-opacity-100 transition-all duration-100 focus:outline-none dark:bg-dark-secondary dark:ring-light-secondary md:mt-11 md:max-w-[calc(100%-6.95rem)]">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  data-testid={`${option.value}-option`}
                  className={({ active }) =>
                    `${defaultFocusHoverClasses} relative cursor-default select-none py-2 pl-8 pr-4 ${
                      active ? "bg-light-tertiary dark:bg-dark-tertiary" : ""
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
                        {option.label}
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
      </Listbox>
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
