import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-2xl overflow-hidden product-card-hover border border-border/50"
    >
      {/* Image */}
      <div className="aspect-square bg-sage-light relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <span className="font-serif text-sage-dark text-lg font-medium">
              {product.name.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.bestseller && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
