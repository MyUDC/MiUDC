"use server";

import { v2 as cloudinary } from "cloudinary";

interface UploadResponse {
  ok: boolean;
  result: (string | null)[];
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  formData: FormData
): Promise<UploadResponse> => {
  try {
    const imageFiles = formData.getAll("images") as File[];
    console.log(formData.getAll("images"));

    if (imageFiles.length === 0) {
      throw new Error("No images provided");
    }

    const uploadPromises = imageFiles.map(uploadToCloudinary);
    const imageUrls = await Promise.all(uploadPromises);

    return { ok: true, result: imageUrls };
  } catch (error) {
    console.error("Error uploading images:", error);
    return { ok: false, result: [] };
  }
};

const uploadToCloudinary = async (image: File) => {
  try {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`
    );

    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
