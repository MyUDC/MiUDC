import ImageForm from "@/components/ImageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page",
};

export default function HomePage() {
  return (<ImageForm />);
}
