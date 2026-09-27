import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/fetch-client";

export interface PostAuthor {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatarUrl?: string;
}

export interface PostTagItem {
  id?: string;
  name?: string;
  slug?: string;
  postsCount?: number;
  tag?: {
    id?: string;
    name?: string;
    slug?: string;
  };
}

export interface PostApiItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  coverImageUrl?: string | null;
  blurHash?: string | null;
  readingTime?: number;
  url?: string;
  author?: PostAuthor;
  tags?: PostTagItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PostsApiResponse {
  message?: string;
  items: PostApiItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  status?: string;
  authorId?: string;
}

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: GetPostsParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (slug: string) => [...postKeys.details(), slug] as const,
};

export async function getPosts(params: GetPostsParams = {}): Promise<PostsApiResponse> {
  return fetchClient<PostsApiResponse>("/api/posts", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search?.trim() || undefined,
      tag: params.tag && params.tag !== "all" ? params.tag : undefined,
      status: params.status || "PUBLISHED",
      authorId: params.authorId,
    },
  });
}

export function usePosts(params: GetPostsParams = {}) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => getPosts(params),
    staleTime: 1000 * 60 * 3,
  });
}

export async function getPostBySlug(slug: string): Promise<PostApiItem> {
  const res = await fetchClient<{ message?: string; data: PostApiItem }>(`/api/posts/${slug}`);
  return res.data;
}

export function usePostDetail(slug: string | undefined) {
  return useQuery({
    queryKey: postKeys.detail(slug || ""),
    queryFn: () => getPostBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}
