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
import { ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Component containing the original logic
function OTPVerificationContent() {
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
  const token = searchParams.get("token");

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

  const verifyOtp = async () => {
    const otpValue = otp.join("");
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: token, code: otpValue }),
      });

      if (!response.ok) {
        toast.error("Failed to send OTP");
        return;
      }

      const { data } = await response.json();
      router.push(`/auth/login`);
      console.log("Verified successfully", data);
      toast.success("OTP verified successfully");
    } catch (error) {
      console.log("Error sending OTP:", error);
      toast.error("Failed to send OTP");
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
    setIsVerifying(true);
    verifyOtp();
    setTimeout(() => {
      if (otpValue === "123456") {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtp(Array(6).fill(""));
    setVerificationStatus("idle");
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="my-32">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              OTP Verification
            </CardTitle>
            <CardDescription>
              {
                "We've sent a verification code to your phone number ending in ****1234"
              }
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
                  Your account has been successfully verified.
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
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">
                {"Didn't receive the code?"}
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    className="text-purple-600 font-medium hover:text-purple-700"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span>Resend in {timer} seconds</span>
                )}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || isVerifying}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>For demo purposes, the correct OTP is: 123456</p>
        </div>
      </div>
    </div>
  );
}

// Page component with Suspense boundary
export default function OTPVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <OTPVerificationContent />
    </Suspense>
  );
}
