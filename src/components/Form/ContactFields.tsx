import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ArrayFieldProps } from "@/src/customVariables";
import { useFieldArray } from "react-hook-form";
import FormInput from "./FormInput";
import Button from "../Buttons/Button";
import IconButton from "../Buttons/IconButton";

export default function ContactsFields({
  register,
  control,
  className,
}: ArrayFieldProps) {
  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control,
  });

  return (
    <div className={className}>
      <h2 className="mb-6 w-fit justify-self-center border-b-2 px-1 text-lg font-semibold">
        Contacts
      </h2>
      <ul className="grid">
        {fields.map((field, index) => (
          <li key={field.id} className="mb-6 grid gap-2">
            <FormInput
              id={`contactNameInput${index}`}
              label="Name"
              registerName={`contacts.${index}.name`}
              register={register}
              hiddenLabel
              placeholder="Name"
              isRequired
            />
            <FormInput
              id={`contactPositionInput${index}`}
              label="Position"
              registerName={`contacts.${index}.position`}
              register={register}
              hiddenLabel
              placeholder="Position"
            />
            <FormInput
              id={`contactPhoneInput${index}`}
              label="Phone"
              registerName={`contacts.${index}.phone`}
              register={register}
              hiddenLabel
              placeholder="Phone"
            />
            <FormInput
              id={`contactEmailInput${index}`}
              label="Email"
              registerName={`contacts.${index}.email`}
              register={register}
              hiddenLabel
              placeholder="Email"
            />
            <IconButton
              onClick={() => remove(index)}
              className="mr-2 mt-1 justify-self-end"
              title={`Delete Contact ${index + 1}`}
            >
              <TrashIcon aria-hidden className="w-6" />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button
        onClick={() =>
          append({
            name: "",
            position: "",
            phone: "",
            email: "",
          })
        }
        className="justify-self-center"
        style="transparent"
      >
        <UserPlusIcon className="w-6" aria-hidden />
        <span>Add Contact</span>
      </Button>
    </div>
  );
}
