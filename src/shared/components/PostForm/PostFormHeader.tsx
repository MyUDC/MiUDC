import { faCancel, faCheck, faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const PostFormHeader = () => {
  return (
    <header className="flex justify-between items-center mb-4 border-b border-gray-300 py-2 px-4">
      <button title="cancelar" className="text-gray-500 text-xl">
        <FontAwesomeIcon icon={faClose}/>
      </button>
      <h2 className="text-lg font-semibold">Testimonio</h2>
      <button title="guardar" className=" text-green text-xl font-semibold" type="submit">
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </header>
  )
}
