import ImageForm from "@/shared/components/ImageForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page",
};

export default function HomePage() {
  return (
    <>
      <Link href="/user">
        User page
      </Link>
      <ImageForm />
    </>
  );
}
