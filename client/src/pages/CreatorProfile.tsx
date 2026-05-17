import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, Clock, DollarSign, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const creatorData = {
  id: 1,
  name: "Alex Chen",
  title: "AI Content Creator & Strategist",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  bio: "Specialized in AI-powered content generation with 5+ years of experience. I help brands create engaging, high-quality content at scale.",
  rating: 4.9,
  reviews: 128,
  hourlyRate: 75,
  projectRate: 1500,
  responseTime: "< 2 hours",
  isOnline: true,
  completedProjects: 342,
  totalEarnings: 45000,
  skills: ["Content Generation", "Video AI", "SEO Optimization", "Brand Strategy", "Social Media"],
  location: "San Francisco, CA",
  joinedDate: "2021-03-15",
  portfolio: [
    {
      id: 1,
      title: "E-commerce Product Descriptions",
      description: "Generated 500+ product descriptions for online store",
      image: "https://images.unsplash.com/photo-1460925895917-adf4e5a5e1e8?w=400&h=300&fit=crop",
      category: "Content Generation",
    },
    {
      id: 2,
      title: "Social Media Campaign",
      description: "Created viral social media content strategy",
      image: "https://images.unsplash.com/photo-1460925895917-adf4e5a5e1e8?w=400&h=300&fit=crop",
      category: "Social Media",
    },
    {
      id: 3,
      title: "Video Script Generation",
      description: "Wrote scripts for 20+ YouTube videos",
      image: "https://images.unsplash.com/photo-1460925895917-adf4e5a5e1e8?w=400&h=300&fit=crop",
      category: "Video",
    },
  ],
  reviews_list: [
    {
      id: 1,
      clientName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent work! Alex delivered high-quality content on time.",
      date: "2024-05-10",
    },
    {
      id: 2,
      clientName: "Michael Chen",
      rating: 5,
      comment: "Professional and responsive. Highly recommended!",
      date: "2024-04-28",
    },
    {
      id: 3,
      clientName: "Emma Davis",
      rating: 4,
      comment: "Great content, minor revisions needed but overall very good.",
      date: "2024-04-15",
    },
  ],
};

export default function CreatorProfile() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setLocation("/marketplace", { replace: true })}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img
                src={creatorData.avatar}
                alt={creatorData.name}
                className="w-32 h-32 rounded-full border-4 border-blue-600"
              />
              {creatorData.isOnline && (
                <div className="flex items-center gap-2 mt-4 text-green-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Online Now</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{creatorData.name}</h1>
              <p className="text-xl text-slate-600 mb-4">{creatorData.title}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(creatorData.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{creatorData.rating}</span>
                  <span className="text-slate-600">({creatorData.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5" />
                  <span>{creatorData.responseTime}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-5 h-5" />
                  <span>{creatorData.location}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">View Services</Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 w-full md:w-80">
              <h3 className="font-semibold text-slate-900 mb-4">Pricing</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Hourly Rate</p>
                  <p className="text-3xl font-bold text-slate-900">${creatorData.hourlyRate}</p>
                  <p className="text-xs text-slate-500">per hour</p>
                </div>
                <div className="border-t border-blue-200 pt-4">
                  <p className="text-sm text-slate-600">Project Rate</p>
                  <p className="text-2xl font-bold text-slate-900">${creatorData.projectRate}</p>
                  <p className="text-xs text-slate-500">starting price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 leading-relaxed">{creatorData.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-sm text-slate-600">Completed Projects</p>
                    <p className="text-2xl font-bold text-slate-900">{creatorData.completedProjects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-900">${(creatorData.totalEarnings / 1000).toFixed(1)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Member Since</p>
                    <p className="text-2xl font-bold text-slate-900">2021</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Response Rate</p>
                    <p className="text-2xl font-bold text-slate-900">100%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creatorData.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <CardContent className="pt-4">
                    <Badge className="mb-2">{item.category}</Badge>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {creatorData.skills.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {creatorData.reviews_list.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-slate-900">{review.clientName}</p>
                        <p className="text-sm text-slate-500">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
