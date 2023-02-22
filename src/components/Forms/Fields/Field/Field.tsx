import type { HTMLInputTypeAttribute } from "react";
import type {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import type { z } from "zod";

export function Field<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  placeholder = "",
  type = "text",
}: {
  schema: z.ZodType<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}) {
  const hasError = Boolean(errors[name]);
  const fieldError = errors[name]?.message as string;
  const labelClasses = !hasError ? "text-gray-700" : "text-red-600";
  const inputClasses = !hasError
    ? "border border-gray-300 focus:border-indigo-500 focus:ring-indigo-300"
    : "border border-red-500 focus:ring-red-300";

  return (
    <div className="mb-4">
      <label
        className={`mb-2 block cursor-pointer text-sm font-bold ${labelClasses}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`focus:shadow-outline w-full appearance-none rounded-lg bg-gray-50 p-2.5 text-gray-900  focus:outline-none focus:ring-4 ${inputClasses}`}
        id={name}
        type={type}
        placeholder={placeholder}
        aria-describedby={`${name}Hint`}
        aria-invalid={hasError ? "true" : "false"}
        {...register(name)}
      />
      {hasError && (
        <p className="mt-2 text-xs italic text-red-500" id={`${name}Hint`}>
          {fieldError}
        </p>
      )}
    </div>
  );
}
