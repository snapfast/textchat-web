"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSignup called");
    setLoading(true);
    setError("");
    setSuccess("");

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Starting registration with data:", {
        username: signupForm.username,
        email: signupForm.email,
        full_name: signupForm.fullName,
        password: "[HIDDEN]",
      });

      // Use domain API directly
      const response = await fetch("https://api.pokee.in/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signupForm.username,
          email: signupForm.email,
          full_name: signupForm.fullName,
          password: signupForm.password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${data.error || "Registration failed"}`,
        );
      }

      // Show success message and redirect to login after 2 seconds
      setSuccess("Registration successful! Redirecting to login page...");
      setError("");

      setTimeout(() => {
        router.push(`/auth/login`);
      }, 2000);
    } catch (err: unknown) {
      console.error("Signup error details:", err);
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          `DEBUG: Network error - ${err.message}. Check console for details.`,
        );
      } else {
        setError(
          `DEBUG: ${err instanceof Error ? err.message : JSON.stringify(err)}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="text-sm text-green-600">{success}</div>
          </div>
        )}

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                minLength={3}
                maxLength={50}
                value={signupForm.username}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, username: e.target.value })
                }
                placeholder="Choose a username (3-50 characters)"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={signupForm.fullName}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, fullName: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                placeholder="Enter password (minimum 6 characters)"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={signupForm.confirmPassword}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
