"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/lib/store/auth-store";
import { signupSchema } from "@/lib/scheme/auth-scheme";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignupFormData } from "@/types/user";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const sendOtp = async (phone_number: string) => {
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phone_number }),
      });

      if (!response.ok) {
        toast.error("Failed to send OTP");
        return;
      }

      const { data } = await response.json();
      router.push(
        `/auth/otp/verify?token=${encodeURIComponent(data.phone_number)}`
      );

      console.log("OTP sent successfully:", data);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.log("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    await signup({ ...data, role: "user" });

    if (!/^(\+2519\d{8}|09\d{8})$/.test(data.phone_number)) {
      toast.error("Invalid phone format. Use 09XXXXXXXX or +2519XXXXXXXX");
      return;
    }
    console.log(error, "error signupstore");

    if (error) {
      console.log(error, "error signupstore");
    } else {
      sendOtp(data.phone_number);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="my-12 w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-purple-600">Enmamar</span>
          </Link>
        </div>

        <Card className="w-full shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  {...register("confirm_password")}
                  className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    {...register("first_name")}
                    className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    {...register("last_name")}
                    className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  {...register("phone_number")}
                  className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isLoading}
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
