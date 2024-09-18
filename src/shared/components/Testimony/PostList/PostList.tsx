"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

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
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        loadMorePosts();
      }
    }, options);

    observerRef.current = observer;

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMorePosts, isLoading]);

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
    <div id="scrollableDiv" style={{ height: "100%", overflow: "auto" }}>
      {posts.map((post) => (
        <VisibilityWrapper
          key={post.id}
          onVisibilityChange={(isVisible) => onPostVisible(post.id, isVisible)}
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
      {hasMore && (
        <div ref={loadingRef}>
          <Loading />
        </div>
      )}
      {!hasMore && <EndMessage />}
    </div>
  );
};

const VisibilityWrapper: React.FC<{
  children: React.ReactNode;
  onVisibilityChange: (isVisible: boolean) => void;
}> = ({ children, onVisibilityChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onVisibilityChange]);

  return <div ref={ref}>{children}</div>;
};

export default PostList;
