import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="container-custom py-16 text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-sage-light rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <span className="font-serif text-3xl text-sage-dark text-center">
                  {product.name}
                </span>
              </div>
              {product.bestseller && (
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-medium px-3 py-1.5 rounded-full">
                  Bestseller
                </span>
              )}
              {product.originalPrice && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-medium px-3 py-1.5 rounded-full">
                  Sale
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="w-20 h-20 bg-sage-light/50 rounded-lg border-2 border-primary flex items-center justify-center"
                >
                  <span className="text-xs text-sage-dark">View {i}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <div className="mb-4">
              <Link
                to={`/shop?category=${product.category.toLowerCase()}`}
                className="text-sm text-primary hover:underline"
              >
                {product.category}
              </Link>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-medium text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Skin Types */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Suitable for:</p>
              <div className="flex flex-wrap gap-2">
                {product.skinTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 bg-sage-light text-sage-dark text-sm rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant={addedToCart ? "default" : "hero"}
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-t border-border pt-8">
              <div className="flex gap-6 border-b border-border mb-6">
                {(['description', 'ingredients', 'usage'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-muted-foreground leading-relaxed">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'ingredients' && (
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'usage' && (
                  <div className="space-y-4">
                    <p>Apply to clean, dry skin. For best results:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Cleanse your face thoroughly</li>
                      <li>Apply a small amount to fingertips</li>
                      <li>Gently massage into skin using upward motions</li>
                      <li>Allow to absorb before applying next product</li>
                      <li>Use morning and/or evening as directed</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
