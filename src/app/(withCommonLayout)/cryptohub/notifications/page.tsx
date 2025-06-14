"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheck,
  Heart,
  MessageCircle,
  MoreVertical,
  Bell,
} from "lucide-react";
import socket from "@/redux/features/api/socketClient";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoNotificationsCircle } from "react-icons/io5";
import { useGetNotificationByUseridQuery } from "@/redux/features/api/authApi";
import Loading from "@/components/Shared/Loading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setPaths } from "@/redux/features/slices/authSlice";
import { format } from "date-fns";

// Define types for notifications
type Notification = {
  id: string;
  senderId: string;
  message: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  timestamp: string;
  postId?: string;
  category?: string;
  createdAt: string;
  isRead: boolean;
};

const LoginPrompt = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#0000004d] rounded-lg p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-4">Login to View Notifications</h2>
    <p className="text-gray-300 mb-6">Stay updated with your latest notifications by logging in.</p>
    <Link 
      href="/auth/login"
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Login Now
    </Link>
  </div>
);

export default function NotificationPage() {
  const { data: notificationsData } = useGetNotificationByUseridQuery("");
  const [visibleCount, setVisibleCount] = useState(5);

  const notifications = notificationsData?.data || [];

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="min-h-screen bg-[#0000004d] p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Notifications</h1>
        <div className="space-y-4">
          {notifications.slice(0, visibleCount).map((notification: Notification) => (
            <div
              key={notification.id}
              className={`bg-[#ffffff1a] p-4 rounded-lg ${
                !notification.isRead ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <p className="text-white">{notification.message}</p>
              <p className="text-gray-400 text-sm mt-2">
                {new Date(notification.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        {visibleCount < notifications.length && (
          <button
            onClick={handleShowMore}
            className="mt-4 w-full p-3 bg-[#ffffff1a] text-white rounded-lg hover:bg-[#ffffff33]"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

// Existing NotificationCard component
const NotificationCard = ({ notification }: { notification: Notification }) => {
  return (
    <Card className="bg-transparent border-cyan-400/30 p-4">
      <div className="flex">
        <Avatar />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1">
            <h1 className="text-white">
              <IoNotificationsCircle className="size-10 mr-3" />
            </h1>
            {notification.type === "LIKE" && (
              <div className=" flex justify-between w-full items-center gap-3">
                <div className=" flex gap-2 items-center">
                  <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                  <p className="text-gray-400">{notification?.message}</p>
                </div>
                <Link
                  href={`/cryptohub/userProfile/${notification?.senderId}`}
                  className=" px-2 py-2 rounded-md hover:bg-cyan-500 shadow-white transition-all font-sans bg-cyan-700 text-white"
                >
                  Visit Profile
                </Link>
              </div>
            )}
            {notification.type === "COMMENT" && (
              <div className=" flex justify-between w-full items-center gap-3">
                <div className=" flex gap-2 items-center">
                  <MessageCircle className="h-5 w-5 text-cyan-400" />
                  <p className="text-gray-400">{notification?.message}</p>
                </div>
                <Link
                  href={`/cryptohub/userProfile/${notification?.senderId}`}
                  className=" px-2 py-2 rounded-md hover:bg-cyan-500 shadow-white transition-all font-sans bg-cyan-700 text-white"
                >
                  Visit Profile
                </Link>
              </div>
            )}
            {notification.type === "FOLLOW" && (
              <div className=" flex justify-between w-full items-center gap-3">
                <div className=" flex gap-2 items-center">
                  <BadgeCheck className="h-4 w-4 fill-blue-400 text-white" />
                  <p className="text-gray-400">{notification?.message}</p>
                </div>
                <Link
                  href={`/cryptohub/userProfile/${notification?.senderId}`}
                  className=" px-2 py-2 rounded-md hover:bg-cyan-500 shadow-white transition-all font-sans bg-cyan-700 text-white"
                >
                  Visit Profile
                </Link>
              </div>
            )}
          </div>
          {notification.postId && (
            <div className="mt-4 flex justify-end">
              <Link
                href={`/cryptohub/cryptochat/${notification?.id}/${notification?.postId}`}
                className="px-3 py-2 text-sm font-medium rounded-md shadow-md bg-indigo-600 hover:bg-indigo-500 text-white transition-all"
              >
                See Post
              </Link>
            </div>
          )}
          <p className="text-xs text-gray-500">{notification.timestamp}</p>
        </div>
      </div>
    </Card>
  );
};
