import { z } from "zod";

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

    return { contacts };
  }),

  addContact: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, { message: "Campo 'Nombre' requerido" }),
        lastName: z.string().min(1, { message: "Campo 'Nombre' requerido" }),
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
