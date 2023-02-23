import {
  GetObjectCommand,
  ListObjectsV2Command,
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

// const getImageKeysByUser = async (userId) => {
//   const command = new ListObjectsV2Command({
//     Bucket: BUCKET,
//     Prefix: userId,
//   });

//   const { Contents = [] } = await s3.send(command);

//   return Contents.sort(
//     (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
//   ).map((image) => image.Key);
// };

// export const getUserPresignedUrls = async (userId) => {
//   try {
//     const imageKeys = await getImageKeysByUser(userId);

//     const presignedUrls = await Promise.all(
//       imageKeys.map((key) => {
//         const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
//         return getSignedUrl(s3, command, { expiresIn: 900 }); // default
//       })
//     );
//     return { presignedUrls };
//   } catch (error) {
//     console.log(error);
//     return { error };
//   }
// };

export const S3 = {
  uploadToS3,
};
