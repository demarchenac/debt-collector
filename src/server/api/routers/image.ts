import { z } from "zod";
import { randomUUID } from "crypto";

import { S3 } from "../../../utils/s3";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  postPreflightURL: protectedProcedure
    .input(z.object({ filename: z.string(), mimeType: z.string() }))
    .mutation(async ({ ctx: { session }, input: { filename, mimeType } }) => {
      const Key = `${session.user.id}/${randomUUID()}-${filename}`;

      const { uploadUrl } = await S3.uploadToS3({ Key, mimeType });

      return { uploadUrl, Key };
    }),
});
