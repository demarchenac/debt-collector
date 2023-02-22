import { Spinner } from "../Snipper";

const normalClasses =
  "bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300";

const disabledClasses = "bg-indigo-300 cursor-not-allowed";
const errorClasses =
  "bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300";

export function Button({
  type = "button",
  disabled = false,
  hasError = false,
  isLoading = false,
  children,
}: {
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  children?: string;
}) {
  let classes = hasError ? errorClasses : normalClasses;
  classes = disabled ? disabledClasses : classes;

  const loadingTree = (
    <>
      {children} &emsp; <Spinner size={20} />
    </>
  );

  const loadingContent = isLoading ? loadingTree : children;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`h-13 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${classes}`}
    >
      <div className="align-center flex w-full justify-center">
        {loadingContent}
      </div>
    </button>
  );
}
