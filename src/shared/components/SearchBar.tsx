"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerticalCareerList from "@/features/career-catalog/components/VerticalCareerList";
import PostList from "@/shared/components/Testimony/PostList/PostList";
import UserList from "@/shared/components/User/UserList";
import { PostWithRelations } from "@/shared/types/PostWithRelations";

import getCareers from "@/shared/actions/Careers/getCareersNames";
import { searchUsers } from "@/shared/actions/User/searchUsers";
import { searchPosts } from "@/shared/actions/Post/searchPosts";

import { Card } from "@/components/ui/card";

export type SearchCareerResult = {
  id: string;
  name: string;
  slug: string;
  semesters: number;
  faculty: {
    id: string;
    name: string;
  };
  tags ?: string[];
};

export type SearchUserResult = {
  id: string;
  name: string | null;
  username: string;
  image: string | null;
};

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [careers, setCareers] = useState<SearchCareerResult[]>([]);
  const [users, setUsers] = useState<SearchUserResult[]>([]);
  const [posts, setPosts] = useState<PostWithRelations[]>([]);
  const [activeTab, setActiveTab] = useState("careers");

  const searchCareers = useCallback(async () => {
    const allCareers = await getCareers();
    const filteredCareers = allCareers
      .filter((career) =>
        career.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((career) => ({
        id: career.id,
        name: career.name,
        slug: career.slug,
        semesters: career.semesters,
        faculty: {
          id: career.faculty.id,
          name: career.faculty.name,
        },
      }));
    setCareers(filteredCareers);
  }, [searchTerm]);

  const searchUsersData = useCallback(async () => {
    const results = await searchUsers(searchTerm);
    setUsers(results);
  }, [searchTerm]);

  const searchPostsData = useCallback(async () => {
    const results = await searchPosts(searchTerm);
    setPosts(results);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      searchCareers();
      searchUsersData();
      searchPostsData();
    }
  }, [searchTerm, searchCareers, searchUsersData, searchPostsData]);

  const getPlaceholder = () => {
    switch (activeTab) {
      case "careers":
        return "Nombre de la carrera";
      case "users":
        return "Nombre de usuario";
      case "posts":
        return "Título o contenido del post";
      default:
        return "Buscar";
    }
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setActiveTab("careers");
      setSearchTerm("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-14 justify-start text-left font-normal rounded-full"
        >
          <Search className="mr-2 h-4 w-4 text-green" />
          <span className="text-md">Buscar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="w-full h-full flex justify-center items-center"
      >
        <Card className="flex flex-col h-full max-w-2xl w-svw p-4 mt-16">
          <div className="px-2">
            <Input
              placeholder={getPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 h-14 rounded-full text-black placeholder:text-gray-500"
            />
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-grow overflow-hidden"
          >
            <TabsList>
              <TabsTrigger value="careers">Carreras</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="careers" className="h-full overflow-auto">
              <VerticalCareerList careers={careers} />
            </TabsContent>
            <TabsContent value="users" className="h-full overflow-auto">
              <UserList users={users} />
            </TabsContent>
            <TabsContent value="posts" className="h-full overflow-auto">
              <PostList initPosts={posts} paginateHandler={async () => []} />
            </TabsContent>
          </Tabs>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;
