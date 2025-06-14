/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PostCard from "../Post/PostCard";
import { useAppSelector } from "@/redux/hooks";
import { useGetPostsByUserIdQuery } from "@/redux/features/api/postApi";
import Loading from "../Shared/Loading";
import { useRouter } from "next/navigation";
import { Post } from "./TopicDetails";
import { useGetUserByIdQuery } from "@/redux/features/api/authApi";
import { format } from 'date-fns';
import ProfileEditModal from '../Profile/ProfileEditModal';
import { Edit } from 'lucide-react';
import { IUser } from './Types';

export default function MyProfilePage() {
    const router = useRouter();
    const [ currentPage, setCurrentPage ] = useState(1);
    const limit = 15;
    const currentUser: Partial<IUser> = useAppSelector((state) => state.auth.user);
    const { data: updatedUserData, isLoading: updatedUserDataLoading } = useGetUserByIdQuery(currentUser?.id || '', { skip: !currentUser?.id });
    const { data: allPostsData, isLoading: allPostsDataLoading } = useGetPostsByUserIdQuery({ id: currentUser?.id || '', limit, page: currentPage }, { skip: !currentUser?.id });
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);

    if (updatedUserDataLoading || allPostsDataLoading) {
        return <Loading />;
    }

    const user: IUser = updatedUserData?.data;
    const allPosts: Post[] = allPostsData?.data || [];
    const totalPages = allPostsData?.meta?.totalPages || 0;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const joinedDate = user?.createdAt ? format(new Date(user.createdAt), 'dd MMMM yyyy') : '';

    return (
        <div className="min-h-screen bg-[#0000004d] p-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Cover Image */}
                    <div className="h-48 md:h-64 rounded-t-lg overflow-hidden">
                        <img
                            src={user?.coverImage || '/images/default-cover.jpg'}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Profile Image */}
                    <div className="absolute -bottom-16 left-4">
                        <div className="w-32 h-32 rounded-full border-4 border-[#0000004d] overflow-hidden">
                            <img
                                src={user?.profileImage || '/images/default-avatar.jpg'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    {currentUser && (
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Info */}
                <div className="mt-20 text-white">
                    <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
                    <p className="text-gray-400">@{user?.username}</p>
                    <p className="mt-2">{user?.bio || 'No bio available'}</p>
                    <p className="text-sm text-gray-400 mt-2">Joined {joinedDate}</p>
                </div>

                {/* Posts */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Posts</h2>
                    <div className="space-y-4">
                        {allPosts.map((post: Post) => (
                            <div key={post.id} className="bg-[#ffffff1a] p-4 rounded-lg">
                                <p className="text-white">{post.content}</p>
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt="Post"
                                        className="mt-2 rounded-lg max-h-96 w-full object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded ${
                                    currentPage === 1
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded ${
                                    currentPage === totalPages
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <ProfileEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}
