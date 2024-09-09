"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { HTMLProps } from "react";

const BackButton = ({ className }: HTMLProps<HTMLDivElement>) => {
  const router = useRouter();

  const backButtonHandler = () => {
    router.back();
  }

  return (
    <div onClick={backButtonHandler} className={`cursor-pointer ${className}`}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="text-2xl text-green"
      />
    </div>
  )
}

export default BackButton;
