import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Send } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    creatorName: "Alex Chen",
    clientName: "Tech Startup Inc",
    rating: 5,
    title: "Excellent Work!",
    content: "Alex delivered outstanding blog content. Very professional and responsive to feedback. Highly recommended!",
    date: "2 weeks ago",
    helpful: 24,
  },
  {
    id: 2,
    creatorName: "Maria Rodriguez",
    clientName: "Design Studio",
    rating: 4.8,
    title: "Great Design Skills",
    content: "Maria created beautiful UI mockups. The design process was smooth and collaborative. Would work with her again.",
    date: "1 month ago",
    helpful: 18,
  },
  {
    id: 3,
    creatorName: "James Wilson",
    clientName: "Marketing Co",
    rating: 5,
    title: "Perfect Strategy Consultation",
    content: "James provided valuable insights for our business strategy. Very knowledgeable and professional.",
    date: "2 months ago",
    helpful: 12,
  },
];

export default function Reviews() {
  const [selectedCreator, setSelectedCreator] = useState("all");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");

  const filteredReviews = selectedCreator === "all" 
    ? mockReviews 
    : mockReviews.filter(r => r.creatorName === selectedCreator);

  const handleSubmitReview = () => {
    if (reviewText.trim() && reviewTitle.trim()) {
      // Handle review submission
      setReviewText("");
      setReviewTitle("");
      setRating(5);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Reviews & Ratings</h1>
          <p className="text-slate-600">Share your experience and help other clients find great creators</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Write Review */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>Share your experience with a creator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Summarize your experience"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-900 block mb-2">Your Review</label>
                  <Textarea
                    placeholder="Tell us about your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="min-h-32 border-slate-300"
                  />
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmitReview}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter */}
            <Card>
              <CardHeader>
                <CardTitle>All Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCreator} onValueChange={setSelectedCreator}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Alex Chen">Alex Chen</TabsTrigger>
                    <TabsTrigger value="Maria Rodriguez">Maria</TabsTrigger>
                    <TabsTrigger value="James Wilson">James</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews */}
            {filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{review.creatorName}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(review.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{review.rating}</span>
                      </div>
                      <p className="text-sm text-slate-600">by {review.clientName}</p>
                    </div>
                    <span className="text-xs text-slate-500">{review.date}</span>
                  </div>

                  <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
                  <p className="text-slate-600 mb-4">{review.content}</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      Reply
                    </button>
                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600">
                      <Star className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
