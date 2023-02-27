import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FileUploadField } from "../Fields";
import { Button } from "../../Button";
import { api } from "../../../utils/api";
import axios from "axios";

const maxFileSize = 1000000 * 5;
const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "Campo 'Nombre' requerido" }),
  lastName: z.string().min(1, { message: "Campo 'Apellido' requerido" }),
  email: z
    .string()
    .min(1, { message: "Campo 'Correo' requerido" })
    .email({ message: "Formato de correo inválido" }),
  phone: z.string().min(1, { message: "Campo 'Teléfono' requerido" }),
  photo: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Campo 'Foto' requerido")
    .refine((files) => {
      if (!files) return false;
      const file = files.item(0);
      if (!file) return false;

      console.log({ size: file.size });

      return file.size <= maxFileSize;
    }, "El tamaño máximo es de 5 MB.")
    .refine((files) => {
      if (!files) return false;
      const file = files.item(0);
      if (!file) return false;

      return acceptedImageTypes.includes(file.type);
    }, "Solo se aceptan los formatos .jpg, .jpeg, .png."),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function NewContactForm() {
  const { mutateAsync: postSignedUrl } =
    api.image.postPreflightURL.useMutation();

  const { mutate: addContact } = api.contact.addContact.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async ({
    photo,
    ...data
  }) => {
    const image = photo.item(0);
    if (!image) {
      return;
    }

    const { uploadUrl, Key } = await postSignedUrl({
      filename: image.name,
      mimeType: image.type,
    });

    if (uploadUrl.length > 0) {
      await axios.put(uploadUrl, image);
    }

    console.log({ image, uploadUrl, Key });
    addContact({ ...data, photoKey: Key });
    reset();
  };

  const formHasError = Object.entries(errors).length > 0;
  const formWasSubmitted = isSubmitSuccessful && isSubmitted;

  return (
    <form
      className="flex flex-col"
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
    >
      <Field
        schema={validationSchema}
        register={register}
        errors={errors}
        name="firstName"
        label="Nombre"
        placeholder="Juanito"
      />
      <Field
        schema={validationSchema}
        register={register}
        errors={errors}
        name="lastName"
        label="Apellido"
        placeholder="Perez"
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

      <FileUploadField
        schema={validationSchema}
        register={register}
        errors={errors}
        name="photo"
        label="Foto"
        hint="PNG, JPG or JPEG (MAX. 5 MB)"
        accept={acceptedImageTypes.join(",")}
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
