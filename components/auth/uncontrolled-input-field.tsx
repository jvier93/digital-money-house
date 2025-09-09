import React from "react";

interface Props {
  name: string;
  label: string;
  error?: string;
  type: string;
  value?: string;
}

export function UncontrolledInputField({
  name,
  label,
  type,
  error,
  value,
}: Props) {
  return (
    <div className="flex w-80 flex-col gap-1">
      {error && <p className="text-error">{error}</p>}
      <input
        defaultValue={value}
        type={type}
        name={name}
        placeholder={`${label}*`}
        className="rounded-lg bg-white px-6 py-3 text-black"
      />
    </div>
  );
}
