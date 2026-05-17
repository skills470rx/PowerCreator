import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const mockOrders = [
  {
    id: 1,
    creatorName: "Alex Chen",
    title: "Blog Content Creation - 10 Articles",
    description: "Create 10 high-quality blog articles for tech blog",
    status: "in-progress",
    price: 750,
    dueDate: "2026-05-25",
    createdDate: "2026-05-10",
    progress: 60,
  },
  {
    id: 2,
    creatorName: "Maria Rodriguez",
    title: "UI/UX Design for Landing Page",
    description: "Design mockups and prototypes for new landing page",
    status: "pending",
    price: 1500,
    dueDate: "2026-05-30",
    createdDate: "2026-05-15",
    progress: 0,
  },
  {
    id: 3,
    creatorName: "James Wilson",
    title: "Business Strategy Consultation",
    description: "3-hour consultation on AI integration strategy",
    status: "completed",
    price: 360,
    dueDate: "2026-05-08",
    createdDate: "2026-05-01",
    progress: 100,
  },
  {
    id: 4,
    creatorName: "Sophie Laurent",
    title: "Product Copy & Marketing Content",
    description: "Write compelling product descriptions and marketing copy",
    status: "cancelled",
    price: 500,
    dueDate: "2026-05-20",
    createdDate: "2026-05-12",
    progress: 20,
  },
];

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending", icon: AlertCircle },
  "in-progress": { color: "bg-blue-100 text-blue-800", label: "In Progress", icon: Clock },
  completed: { color: "bg-green-100 text-green-800", label: "Completed", icon: CheckCircle2 },
  cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled", icon: AlertCircle },
};

export default function Orders() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = selectedStatus === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Orders</h1>
          <p className="text-slate-600">Track and manage all your project orders</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: mockOrders.length, color: "bg-blue-50" },
            { label: "In Progress", value: mockOrders.filter(o => o.status === "in-progress").length, color: "bg-yellow-50" },
            { label: "Completed", value: mockOrders.filter(o => o.status === "completed").length, color: "bg-green-50" },
            { label: "Total Spent", value: `$${mockOrders.reduce((sum, o) => sum + o.price, 0)}`, color: "bg-purple-50" },
          ].map((stat, i) => (
            <Card key={i} className={`${stat.color} border-0`}>
              <CardContent className="pt-6">
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    {/* Order Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">{order.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{order.description}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-2">Creator: {order.creatorName}</p>
                    </div>

                    {/* Status & Price */}
                    <div className="space-y-3">
                      <div>
                        <Badge className={config.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {order.price}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(order.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Progress & Action */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Progress</span>
                          <span className="text-sm font-semibold text-slate-900">{order.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="pt-12 text-center">
              <p className="text-slate-600 text-lg mb-4">No orders found</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start a New Order
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
