export const PostFormHeader = () => {
  return (
    <header className="flex justify-between items-center mb-4 border-b border-gray-300 p-2">
      <button className="text-gray-500">Cancelar</button>
      <h2 className="text-lg font-semibold">Testimonio</h2>
      <button className=" text-green font-semibold" type="submit">
        Guardar
      </button>
    </header>
  )
}
