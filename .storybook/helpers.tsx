import { zodResolver } from "@hookform/resolvers/zod";
import { action } from "@storybook/addon-actions";
import React from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

export type FormWrapperProps<TZodSchema extends z.AnyZodObject> = {
	children: (_: {
		// biome-ignore lint/suspicious/noExplicitAny: react-hook-form uses this same type
		methods: UseFormReturn<z.TypeOf<TZodSchema>, any, undefined>;
	}) => React.ReactNode;
	/**
	 * The zod schema used for the form
	 */
	schema: TZodSchema;
};

export function FormWrapper<TZodSchema extends z.AnyZodObject>({
	children,
	schema,
}: FormWrapperProps<TZodSchema>) {
	const methods = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(action("RHF Submit"))}>
				{children({ methods: methods })}
			</form>
		</FormProvider>
	);
}
