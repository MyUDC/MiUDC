import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { SearchUserResult } from "@/shared/components/SearchBar";

interface UserListProps {
  users: SearchUserResult[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="space-y-4 mb-8">
      {users.map((user) => (
        <Link href={`/user/${user.username}`} key={user.id}>
          <Card className="p-4 my-4 hover:bg-accent ">
            <div className="flex items-center space-x-4 p-4">
              <Avatar>
                <AvatarImage
                  src={user.image || undefined}
                  alt={user.name || ""}
                />
                <AvatarFallback>
                  {user.name?.charAt(0) || user.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
