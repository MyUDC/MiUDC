import Image from "next/image";

interface UserProfileProps {
  name: string;
  photoUrl?: string;
  width?: number;
  height?: number;
}

export default function UserAvatar({
  name,
  photoUrl,
  width = 48,
  height = 48,
}: UserProfileProps) {
  return (
    <div className="flex items-center">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`${name}'s profile`}
          className="rounded-full mr-4"
          width={width}
          height={height}
        />
      ) : (
        <div
          className="rounded-full bg-gray-300 mr-4"
          style={{ width, height }}
        ></div>
      )}
      <div className="text-lg font-bold text-white">{name}</div>
    </div>
  );
}
