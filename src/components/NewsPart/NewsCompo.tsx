"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetAllBlogsQuery } from "@/redux/features/api/articleApi";
import Loading from "@/components/Shared/Loading";
import { Article } from "@/app/(withCommonLayout)/articles/page";
import HomeNewsCard from "./HomeNewsCard";
import { AdBanner } from "@/components/AdBanner";

export default function NewsCompo() {
  const { data: allBlogsData, isLoading: allBlogsDataLoading } = useGetAllBlogsQuery([]);

  if (allBlogsDataLoading) {
    return <Loading />;
  }

  const allBlogs: Article[] = allBlogsData?.data || [];

  const adClasses = [
    "67b00b6de904d5920e690b84",
    "67b3b8a41b3a7f15c72fcc94",
    "67b3b9181b3a7f15c72fce5d",
    "67b3b9469a62fcbf1eeb65df",
    "67b3c7949a62fcbf1eeb83a6",
    "67b3c7d89a62fcbf1eeb842e",
  ];

  return (
    <div>
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl text-center mb-6 font-bold text-cyan-600">Trobits Articles</h2>

        <div className="flex flex-wrap justify-center gap-2 max-w- mx-auto">
          {allBlogs.slice(0,4).map((article, index) => (
            <div key={article.id} className={"flex flex-wrap justify-center items-center"}>
              <HomeNewsCard articleData={article} />
            </div>
          ))}

          {allBlogs.slice(4).map((article, index) => (
            <div key={article.id} className={"flex flex-wrap justify-center items-center"}>
              <HomeNewsCard articleData={article} />
              {/* Show ad after every 4 articles */}
              {(index + 1) % 2 === 0 && (
                <AdBanner key={adClasses[index]} adClass={adClasses[index]} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* "See More" Button */}
      <Link href="/articles">
        <div className="text-center mt-20">
          <Button className="mx-auto bg-cyan-700 text-white">See More</Button>
        </div>
      </Link>
    </div>
  );
}
