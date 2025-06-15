"use client";

import { Suspense } from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

// Component containing the password reset OTP verification logic
function VerifyPasswordResetContent() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // phone number

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const verifyPasswordResetOTP = async () => {
    const otpValue = otp.join("");

    if (!token) {
      toast.error("Phone number not found. Please try again.");
      router.push("/auth/forgot-password");
      return;
    }

    try {
      setIsVerifying(true);

      const response = await fetch("/api/auth/verify-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: token, code: otpValue }),
      });

      const responseData = await response.json();
      if (!response.ok || responseData.status === 422) {
        setVerificationStatus("error");
        toast.error(responseData.detail || "Failed to verify OTP");
        return;
      }

      setVerificationStatus("success");
      toast.success("OTP verified successfully");

      const { reset_token } = responseData;
      setTimeout(() => {
        router.push(
          `/auth/reset-password?resetToken=${encodeURIComponent(reset_token)}`
        );
      }, 1000);
    } catch (error) {
      console.log("Error verifying password reset OTP:", error);
      setVerificationStatus("error");
      toast.error("Failed to verify OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const resendPasswordResetOTP = async () => {
    if (!token) {
      toast.error("Phone number not found. Please try again.");
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: token }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.detail || "Failed to resend OTP");
        return;
      }

      toast.success("Password reset OTP sent successfully");
      handleResendOTP();
    } catch (error) {
      console.error("Error resending password reset OTP:", error);
      toast.error("Failed to resend OTP");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.substring(0, 6).split("");
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;
    verifyPasswordResetOTP();
  };

  const handleResendOTP = () => {
    setOtp(Array(6).fill(""));
    setVerificationStatus("idle");
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const maskedPhoneNumber = token
    ? token.length > 4
      ? `****${token.slice(-4)}`
      : `****${token.slice(-2)}`
    : "****1234";

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="my-32">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <KeyRound className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Verify Reset Code
            </CardTitle>
            <CardDescription>
              {`We've sent a password reset code to your phone number ending in ${maskedPhoneNumber}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationStatus === "success" ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">
                  Verification Successful
                </AlertTitle>
                <AlertDescription className="text-green-700">
                  Your code has been verified. Redirecting to reset password...
                </AlertDescription>
              </Alert>
            ) : verificationStatus === "error" ? (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">
                  Verification Failed
                </AlertTitle>
                <AlertDescription className="text-red-700">
                  The code you entered is incorrect. Please try again.
                </AlertDescription>
              </Alert>
            ) : null}
            <div className="flex flex-col space-y-4">
              <label className="text-sm font-medium text-gray-700">
                Enter verification code
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-bold border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    autoFocus={index === 0}
                    disabled={isVerifying || verificationStatus === "success"}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">
                {"Didn't receive the code?"}
                {canResend ? (
                  <button
                    onClick={resendPasswordResetOTP}
                    className="text-purple-600 font-medium hover:text-purple-700 ml-1"
                    disabled={isVerifying}
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="ml-1">Resend in {timer} seconds</span>
                )}
              </p>
            </div>
          </CardContent>
          <CardFooter className="space-y-2">
            <Button
              onClick={handleVerify}
              disabled={
                otp.join("").length !== 6 ||
                isVerifying ||
                verificationStatus === "success"
              }
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </Button>
            <div className="flex justify-center w-full">
              <div className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4 text-gray-500" />
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Back to Forgot Password
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Page component with Suspense boundary
export default function VerifyPasswordResetPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <VerifyPasswordResetContent />
    </Suspense>
  );
}
