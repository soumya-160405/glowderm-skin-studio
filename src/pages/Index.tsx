import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import heroBg from '@/assets/hero-bg.jpg';

const testimonials = [
  {
    name: "Sarah M.",
    text: "My skin has never looked better! The Niacinamide serum completely transformed my acne-prone skin.",
    rating: 5,
    skinType: "Oily, Acne-prone"
  },
  {
    name: "Emily R.",
    text: "Finally found products that don't irritate my sensitive skin. The Ceramide cream is my holy grail!",
    rating: 5,
    skinType: "Sensitive, Dry"
  },
  {
    name: "Jessica L.",
    text: "The SPF is invisible and works beautifully under makeup. I've repurchased 3 times already!",
    rating: 5,
    skinType: "Combination"
  },
];

const Index: React.FC = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <main className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Botanical background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light text-sage-dark rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Dermatologist-Approved Skincare
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
              Your Skin Deserves
              <span className="block text-primary">Science-Backed Care</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Gentle, effective formulas designed for sensitive, acne-prone, and combination skin. 
              Because healthy skin is beautiful skin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/shop">Take Skin Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Dermatologist Tested", desc: "Clinically tested for sensitive skin" },
              { icon: Leaf, title: "Clean Ingredients", desc: "No parabens, sulfates, or harsh chemicals" },
              { icon: Sparkles, title: "Science-Backed", desc: "Formulated with proven active ingredients" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Bestsellers & Favorites
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most-loved products, chosen by thousands of happy customers with sensitive skin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Find the perfect products for your skincare routine.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-sage-light hover-lift"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-sage-dark mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-sage-dark/70 hidden md:block">
                    {category.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Real results from real people with sensitive skin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl border border-border hover-lift"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.skinType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              Join the GlowDerm Family
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscribe for exclusive offers, skincare tips, and early access to new products.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="accent" size="lg">
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-primary-foreground/60 mt-4">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
