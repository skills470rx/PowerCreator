import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Search, Filter } from "lucide-react";
import { useLocation } from "wouter";

const mockCreators = [
  {
    id: 1,
    name: "Alex Chen",
    title: "AI Content Creator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 4.9,
    reviews: 128,
    hourlyRate: 75,
    skills: ["Content Generation", "Video AI"],
    responseTime: "< 2 hours",
    isOnline: true,
    completedProjects: 342,
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    title: "AI Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    rating: 4.8,
    reviews: 95,
    hourlyRate: 85,
    skills: ["UI/UX Design", "Image Generation"],
    responseTime: "< 1 hour",
    isOnline: true,
    completedProjects: 267,
  },
  {
    id: 3,
    name: "James Wilson",
    title: "AI Consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 4.7,
    reviews: 82,
    hourlyRate: 120,
    skills: ["Strategy", "Business Analysis"],
    responseTime: "< 4 hours",
    isOnline: false,
    completedProjects: 189,
  },
];

export default function Marketplace() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 150]);

  const filteredCreators = mockCreators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = creator.hourlyRate >= priceRange[0] && creator.hourlyRate <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Discover AI Creators</h1>
          <p className="text-slate-600">Find the perfect creator for your project</p>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search creators..."
                className="pl-10 h-12 border-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-slate-600">
              Showing {filteredCreators.length} creators
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCreators.map((creator) => (
                <Card
                  key={creator.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200"
                  onClick={() => setLocation(`/creator/${creator.id}`, { replace: true })}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-lg">{creator.name}</CardTitle>
                          <CardDescription>{creator.title}</CardDescription>
                        </div>
                      </div>
                      {creator.isOnline && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(creator.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-900">{creator.rating}</span>
                      <span className="text-sm text-slate-600">({creator.reviews})</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {creator.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-slate-100">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                      <div className="text-center">
                        <div className="font-semibold">${creator.hourlyRate}</div>
                        <p className="text-xs text-slate-500">per hour</p>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-sm">{creator.responseTime}</div>
                        <p className="text-xs text-slate-500">response</p>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-slate-900">{creator.completedProjects}</div>
                        <p className="text-xs text-slate-500">projects</p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
