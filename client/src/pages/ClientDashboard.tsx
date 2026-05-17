import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { MessageSquare, Zap, TrendingUp, Calendar, Clock, AlertCircle } from "lucide-react";

const chartData = [
  { month: "Jan", spent: 400, orders: 2 },
  { month: "Feb", spent: 600, orders: 3 },
  { month: "Mar", spent: 800, orders: 4 },
  { month: "Apr", spent: 1200, orders: 5 },
  { month: "May", spent: 1500, orders: 6 },
];

const recentActivity = [
  { id: 1, type: "order_completed", creator: "Alex Chen", title: "Blog Content Created", date: "2 hours ago" },
  { id: 2, type: "message", creator: "Maria Rodriguez", title: "Sent you a message", date: "5 hours ago" },
  { id: 3, type: "order_started", creator: "James Wilson", title: "Started working on your project", date: "1 day ago" },
  { id: 4, type: "review_request", creator: "Sophie Laurent", title: "Requested your feedback", date: "2 days ago" },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600 mt-2">Welcome back! Here's your project overview</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Zap className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Projects", value: "6", icon: Zap, color: "bg-blue-50" },
            { label: "Total Spent", value: "$4,500", icon: TrendingUp, color: "bg-green-50" },
            { label: "Pending Reviews", value: "3", icon: AlertCircle, color: "bg-yellow-50" },
            { label: "Messages", value: "12", icon: MessageSquare, color: "bg-purple-50" },
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending Trends</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Projects */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Your ongoing work with creators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { creator: "Alex Chen", project: "Blog Content", progress: 60, status: "in-progress" },
                    { creator: "Maria Rodriguez", project: "UI Design", progress: 30, status: "pending" },
                    { creator: "James Wilson", project: "Strategy", progress: 100, status: "completed" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{item.project}</p>
                        <p className="text-sm text-slate-600">{item.creator}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 bg-slate-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <Badge variant="outline">{item.status}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-blue-600">2.5 hrs</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-slate-600">Satisfaction Rate</p>
                    <p className="text-2xl font-bold text-green-600">98%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-slate-600">Total Creators</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Spending Trends Tab */}
          <TabsContent value="spending">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Your spending and project count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="spent" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{activity.title}</p>
                        <p className="text-sm text-slate-600">{activity.creator}</p>
                      </div>
                      <p className="text-xs text-slate-500">{activity.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
