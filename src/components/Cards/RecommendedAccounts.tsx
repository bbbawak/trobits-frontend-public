"use client";
import React, { useState, useEffect } from "react";
import { Users, Search, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  useGetAllRecommendedUsersQuery,
  useToggleFollowMutation,
} from "@/redux/features/api/authApi";
import Loading from "../Shared/Loading";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/Cards/UserCard";

interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  profileImage?: string;
  coverImage?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  followers?: string[];
  role: "ADMIN" | "USER";
  refreshToken?: string;
}

const RecommendedAccounts = () => {
  const { data: allUsersData, isLoading: allUsersDataLoading } = useGetAllRecommendedUsersQuery("");
  const [toggleFollow, { isLoading: toggleFollowLoading }] = useToggleFollowMutation();
  const currentUser = useAppSelector((state) => state.auth.user);

  const [localUsers, setLocalUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (allUsersData?.data) {
      setLocalUsers(allUsersData.data);
      setFilteredUsers(allUsersData.data);
    }
  }, [allUsersData]);

  const debouncedSearch = debounce((term: string) => {
    const lower = term.toLowerCase();
    const filtered = localUsers.filter((user) =>
        `${user.firstName} ${user.lastName || ""}`.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  const handleFollow = async (followedId: string) => {
    if (!currentUser) return toast.error("Please login first!");

    const followerId = currentUser?.id;
    setLoadingUserId(followedId); // Set loading for specific user

    try {
      const response = await toggleFollow({ followerId, followedId });
      if (response?.error) {
        toast.error("Failed to follow user! Try again.");
        return;
      }

      const updateUsers = (users: IUser[]) =>
          users.map((user) =>
              user.id === followedId
                  ? {
                    ...user,
                    followers: user.followers?.includes(followerId)
                        ? user.followers.filter((id) => id !== followerId)
                        : [...(user.followers || []), followerId],
                  }
                  : user
          );

      setLocalUsers((prev) => updateUsers(prev));
      setFilteredUsers((prev) => updateUsers(prev));

      toast.success(
          filteredUsers.find(u => u.id === followedId)?.followers?.includes(followerId)
              ? "Unfollowed successfully!"
              : "Following successfully!"
      );
    } catch (error) {
      toast.error("Something went wrong! Try again.");
    } finally {
      setLoadingUserId(null); // Clear loading state
    }
  };

  if (allUsersDataLoading) return <Loading />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 bg-white/5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user: IUser) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedAccounts;