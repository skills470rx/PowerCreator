import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Briefcase, DollarSign, Star, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const earningsData = [
  { month: "Jan", earnings: 1200 },
  { month: "Feb", earnings: 1800 },
  { month: "Mar", earnings: 2200 },
  { month: "Apr", earnings: 2800 },
  { month: "May", earnings: 3500 },
];

const incomingRequests = [
  { id: 1, client: "Tech Startup Inc", title: "Content Creation - 20 Articles", budget: 2000, urgency: "high" },
  { id: 2, client: "Marketing Agency", title: "Social Media Strategy", budget: 1500, urgency: "medium" },
  { id: 3, client: "E-commerce Store", title: "Product Descriptions", budget: 800, urgency: "low" },
];

const completedProjects = [
  { id: 1, client: "Design Studio", title: "Logo Design", earnings: 500, rating: 5 },
  { id: 2, client: "Content Hub", title: "Blog Articles", earnings: 1200, rating: 4.8 },
  { id: 3, client: "Marketing Co", title: "Email Campaigns", earnings: 800, rating: 5 },
];

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Creator Dashboard</h1>
              <p className="text-blue-100 mt-2">Manage your projects and track your earnings</p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <Briefcase className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earnings", value: "$9,500", icon: DollarSign, color: "bg-green-50" },
            { label: "Active Projects", value: "6", icon: Briefcase, color: "bg-blue-50" },
            { label: "Average Rating", value: "4.9★", icon: Star, color: "bg-yellow-50" },
            { label: "Response Time", value: "2.3 hrs", icon: Clock, color: "bg-purple-50" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className={`${stat.color} border-0`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Incoming Requests</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="completed">Completed Work</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Projects */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Your current ongoing work</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { client: "Tech Startup", project: "Content Creation", progress: 75, dueDate: "May 25" },
                    { client: "Marketing Agency", project: "Strategy Planning", progress: 40, dueDate: "May 30" },
                    { client: "E-commerce", project: "Product Descriptions", progress: 90, dueDate: "May 22" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{item.project}</p>
                        <p className="text-sm text-slate-600">{item.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 bg-slate-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-600">{item.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-slate-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-green-600">98%</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-600">Client Satisfaction</p>
                    <p className="text-2xl font-bold text-blue-600">4.9/5</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-slate-600">This Month Revenue</p>
                    <p className="text-2xl font-bold text-purple-600">$3,500</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Incoming Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Requests</CardTitle>
                <CardDescription>New project opportunities waiting for your response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incomingRequests.map((request) => (
                  <div key={request.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">{request.title}</h3>
                        <p className="text-sm text-slate-600">{request.client}</p>
                      </div>
                      <Badge
                        className={
                          request.urgency === "high"
                            ? "bg-red-100 text-red-800"
                            : request.urgency === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-slate-900">${request.budget}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Trend</CardTitle>
                <CardDescription>Your monthly earnings over the past 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Work Tab */}
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Projects</CardTitle>
                <CardDescription>Your successfully completed work and client feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">{project.title}</h3>
                        <p className="text-sm text-slate-600">{project.client}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-slate-900">{project.rating}</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-600">${project.earnings}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
