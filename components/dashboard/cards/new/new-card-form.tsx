"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { toast } from "sonner";

import { ControlledInputField } from "@/components/ui/controlled-input-field";
import { saveCardAction } from "@/actions";
import Container from "@/components/ui/container";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

const cardSchema = z.object({
  number: z.string().regex(/^\d{16}$/, "El número debe tener 16 dígitos"),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(26, "El nombre no puede superar los 26 caracteres"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY inválido"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC inválido"),
});

export type newCardFormValues = z.infer<typeof cardSchema>;

const NewCardForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    setFocus,
    formState: { errors, isValid },
  } = useForm<newCardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
  });

  useEffect(() => {
    setFocus("number");
  }, [setFocus]);

  const router = useRouter();
  const [focused, setFocused] = useState<
    "number" | "name" | "expiry" | "cvc" | undefined
  >(undefined);

  const values = watch();

  const onSubmit = async (data: newCardFormValues) => {
    try {
      await saveCardAction(data);
      toast.success("Tarjeta guardada exitosamente");
      router.push("/dashboard/cards");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al guardar la tarjeta");
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "number" || name === "expiry" || name === "cvc") {
      setFocused(name);
    } else {
      setFocused(undefined);
    }
  };
  return (
    <Container>
      <Container.CustomHeader showBorder={false}>
        <Cards
          number={values.number}
          name={values.name}
          expiry={values.expiry}
          cvc={values.cvc}
          focused={focused}
          locale={{ valid: "Válido hasta" }}
          placeholders={{ name: "NOMBRE DEL TITULAR" }}
        />
      </Container.CustomHeader>

      <Container.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="mx-auto grid place-items-center gap-4 pt-4 pb-6 md:max-w-96 md:grid-cols-2 lg:max-w-2xl lg:gap-8">
            <ControlledInputField
              className="md:col-span-2 lg:col-span-1"
              name="number"
              label="Número de tarjeta"
              type="text"
              maxLenght={16}
              control={control}
              onFocus={handleFocus}
              error={errors["number"]?.message}
            />
            <ControlledInputField
              className="md:col-span-2 lg:col-span-1"
              name="name"
              label="Nombre y apellido"
              type="text"
              maxLenght={26}
              control={control}
              onFocus={handleFocus}
              error={errors["name"]?.message}
            />

            <ControlledInputField
              name="expiry"
              label="Fecha de vencimiento (MM/YY)"
              type="text"
              maxLenght={5}
              control={control}
              onFocus={handleFocus}
              error={errors["expiry"]?.message}
            />
            <ControlledInputField
              name="cvc"
              label="Código de seguridad"
              type="text"
              maxLenght={4}
              control={control}
              onFocus={handleFocus}
              error={errors["cvc"]?.message}
            />
            <Button
              className="mt-2 md:col-span-2 lg:col-span-1 lg:col-start-2"
              type="submit"
              variant={isValid ? "accent" : "light"}
            >
              Continuar
            </Button>
          </div>
        </form>
      </Container.Content>
      <Container.Header> </Container.Header>
    </Container>
  );
};

export default NewCardForm;
