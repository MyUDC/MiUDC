"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";

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
  const pathname = usePathname();
  const [visiblePosts, setVisiblePosts] = useState<Set<string>>(new Set());

  const { ref: lastPostRef, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setPosts(initPosts);
    setHasMore(true);
    setVisiblePosts(new Set());
  }, [initPosts, pathname]);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

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
  }, [posts.length, paginateHandler, isLoading, hasMore]);

  useEffect(() => {
    if (inView && !isLoading) {
      loadMorePosts();
    }
  }, [inView, loadMorePosts, isLoading]);

  const onPostVisible = useCallback((postId: string, isVisible: boolean) => {
    setVisiblePosts((prev) => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(postId);
      } else {
        newSet.delete(postId);
      }
      return newSet;
    });
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={<Loading />}
      endMessage={<EndMessage />}
      scrollableTarget="scrollableDiv"
    >
      {posts.map((post, index) => (
        <VisibilityWrapper
          key={post.id}
          onVisibilityChange={(isVisible) => onPostVisible(post.id, isVisible)}
          useLastPostRef={index === posts.length - 1 ? lastPostRef : undefined}
        >
          <Post
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
        </VisibilityWrapper>
      ))}
    </InfiniteScroll>
  );
};

const VisibilityWrapper: React.FC<{
  children: React.ReactNode;
  onVisibilityChange: (isVisible: boolean) => void;
  useLastPostRef?: (node?: Element | null) => void;
}> = ({ children, onVisibilityChange, useLastPostRef }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    onVisibilityChange(inView);
  }, [inView, onVisibilityChange]);

  return <div ref={useLastPostRef || ref}>{children}</div>;
};

export default PostList;
