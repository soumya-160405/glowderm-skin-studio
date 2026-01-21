import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
