import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Product } from '../types/product'

// Query keys factory - Best practice của TanStack Query
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products?limit=8')
  return data
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 phút
  })
}
