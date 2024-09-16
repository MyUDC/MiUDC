"use client";
import { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostWithRelations } from "@/shared/types/PostWithRelations";
import { EndMessage } from "./EndMessage";
import { Loading } from "./Loading";
import Post from "../Post";

interface Props {
  paginateHandler: (take: number, skip: number) => Promise<PostWithRelations[]>;
  initPosts: PostWithRelations[];
}

export const PostList = ({ initPosts, paginateHandler }: Props) => {
  const [posts, setPosts] = useState<PostWithRelations[]>(initPosts);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newPosts = await paginateHandler(4, posts.length);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [posts.length, paginateHandler, isLoading]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={<Loading />}
      endMessage={hasMore ? null : <EndMessage />}
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          postType={post.type}
          postSlug={post.slug}
          postTitle={post.title}
          content={post.content}
          userPhotoUrl={post.author.image ?? ""}
          userName={post.author.username ?? "no name"}
          email={post.author.username}
          careerName={post.career.name}
          careerSlug={post.career.slug}
          repliesCount={post._count.children}
          heartCount={post._count.PostLike}
          imageUrls={post.images.map(({ url }) => url)}
          createdAt={post.createdAt}
        />
      ))}
    </InfiniteScroll>
  );
};
