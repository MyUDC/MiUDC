import { FieldErrors } from "react-hook-form"
import { FormInputs } from "./PostForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfo } from "@fortawesome/free-solid-svg-icons"

interface Props {
  errors: FieldErrors<FormInputs>
}

export const PostFromErrors = ({ errors }: Props) => {
  return (
    <>
      {Object.entries(errors).map((error) => {
        const [, fieldError] = error;
        return (
          <span className="px-2 text-sm flex text-red-600 items-center gap-1">
            <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
            {fieldError.message}
          </span>
        );
      })}
    </>
  )
}
