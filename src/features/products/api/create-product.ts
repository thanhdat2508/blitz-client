import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateProductDTO, Product } from '../types/product'
import { productKeys } from './get-products'

export async function createProduct(payload: CreateProductDTO): Promise<Product> {
  // Demo mock creation
  return {
    id: Date.now(),
    title: payload.title,
    price: payload.price,
    description: payload.description,
    category: payload.category,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
  }
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      // Optimistic update hoặc invalidation cache
      queryClient.setQueryData<Product[]>(productKeys.lists(), (old = []) => [newProduct, ...old])
    },
  })
}
