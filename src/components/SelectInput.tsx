import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { OptionType, defaultFocusHoverClasses } from "../types/global";

export type SelectInputProps<TLabel, TValue> = {
  options: OptionType<TLabel, TValue>[];
  setSelected: React.Dispatch<React.SetStateAction<OptionType<TLabel, TValue>>>;
  selected: OptionType<TLabel, TValue>;
};

export default function SelectInput<
  TLabel extends string,
  TValue extends string,
>({ options, setSelected, selected }: SelectInputProps<TLabel, TValue>) {
  return (
    <div className="w-40 text-sm">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`${defaultFocusHoverClasses} relative w-full cursor-pointer rounded-md bg-light-secondary py-1.5 pl-3 pr-10 text-left shadow-sm dark:bg-dark-secondary`}
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
            <Listbox.Options className="absolute z-[1] mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-secondary shadow-md outline-none ring-1 ring-dark-secondary ring-opacity-100 transition-all duration-100 focus:outline-none dark:bg-dark-secondary dark:ring-light-secondary">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${defaultFocusHoverClasses} relative cursor-pointer select-none py-1.5 pl-8 pr-4 ${
                      active ? "bg-light-tertiary dark:bg-dark-tertiary" : ""
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
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
    </div>
  );
}
