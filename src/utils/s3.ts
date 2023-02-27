import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../env/server.mjs";

const s3 = new S3Client({
  credentials: { accessKeyId: env.ACCESS_KEY, secretAccessKey: env.SECRET_KEY },
  region: env.REGION,
});

const uploadToS3 = async ({
  Key,
  mimeType,
}: {
  Key: string;
  mimeType: string;
}) => {
  const command = new PutObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key,
    ContentType: mimeType,
  });

  try {
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return { uploadUrl, Key };
  } catch (error) {
    console.log(error);
    return { error, uploadUrl: "" };
  }
};

const getUserPresignedUrls = async (keys: string[]) => {
  try {
    const presignedUrls = await Promise.all(
      keys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: env.BUCKET_NAME,
          Key: key,
        });

        return getSignedUrl(s3, command, { expiresIn: 900 }); // default
      })
    );
    return { presignedUrls };
  } catch (error) {
    console.log(error);
    return { error, presignedUrls: [] };
  }
};

export const S3 = {
  uploadToS3,
  getUserPresignedUrls,
};
