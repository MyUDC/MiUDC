import SwitchButton from "@/shared/components/SwitchButton";

interface Props {
  path: string;
}

const ForumDetailsTabs = ({ path }: Props) => {
  return (
    <div className="p-4 flex justify-end">
      <SwitchButton
        itemLeft={{
          label: "Foro",
          path: path + "/forum",
        }}
        itemRight={{
          label: "Detalles",
          path: path + "/details",
        }}
      />
    </div>
  );
};

export default ForumDetailsTabs;
