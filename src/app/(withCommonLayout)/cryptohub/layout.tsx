"use client";
import React, { ReactNode } from "react";
import { FaHashtag, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineDynamicFeed } from "react-icons/md";
import Link from "next/link";

interface CryptoLayoutProps {
  children: ReactNode;
}

export default function CryptoLayout({ children }: CryptoLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-[#0000004d] backdrop-blur-md">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white">Menu</h2>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            <Link
              href="/cryptohub/feed"
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-lg"
            >
              <MdOutlineDynamicFeed className="h-5 w-5 mr-3" />
              Feed
            </Link>
            <Link
              href="/cryptohub/myspot"
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-lg"
            >
              <FaUser className="h-5 w-5 mr-3" />
              My Spot
            </Link>
            <Link
              href="/cryptohub/notifications"
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-lg"
            >
              <IoMdNotifications className="h-5 w-5 mr-3" />
              Notifications
            </Link>
            <Link
              href="/cryptohub/cryptochat"
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-lg"
            >
              <FaHashtag className="h-5 w-5 mr-3" />
              CryptoChat
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0000004d] backdrop-blur-md">
          <nav className="flex justify-around p-4">
            <Link href="/cryptohub/feed" className="text-gray-300 hover:text-white">
              <MdOutlineDynamicFeed className="h-6 w-6" />
            </Link>
            <Link href="/cryptohub/myspot" className="text-gray-300 hover:text-white">
              <FaUser className="h-6 w-6" />
            </Link>
            <Link href="/cryptohub/notifications" className="text-gray-300 hover:text-white">
              <IoMdNotifications className="h-6 w-6" />
            </Link>
            <Link href="/cryptohub/cryptochat" className="text-gray-300 hover:text-white">
              <FaHashtag className="h-6 w-6" />
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}