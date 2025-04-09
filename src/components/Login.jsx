import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form"; // Import from react-hook-form

export default function Login() {
  const { login, signUp } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const action = isSignUp ? signUp : login;
    if (await action(data.email, data.password)) {
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSignUp ? "Sign Up" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isSignUp ? "Sign Up" : "Login"}
              </Button>
              <p className="text-center text-sm text-gray-600 mt-4">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {isSignUp ? "Login" : "Sign up"}
                </button>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
