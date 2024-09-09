interface props {
  title: string;
  placeholder: string;
  name: string;
  id: string;
  options: { value: string; label: string }[];
}
export default function Select({ title, name, id, options, placeholder}: props) {
  return (
    <div className="flex flex-col w-full">
      <label>{title}</label>
      <div className="bg-smoothGreen rounded-full p-2">
        <select
          title={name}
          name={name}
          id={id}
          className="p-2 bg-transparent w-full rounded-full"
          defaultValue=""
        >
          <option value="" disabled className="text-gray-500">{placeholder}</option>
          {options.map((option) => (
            <option className="" key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}