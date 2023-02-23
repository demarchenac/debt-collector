import type { z } from "zod";
import type {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";

export function FileUploadField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  hint,
  multiple = false,
}: {
  schema: z.ZodType<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  hint?: string;
  multiple?: boolean;
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
        htmlFor="file_input"
      >
        {label}
      </label>
      <input
        className={`
        focus:shadow-outline block w-full cursor-pointer appearance-none rounded-lg 
        bg-gray-50 pr-2.5 text-gray-900 
        file:mr-4 file:rounded-l-lg file:border-none file:bg-indigo-700 file:p-2.5 file:text-white
        focus:outline-none focus:ring-4 
        ${inputClasses}`}
        id={name}
        type="file"
        multiple={multiple}
        aria-describedby={`${name}Hint`}
        aria-invalid={hasError ? "true" : "false"}
        {...register(name)}
      />
      {hint && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{hint}</p>
      )}
      {hasError && (
        <p
          className={`${hint ? "mt-0.5" : "mt-2"} text-xs italic text-red-500`}
          id={`${name}Hint`}
        >
          {fieldError}
        </p>
      )}
    </div>
  );
}
