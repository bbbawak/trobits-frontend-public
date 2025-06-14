"use client";
import React, { useState, useEffect } from "react";
import { useGetAllArchiveQuery, useGetAllShibaBurnsQuery } from "@/redux/features/api/archiveApi";
import Loading from "@/components/Shared/Loading";
import { AdBanner } from "@/components/AdBanner";

interface ShibaBurnRecord {
  id: string;
  date: string;
  burnCount: number;
}

const adClasses = [
  "67d2cfc79eb53572455e13e3",
  "67d2d0779eb53572455e1516",
  "67d2d0c56f9479aa015d006a",
];

const ShibaBurnsPage: React.FC = () => {
  const [records, setRecords] = useState<ShibaBurnRecord[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const formatSelectedMonth = (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { month, year };
  };
  const { month, year } = formatSelectedMonth(selectedMonth);

  const { data: allArchiveData, isLoading: allArchiveDataLoading } = useGetAllArchiveQuery("");
  const { data: allShibaBurnsData, isLoading: allShibaBurnsDataLoading } = useGetAllShibaBurnsQuery(`?month=${month}&year=${year}`);

  const allArchive = allArchiveData?.data?.length > 0 ? allArchiveData?.data : [];

  useEffect(() => {
    if (allShibaBurnsData?.data?.length > 0) {
      setRecords(allShibaBurnsData.data);
    }
  }, [allShibaBurnsData]);

  if (allArchiveDataLoading || allShibaBurnsDataLoading) {
    return <Loading />;
  }

  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalBurns = sortedRecords.reduce((sum, record) => sum + record.burnCount, 0);

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            SHIB Burns
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Track our SHIB burning progress and impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRecords.map((record, index) => (
            <div key={record.id} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {new Date(record.date).toLocaleDateString()}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {record.burnCount.toLocaleString()} SHIB burned
                  </p>
                </div>
              </div>
              {(index + 1) % 3 === 0 && (
                <AdBanner key={adClasses[Math.floor(index / 3)]} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 inline-block">
            <h2 className="text-2xl font-bold text-white mb-2">
              Total SHIB Burned This Month
            </h2>
            <p className="text-3xl font-bold text-cyan-400">
              {totalBurns.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShibaBurnsPage;