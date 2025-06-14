/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { setUser } from "@/redux/features/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useLoginUserMutation,
  useVerifyOtpMutation,
} from "@/redux/features/api/authApi";
import AnimatedButton from "@/components/Shared/AnimatedButton";
import Link from "next/link";

interface ILoginInfo {
  email: string;
  password: string;
}

export default function Login() {
  const [loginMutation, { isLoading: loginLoading }] = useLoginUserMutation();
  const [verifyOtpMutation, { isLoading: verifyAccountLoading }] =
    useVerifyOtpMutation();
  const initialState: ILoginInfo = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState(initialState);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginLoadingToast = toast.loading("Logging in user...");
    try {
      const response = await loginMutation(loginInfo);

      if (
        response.error &&
        (response as { error: { data: { message: string } } }).error.data
      ) {
        const errorMessage = (
          response as { error: { data: { message: string } } }
        ).error.data.message;
        if (
          errorMessage ===
          "User not verified. Please check your email for OTP verification."
        ) {
          setShowOTPModal(true);
          toast.error(errorMessage);
          return;
        }
      }

      if (response.error) {
        const errorMessage =
          (response as { error: { data: { message: string } } }).error.data
            .message || "Something went wrong during login!";
        toast.error(errorMessage);
        return;
      }

      dispatch(setUser(response?.data?.data));
      router.push("/");
      toast.success("Successfully logged in!");
    } catch (error) {
    } finally {
      toast.dismiss(loginLoadingToast);
    }
  };

  const handleOtpVerify = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    setOtpLoading(true);
    try {
      const response = await verifyOtpMutation({ email: loginInfo.email, otp });
      if (response.error) {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.success("Email verified successfully!");
        setShowOTPModal(false);
        dispatch(setUser(response?.data?.data));
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong while verifying OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0000004d] p-4">
      <Card className="w-full max-w-md bg-[#ffffff1a] text-white border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {!showOTPModal ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginInfo.email}
                  onChange={handleValueChange}
                  className="bg-[#ffffff1a] border-none text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginInfo.password}
                  onChange={handleValueChange}
                  className="bg-[#ffffff1a] border-none text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <AnimatedButton loading={loginLoading} />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                maxLength={4}
                className="bg-[#ffffff1a] border-none text-white placeholder-gray-400"
              />
              <Button
                onClick={handleOtpVerify}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={otpLoading}
              >
                {otpLoading ? (
                  <AnimatedButton loading={otpLoading} />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/auth/register"
            className="text-sm text-gray-400 hover:text-white"
          >
            Don't have an account? Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
