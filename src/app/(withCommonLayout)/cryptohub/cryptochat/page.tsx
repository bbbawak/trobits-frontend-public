"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import TopicsCard from "@/components/Cryptohub/TopicsCard";
import { ITopicInfo } from "@/components/Cryptohub/Types";
import Loading from "@/components/Shared/Loading";
import { useGetAllTopicQuery } from "@/redux/features/api/topicApi";
import { Input } from "@/components/ui/input";

const CryptoChatPage = () => {
  const { data, isLoading: allTopicLoading } = useGetAllTopicQuery("");
  const [searchQuery, setSearchQuery] = useState("");

  const allTopics = data?.data || [];

  const filteredTopics = allTopics.filter((topic: ITopicInfo) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (allTopicLoading) return <Loading />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic: ITopicInfo) => (
          <TopicsCard key={topic.id} topicInfo={topic} />
        ))}
      </div>
    </div>
  );
};

export default CryptoChatPage;