import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { products, categories, skinTypes, concerns } from '@/data/products';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const categoryFilter = searchParams.get('category') || '';
  const skinTypeFilter = searchParams.get('skinType') || '';
  const concernFilter = searchParams.get('concern') || '';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (categoryFilter && product.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
      if (skinTypeFilter && !product.skinTypes.includes(skinTypeFilter)) {
        return false;
      }
      if (concernFilter && !product.concerns.includes(concernFilter)) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, skinTypeFilter, concernFilter]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = categoryFilter || skinTypeFilter || concernFilter;

  return (
    <main className="pt-20 md:pt-24">
      {/* Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Shop All Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Science-backed skincare for sensitive, acne-prone, and combination skin. 
            Find your perfect routine.
          </p>
        </div>
      </section>

      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-lg text-foreground"
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24 space-y-8">
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}

              {/* Category Filter */}
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                      !categoryFilter
                        ? 'bg-sage-light text-primary font-medium'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={`block w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                        categoryFilter === cat.slug
                          ? 'bg-sage-light text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Type Filter */}
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Skin Type</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('skinType', '')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                      !skinTypeFilter
                        ? 'bg-sage-light text-primary font-medium'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    All Skin Types
                  </button>
                  {skinTypes.slice(1).map((type) => (
                    <button
                      key={type}
                      onClick={() => updateFilter('skinType', type)}
                      className={`block w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                        skinTypeFilter === type
                          ? 'bg-sage-light text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern Filter */}
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Skin Concern</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter('concern', '')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                      !concernFilter
                        ? 'bg-sage-light text-primary font-medium'
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    All Concerns
                  </button>
                  {concerns.map((concern) => (
                    <button
                      key={concern}
                      onClick={() => updateFilter('concern', concern)}
                      className={`block w-full text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                        concernFilter === concern
                          ? 'bg-sage-light text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No products match your current filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
