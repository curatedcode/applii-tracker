import { ArrayFieldProps } from "@/src/types/applications";
import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFieldArray } from "react-hook-form";
import Button from "../Button";
import FormTextarea from "./FormTextarea";

export default function NoteFields({
  register,
  control,
  className,
}: ArrayFieldProps) {
  const { fields, append, remove } = useFieldArray({ name: "notes", control });

  return (
    <div
      className={`col-span-full grid h-fit w-full auto-rows-min ${className}`}
    >
      <h2 className="mb-6 w-fit justify-self-center border-b px-1 text-lg font-semibold">
        Notes
      </h2>
      <ul className="grid gap-3 md:grid-cols-[repeat(auto-fill,18rem)] md:justify-center">
        {fields.map((field, index) => (
          <li key={field.id} className="mb-6 grid gap-3">
            <FormTextarea
              id={`noteBodyInput${index}`}
              rows={8}
              label="Body"
              registerName={`notes.${index}.body`}
              register={register}
              isRequired
            />
            <Button
              onClick={() => remove(index)}
              className="-mt-[1px] mr-2 justify-self-end"
              title={`Delete Note ${index + 1}`}
              style="icon"
            >
              <TrashIcon aria-hidden="true" className="w-5" />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => append({ title: "", body: "" })}
        className="justify-self-center"
      >
        <DocumentPlusIcon className="w-4" aria-hidden="true" />
        <span>Add Note</span>
      </Button>
    </div>
  );
}
