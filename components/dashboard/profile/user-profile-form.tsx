"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { updateUserAction, UpdateUserValuesType } from "@/actions";
import { toast } from "sonner";
import EditableField from "@/components/dashboard/profile/editable-field";

export type UserProfileFormStateType = {
  values: UpdateUserValuesType;
  errors: Record<string, string>;
  success: boolean;
};

export type UserFields = keyof UpdateUserValuesType;

type UserProfileFormProps = {
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
};

export default function UserProfileForm({
  email,
  firstName,
  lastName,
  dni,
  phone,
}: UserProfileFormProps) {
  const initialState: UserProfileFormStateType = {
    values: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      dni: dni,
      phone: phone,
    },
    success: false,
    errors: {},
  };

  const [state, formAction] = useActionState(updateUserAction, initialState);

  // Run after each successful submit.
  // We don't just check success === true because success might already be true
  // from a previous submit, and then this effect wouldn't run again.
  // Checking that there are no errors ensures we only run these actions when the submit was truly successful.
  useEffect(() => {
    if (Object.keys(state.errors).length === 0 && state.success) {
      setEditingFields({});
      toast.success("Perfil actualizado correctamente");
    }

    if (!state.success && Object.keys(state.errors).length > 0) {
      toast.error("No se pudo actualizar el usuario");
    }
  }, [state]);

  const [editingFields, setEditingFields] = useState<
    Partial<Record<UserFields, boolean>>
  >({});

  const toggleEdit = (name: UserFields) => {
    setEditingFields((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const fields: { name: Exclude<UserFields, "email">; label: string }[] = [
    { name: "firstName", label: "Nombre" },
    { name: "lastName", label: "Apellido" },
    { name: "dni", label: "DNI" },
    { name: "phone", label: "Teléfono" },
  ];
  return (
    <Container>
      <Container.Header>Tus datos</Container.Header>
      <Container.Content>
        <form action={formAction}>
          <Container.Item>
            <EditableField
              name="email"
              label="Email"
              value={state.values.email}
              editing={false}
              showIcon={false}
              onToggleEdit={toggleEdit}
            />
          </Container.Item>

          {fields.map(({ name, label }) => (
            <Container.Item key={name}>
              <EditableField
                name={name}
                label={label}
                value={state.values[name]}
                editing={!!editingFields[name]}
                onToggleEdit={toggleEdit}
                error={state.errors[name]}
              />
            </Container.Item>
          ))}
          <button type="submit" className="hidden" />
        </form>
      </Container.Content>
    </Container>
  );
}
