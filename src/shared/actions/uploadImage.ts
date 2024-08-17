'use server';

import { v2 as cloudinary } from 'cloudinary';

interface UploadResponse {
  ok: boolean;
  result: string | null;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (formData: FormData): Promise<UploadResponse> => {

  try {
    const data = Object.fromEntries(formData.entries());

    const image = formData.get('image');
    const imageUrl = await uploadToCloudinary(image as File);
    return { ok: true, result: imageUrl };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { ok: false, result: null };
  }
}

const uploadToCloudinary = async (image: File) => {
  try {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);

    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}