"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/lib/store/auth-store";
import { signupSchema } from "@/lib/scheme/auth-scheme";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  interface SignupFormData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  }

  const onSubmit = async (data: SignupFormData) => {
    await signup(
      data.username,
      data.email,
      data.password,
      data.first_name,
      data.last_name,
      data.phone_number
    );
    console.log(error, "error from signup page");
    if (!error) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Username</label>
          <input
            {...register("username")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">First Name</label>
          <input
            {...register("first_name")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Last Name</label>
          <input
            {...register("last_name")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Phone Number</label>
          <input
            {...register("phone_number")}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
