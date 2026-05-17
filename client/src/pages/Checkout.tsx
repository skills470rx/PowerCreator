import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const orderDetails = {
    creatorName: "Alex Chen",
    projectTitle: "Blog Content Creation - 10 Articles",
    amount: 750,
    description: "Create 10 high-quality blog articles for tech blog",
    dueDate: "2026-05-25",
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPaymentComplete(true);
    setIsProcessing(false);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
            <p className="text-slate-600 mb-6">Your order has been confirmed and the creator has been notified.</p>
            
            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-slate-600 mb-2">Order ID: #ORD-2026-5-001</p>
              <p className="text-sm text-slate-600 mb-2">Amount: ${orderDetails.amount}</p>
              <p className="text-sm text-slate-600">Status: Confirmed</p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setLocation("/orders", { replace: true })}
              >
                View My Orders
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setLocation("/", { replace: true })}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setLocation("/orders", { replace: true })}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        className="mt-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                      <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">Your payment information is secure and encrypted. We never store your full card details.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="space-y-4 mt-6">
                    <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                      <div>
                        <p className="text-sm text-slate-600">Bank Name</p>
                        <p className="font-semibold text-slate-900">First National Bank</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Account Number</p>
                        <p className="font-semibold text-slate-900">****1234</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Routing Number</p>
                        <p className="font-semibold text-slate-900">021000021</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Reference</p>
                        <p className="font-semibold text-slate-900">ORD-2026-5-001</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Please include the reference number in your bank transfer. Your order will be confirmed once we receive the payment.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Creator</p>
                    <p className="font-semibold text-slate-900">{orderDetails.creatorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Project</p>
                    <p className="font-semibold text-slate-900">{orderDetails.projectTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Due Date</p>
                    <p className="font-semibold text-slate-900">{new Date(orderDetails.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-600">Subtotal</p>
                    <p className="font-semibold text-slate-900">${orderDetails.amount}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-600">Platform Fee</p>
                    <p className="font-semibold text-slate-900">$15</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-slate-600">Tax</p>
                    <p className="font-semibold text-slate-900">$61.20</p>
                  </div>
                  <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                    <p className="font-semibold text-slate-900">Total</p>
                    <p className="text-2xl font-bold text-blue-600">${(orderDetails.amount + 15 + 61.20).toFixed(2)}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ${(orderDetails.amount + 15 + 61.20).toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center">By clicking Pay, you agree to our Terms of Service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
