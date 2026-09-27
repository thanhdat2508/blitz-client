import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/fetch-client";

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
  return fetchClient<PostsApiResponse>("/api/posts", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      tag: params.tag,
      status: params.status || "PUBLISHED",
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
