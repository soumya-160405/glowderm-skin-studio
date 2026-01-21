import React, { useState } from 'react';
import { Star, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const feedbackSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comments: z.string().min(10, 'Please provide at least 10 characters of feedback').max(1000, 'Feedback is too long'),
});

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState<{ rating?: string; comments?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      feedbackSchema.parse({ rating, comments });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: typeof errors = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof typeof errors] = error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="pt-20 md:pt-24 min-h-screen flex items-center">
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your feedback helps us improve and serve you better. 
              We truly appreciate you taking the time to share your thoughts.
            </p>
            <Button variant="outline" onClick={() => {
              setIsSubmitted(false);
              setRating(0);
              setComments('');
            }}>
              Submit Another Feedback
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24">
      {/* Header */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container-custom text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Share Your Feedback
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear about your experience with GlowDerm products. 
            Your feedback helps us create better skincare for you.
          </p>
        </div>
      </section>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  How would you rate your overall experience?
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-2 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          value <= (hoveredRating || rating)
                            ? 'fill-accent text-accent'
                            : 'text-border'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </p>
                )}
                {errors.rating && (
                  <p className="mt-2 text-sm text-destructive text-center">{errors.rating}</p>
                )}
              </div>

              {/* Comments */}
              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
                  Tell us more about your experience
                </label>
                <textarea
                  id="comments"
                  rows={6}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    errors.comments ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="What did you like? What could we improve? Share your thoughts..."
                />
                {errors.comments && (
                  <p className="mt-1 text-sm text-destructive">{errors.comments}</p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {comments.length}/1000 characters
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Feedback'}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feedback;
