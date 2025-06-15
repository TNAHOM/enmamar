"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Validation schema for forgot password form
const forgotPasswordSchema = z.object({
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+2519\d{8}|09\d{8})$/,
      "Phone number must be in format 09XXXXXXXX or +2519XXXXXXXX"
    ),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const sendPasswordResetOTP = async (phone_number: string) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.detail || "Failed to send password reset OTP");
        return false;
      }

      toast.success("Password reset OTP sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending password reset OTP:", error);
      toast.error("Failed to send password reset OTP");
      return false;
    }
  };

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const success = await sendPasswordResetOTP(data.phone_number);

      if (success) {
        // Redirect to OTP verification page with phone number as token
        router.push(
          `/auth/forgot-password/verify?token=${encodeURIComponent(
            data.phone_number
          )}`
        );
      }
    } finally {
      setIsLoading(false);
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
                <KeyRound className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
            <CardDescription>
              {"Enter your phone number and we'll send you a verification code to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  placeholder="09XXXXXXXX or +2519XXXXXXXX"
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? "Sending..." : "Send Reset Code"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4 text-gray-500" />
              <Link
                href="/auth/login"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
