import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/features/user/components/UserAvatar";
import { useSession } from "next-auth/react";

interface PostCardProps {
  onClick: () => void;
}

export function PostCard({ onClick }: PostCardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="my-4 px-4 sm:px-6 lg:px-8">
        <Card className="rounded-none w-full max-w-2xl mx-auto cursor-pointer hover:bg-accent/50 transition-colors border-x-0 shadow-none">
          <CardContent className="p-4 py-6 flex items-center space-x-4">
            <UserAvatar />
            <div className="w-full h-6 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="my-4 px-4 sm:px-6 lg:px-8">
      <Card
        className="rounded-none w-full max-w-2xl mx-auto cursor-pointer hover:bg-accent/50 transition-colors border-x-0 shadow-none"
        onClick={onClick}
      >
        <CardContent className="p-4 py-6">
          <div className="flex items-center space-x-4">
            <UserAvatar
              name={session?.user?.name || ""}
              photoUrl={session?.user?.image || ""}
            />
            <div className="text-muted-foreground text-sm">
              Escribe tu post aquí...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
