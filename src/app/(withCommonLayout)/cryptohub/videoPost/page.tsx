/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useMemo, useState } from "react";
import { useGetAllVideoPostQuery } from "@/redux/features/api/postApi";
import Loading from "@/components/Shared/Loading";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/Post/PostCard";
import { Post } from "@/components/Cryptohub/TopicDetails";
import { useDebounce } from '@/hooks/useDebounce'

const VideoPostPage = () => {
  const { data: allVideoPost, isLoading: allVideoPostLoading } = useGetAllVideoPostQuery("");
  const allPosts: Post[] = allVideoPost?.data.length ? allVideoPost.data : [];
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useMemo(() => {
    const [debouncedValue, setDebouncedValue] = useState(searchQuery);
    setTimeout(() => setDebouncedValue(searchQuery), 500);
    return debouncedValue;
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(
      (post: Post) =>
        post.author.firstName
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        post.author.lastName
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [debouncedSearchQuery, allPosts]);

  if (allVideoPostLoading) return <Loading />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search video posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default VideoPostPage;
