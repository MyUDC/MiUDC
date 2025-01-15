import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/features/user/components/UserAvatar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface PostCardProps {
  onValidatedClick: () => void;
}

export function PostCard({ onValidatedClick }: PostCardProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Detailed skeleton loading state
  if (status === "loading") {
    return (
      <div className="my-4 px-4 sm:px-6 lg:px-8">
        <Card className="w-full mx-auto cursor-pointer hover:bg-accent/50 transition-colors shadow-none">
          <CardContent className="p-4 py-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no session, don't render PostCard at all
  if (!session?.user) return null;

  return (
    <div className="my-4 px-4 sm:px-6 lg:px-8">
      <Card
        className="w-full mx-auto cursor-pointer hover:bg-accent/50 transition-colors shadow-none"
        onClick={onValidatedClick}
      >
        <CardContent className="p-4 py-6">
          <div className="flex items-center space-x-4">
            <UserAvatar
              name={session?.user?.name || ""}
              photoUrl={session?.user?.image || ""}
            />
            <div className="text-muted-foreground text-md">
              Escribe tu post aquí...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
