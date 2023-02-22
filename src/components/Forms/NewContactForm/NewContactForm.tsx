import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "../Fields";
import { Button } from "../../Button";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Campo 'Nombre' requerido" }),
  email: z
    .string()
    .min(1, { message: "Campo 'Correo' requerido" })
    .email({ message: "Formato de correo inválido" }),
  phone: z.string().min(1, { message: "Campo 'Telefono' requerido" }),
  // photo: z.string().min(1, { message: "Campo 'Foto' requerido" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function NewContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  const formHasError = Object.entries(errors).length > 0;
  const formWasSubmitted = isSubmitSuccessful && isSubmitted;

  console.log({ errors });

  return (
    <form
      className="flex flex-col"
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
    >
      <Field
        schema={validationSchema}
        register={register}
        errors={errors}
        name="name"
        label="Nombre"
        placeholder="Juanito Perez"
      />
      <Field
        schema={validationSchema}
        register={register}
        errors={errors}
        name="email"
        label="Correo"
        placeholder="usuario@ejemplo.com"
      />
      <Field
        schema={validationSchema}
        register={register}
        errors={errors}
        name="phone"
        label="Teléfono"
        placeholder="+57 (123) 456-7890"
      />

      <Button
        type="submit"
        hasError={formHasError}
        isLoading={formWasSubmitted}
        disabled={formWasSubmitted || formHasError}
      >
        Agregar contacto
      </Button>
    </form>
  );
}
