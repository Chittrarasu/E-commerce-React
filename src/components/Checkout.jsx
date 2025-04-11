import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Updated to ./ui/card
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Collect checkout details
    const checkoutDetails = {
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      items: cart.map((item) => ({ name: item.title, price: item.price })),
      totalPrice: totalPrice.toFixed(2),
    };

    // Display details in an alert (for demo purposes)
    alert(
      `Checkout Details:\n\nEmail: ${data.email}\nPhone: ${
        data.phoneNumber
      }\nAddress: ${data.address}\nItems: ${cart
        .map((item) => `${item.title} - $${item.price}`)
        .join("\n")}\nTotal: $${totalPrice.toFixed(2)}`
    );

    // Clear cart and navigate back to home
    clearCart();
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Checkout
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-xl font-semibold text-gray-900 text-right">
                  Total:{" "}
                  <span className="text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Form Fields */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          required
                          className="h-24"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <Button
                  type="button"
                  onClick={handleGoBack}
                  className="mt-4 w-full bg-gray-400 text-white hover:bg-gray-500"
                >
                  Go Back
                </Button>
                <Button
                  type="submit"
                  className="mt-2 w-full bg-green-500 text-white hover:bg-green-600"
                >
                  Proceed to Pay
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
