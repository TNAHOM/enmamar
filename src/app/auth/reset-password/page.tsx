"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

// Constants
const MIN_PASSWORD_LENGTH = 6;
const RESET_PASSWORD_API_ENDPOINT = "/api/auth/reset-password";

// Types
interface ResetPasswordRequest {
  new_password: string;
  reset_token: string;
}

interface ResetPasswordResponse {
  detail: string;
  success?: boolean;
}

// Custom Hooks
const useResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validatePasswords = (): string | null => {
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const clearError = () => setErrorMsg(null);

  const resetForm = () => {
    setNewPassword("");
    setConfirmPassword("");
    setErrorMsg(null);
    setIsSubmitting(false);
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    setIsSubmitting,
    errorMsg,
    setErrorMsg,
    validatePasswords,
    clearError,
    resetForm,
  };
};

const useTokenValidation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("resetToken");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  return { token, isTokenValid: !!token };
};

// Services
class ResetPasswordService {
  static async resetPassword(
    newPassword: string,
    resetToken: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(RESET_PASSWORD_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_password: newPassword,
          reset_token: resetToken,
        } as ResetPasswordRequest),
      });

      const data: ResetPasswordResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to reset password.");
      }

      return {
        success: true,
        message: data.detail || "Password reset successfully",
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to reset password.";

      console.error("Reset password error:", error);
      return { success: false, message };
    }
  }
}

// Components
const ResetPasswordForm = ({
  onSubmit,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isSubmitting,
  errorMsg,
}: {
  onSubmit: (e: React.FormEvent) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  isSubmitting: boolean;
  errorMsg: string | null;
}) => {
  const isFormValid = newPassword && confirmPassword && !isSubmitting;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new_password">New Password</Label>
        <Input
          id="new_password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isSubmitting}
          className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          placeholder="Enter your new password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
          className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          placeholder="Confirm your new password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          autoComplete="new-password"
        />
      </div>

      {errorMsg && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
};

const ResetPasswordCard = () => {
  const router = useRouter();
  const { token, isTokenValid } = useTokenValidation();
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    setIsSubmitting,
    errorMsg,
    setErrorMsg,
    validatePasswords,
    clearError,
  } = useResetPasswordForm();

  // Clear error when user starts typing
  useEffect(() => {
    if (errorMsg && (newPassword || confirmPassword)) {
      clearError();
    }
  }, [newPassword, confirmPassword, errorMsg, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !isTokenValid) {
      setErrorMsg("Invalid reset token.");
      return;
    }

    const validationError = validatePasswords();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await ResetPasswordService.resetPassword(
        newPassword,
        token
      );

      if (result.success) {
        toast.success(result.message);
        router.push("/auth/login");
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="bg-gray-50 flex flex-col items-center justify-center p-4 min-h-screen">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <KeyRound className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-4">
              The password reset link is invalid or has expired.
            </p>
            <Link href="/auth/forgot-password">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Request New Reset Link
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <KeyRound className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your new password below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ResetPasswordForm
              onSubmit={handleSubmit}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isSubmitting={isSubmitting}
              errorMsg={errorMsg}
            />
          </CardContent>

          <CardFooter className="flex justify-center">
            <Link
              href="/auth/login"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="bg-gray-50 flex flex-col items-center justify-center p-4 min-h-screen">
    <Card className="w-full max-w-md shadow-lg border-0">
      <CardContent className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </CardContent>
    </Card>
  </div>
);

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordCard />
    </Suspense>
  );
}
