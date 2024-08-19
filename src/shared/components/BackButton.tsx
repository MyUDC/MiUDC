"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const backButtonHandler = () => {
    router.back();
  }

  return (
    <div onClick={backButtonHandler} className="cursor-pointer">
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="text-2xl"
      />
    </div>
  )
}

export default BackButton;
