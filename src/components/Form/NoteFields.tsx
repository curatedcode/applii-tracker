import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ArrayFieldProps } from "@/src/customVariables";
import { useFieldArray } from "react-hook-form";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import Button from "../Button";

export default function NoteFields({
  register,
  control,
  className,
}: ArrayFieldProps) {
  const { fields, append, remove } = useFieldArray({ name: "notes", control });

  return (
    <div className={className}>
      <h2 className="mb-6 w-fit justify-self-center border-b px-1 text-lg font-semibold">
        Notes
      </h2>
      <ul className="grid">
        {fields.map((field, index) => (
          <li key={field.id} className="mb-6 grid gap-2">
            <FormInput
              id={`noteTitleInput${index}`}
              label="Title"
              registerName={`notes.${index}.title`}
              hiddenLabel
              placeholder="Title"
              register={register}
              isRequired
            />
            <FormTextarea
              id={`noteBodyInput${index}`}
              rows={5}
              label="Body"
              registerName={`notes.${index}.body`}
              hiddenLabel
              placeholder="Body"
              register={register}
              isRequired
            />
            <Button
              onClick={() => remove(index)}
              className="-mt-[1px] mr-2 justify-self-end"
              title={`Delete Note ${index + 1}`}
              style="icon"
            >
              <TrashIcon aria-hidden="true" className="w-6" />
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
