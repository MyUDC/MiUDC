//src\app\api\post\create\route.ts
import { NextRequest, NextResponse } from "next/server";
import createPost from "@/shared/actions/Post/createPost";

export async function POST(req: NextRequest) {
  try {
    const { type, title, content, authorId, careerId, imageUrls } =
      await req.json();

    // Verificación de los campos obligatorios
    if (!type || !title || !content || !authorId || !careerId) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    // Llamada a la función que crea el post
    const newPost = await createPost({
      type,
      title,
      content,
      authorId,
      careerId,
      imageUrls,
    });

    return NextResponse.json(newPost, { status: 200 });
  } catch (error) {
    console.error("Error al crear el post:", error);
    return NextResponse.json(
      { error: "Error al crear el post" },
      { status: 500 }
    );
  }
}
