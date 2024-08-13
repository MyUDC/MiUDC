import interests from "@/features/user/data/interests";
import InterestCard from "@/shared/components/InterestCard";

export default async function Interests() {

  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Tus intereses</h1>
        {interests.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2">
            {interests.map((interest, index) => (
              <InterestCard key={index} {...interest} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full py-8">
            <p className="text-gray-500 text-lg">
              No tienes intereses agregados aún.
            </p>
          </div>
        )}
      </div>
  );
}
