import { FormSelectInputProps } from "@/src/utils/customVariables";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export default function FormSelectInput({
  value,
  label,
  onChange,
  error,
  options,
}: FormSelectInputProps) {
  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Label className="ml-1 text-base opacity-80">
            {label}
          </Listbox.Label>
          <Listbox.Button className="relative mt-1 h-10 w-full cursor-default rounded-md bg-light-secondary py-1 pl-3 pr-10 text-left shadow-sm outline-none transition-all duration-100 focus-within:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary">
            <span className="block truncate">{value.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="mr-[0.3rem] h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-secondary shadow-md ring-1 ring-black ring-opacity-5 transition-all duration-100 focus:outline-none dark:bg-dark-secondary dark:ring-light-secondary">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  data-testid={`${option.value}-option`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1.5 pl-10 pr-4 ${
                      active
                        ? "bg-light-secondary-shaded dark:bg-dark-secondary-shaded"
                        : ""
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
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-light-text dark:text-dark-text">
                          <CheckIcon className="w-4" aria-hidden="true" />
                        </span>
                      )}
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
