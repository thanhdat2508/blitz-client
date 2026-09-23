import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square w-full bg-white p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <Badge variant="secondary" className="absolute top-2 left-2 text-[10px] capitalize">
          {product.category}
        </Badge>
      </div>

      <CardHeader className="flex-1 pb-2">
        <CardTitle className="text-base font-semibold line-clamp-2 leading-snug">
          {product.title}
        </CardTitle>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <div className="text-lg font-bold text-primary">
          {formatCurrency(product.price * 25000, 'VND')}
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t-0 bg-transparent">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  )
}
