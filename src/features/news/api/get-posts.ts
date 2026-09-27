import { useQuery } from "@tanstack/react-query";
import { ENV } from "@/config/env";

export interface PostAuthor {
  id: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
}

export interface PostTagItem {
  id: string;
  name: string;
  slug: string;
}

export interface PostApiItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  coverImageUrl?: string;
  blurHash?: string;
  author?: PostAuthor;
  tags?: Array<{ tag: PostTagItem }>;
  createdAt: string;
  updatedAt: string;
}

export interface PostsApiResponse {
  message: string;
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
}

export const postKeys = {
  all: ["posts"] as const,
  list: (params: GetPostsParams) => [...postKeys.all, params] as const,
  detail: (slug: string) => [...postKeys.all, "detail", slug] as const,
};

export async function getPosts(params: GetPostsParams = {}): Promise<PostsApiResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search) searchParams.set("search", params.search);
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.status) searchParams.set("status", params.status);

  const queryString = searchParams.toString();
  const endpoint = `/api/posts${queryString ? `?${queryString}` : ""}`;
  const url =
    typeof window !== "undefined" ? endpoint : `${ENV.BACKEND_URL}${endpoint}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function usePosts(params: GetPostsParams = {}) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => getPosts(params),
    staleTime: 1000 * 60 * 3,
  });
}
