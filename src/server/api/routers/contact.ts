import { z } from "zod";
import { S3 } from "../../../utils/s3";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getUserContacts: protectedProcedure.query(async ({ ctx }) => {
    const contacts = await ctx.prisma.contact.findMany({
      where: { indebtedToId: ctx.session.user.id },
    });

    const keys = contacts.map((contact) => contact.photoKey);

    const { presignedUrls = [] } = await S3.getUserPresignedUrls(keys);

    const contactsWithPhoto = contacts.map((contact, index) => ({
      ...contact,
      photo: presignedUrls[index] ?? "",
    }));

    return { contacts: contactsWithPhoto };
  }),

  addContact: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, { message: "Campo 'Nombre' requerido" }),
        lastName: z.string().min(1, { message: "Campo 'Nombre' requerido" }),
        document: z.string().min(3, { message: "Campo 'Documento' requerido" }),
        email: z
          .string()
          .min(1, { message: "Campo 'Correo' requerido" })
          .email({ message: "Formato de correo inválido" }),
        phone: z.string().min(1, { message: "Campo 'Teléfono' requerido" }),
        photoKey: z.string().min(1, { message: "Campo 'Foto' requerido" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newContact = await ctx.prisma.contact.create({
        data: {
          ...input,
          indebtedToId: ctx.session.user.id,
        },
      });

      return { newContact };
    }),
});
