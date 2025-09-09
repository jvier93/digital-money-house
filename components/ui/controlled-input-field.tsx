import clsx from "clsx";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: string;
  control: Control<T>;
  error?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  maxLenght?: number;
};

export function ControlledInputField<T extends FieldValues>({
  name,
  label,
  type,
  control,
  error,
  onFocus,
  className,
  maxLenght,
}: ControlledInputProps<T>) {
  return (
    <div className={clsx("flex w-full max-w-96 flex-col gap-1", className)}>
      {error && <p className="text-error">{error}</p>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            onFocus={onFocus}
            inputMode="numeric"
            maxLength={maxLenght}
            type={type}
            placeholder={`${label}*`}
            className="rounded-lg bg-white px-6 py-3 text-black shadow-md"
          />
        )}
      />
    </div>
  );
}
