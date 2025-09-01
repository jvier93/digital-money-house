import { Pencil } from "lucide-react";
import clsx from "clsx";
import { UserFields } from "@/components/dashboard/profile/user-profile-form";

type EditableFieldProps = {
  name: string;
  label: string;
  value: string;
  editing: boolean;
  onToggleEdit: (name: UserFields) => void;
  error?: string;
  showIcon?: boolean;
};

function EditableField({
  name,
  label,
  value,
  editing,
  onToggleEdit,
  error,
  showIcon = true,
}: EditableFieldProps) {
  return (
    <div className="relative w-full md:grid md:grid-cols-4">
      <label
        className={clsx(
          "text-body-1 block",
          error ? "text-error" : "text-primary",
        )}
      >
        {label}
      </label>
      <div
        className={clsx(
          "flex items-center justify-between md:col-span-3",
          error && "border-error border-b",
        )}
      >
        <input
          autoFocus={editing}
          name={name}
          defaultValue={value}
          readOnly={!editing}
          onKeyDown={(e) => {
            if (e.key === "Escape") onToggleEdit(name as UserFields);
          }}
          className={clsx(
            "w-full focus:outline-none",
            !editing ? "text-gray-500" : "text-primary",
            error && "border-red-500 focus:ring-red-500",
          )}
        />
        {showIcon && (
          <button
            type="button"
            className="ml-2 text-gray-400 md:flex md:justify-end md:text-left"
            onClick={() => onToggleEdit(name as UserFields)}
          >
            <Pencil className={clsx(error && "text-red-500")} size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default EditableField;
