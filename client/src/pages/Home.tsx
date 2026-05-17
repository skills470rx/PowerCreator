import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Users, TrendingUp, Search, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const handleExplore = () => {
    if (isAuthenticated) {
      setLocation("/marketplace", { replace: true });
    } else {
      window.location.href = getLoginUrl("/marketplace");
    }
  };

  const handleBecomeCreator = () => {
    if (isAuthenticated) {
      setLocation("/creator-onboarding", { replace: true });
    } else {
      window.location.href = getLoginUrl("/creator-onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PowerCreator
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => setLocation("/marketplace", { replace: true })}>
                  Marketplace
                </Button>
                <Button variant="ghost" onClick={() => setLocation("/dashboard", { replace: true })}>
                  Dashboard
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={() => (window.location.href = getLoginUrl())}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100">
                Welcome to the Future of AI Talent
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Connect with Elite AI Creators
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Discover, collaborate, and work with the world's most talented AI creators. From content generation to custom AI solutions, find the perfect creator for your project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                onClick={handleExplore}
              >
                Explore Creators
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 hover:bg-slate-50"
                onClick={handleBecomeCreator}
              >
                Become a Creator
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-600">AI Creators</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">2K+</p>
                <p className="text-sm text-slate-600">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">4.9★</p>
                <p className="text-sm text-slate-600">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200/50 shadow-xl">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-200 rounded w-24"></div>
                      <div className="h-2 bg-slate-100 rounded w-32 mt-1"></div>
                    </div>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose PowerCreator?</h2>
            <p className="text-xl text-slate-300">Everything you need to find and hire top AI talent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Vetted Creators",
                description: "All creators are verified and rated by the community. Find trusted professionals.",
              },
              {
                icon: TrendingUp,
                title: "Real-time Tracking",
                description: "Monitor your projects in real-time with detailed progress updates and timelines.",
              },
              {
                icon: Zap,
                title: "Instant Communication",
                description: "Chat directly with creators, discuss requirements, and collaborate seamlessly.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-xl text-slate-600">Get started in just a few simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Browse", desc: "Explore our curated collection of AI creators" },
            { step: "2", title: "Connect", desc: "Message creators and discuss your project" },
            { step: "3", title: "Collaborate", desc: "Work together with real-time updates" },
            { step: "4", title: "Pay & Review", desc: "Secure payment and leave honest reviews" },
          ].map((item, i) => (
            <div key={i} className="relative">
              {i < 3 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              )}
              <Card className="border-2 border-slate-200 hover:border-blue-400 transition-colors">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Find Your Perfect AI Creator?</h2>
          <p className="text-xl text-blue-100">Join thousands of clients who have found top talent on PowerCreator</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 font-semibold"
              onClick={handleExplore}
            >
              Start Exploring
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={handleBecomeCreator}
            >
              Become a Creator
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">PowerCreator</h3>
              <p className="text-sm">The marketplace for elite AI creators</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Browse Creators</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Creators</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Join as Creator</a></li>
                <li><a href="#" className="hover:text-white transition">Creator Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Earnings</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 PowerCreator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
