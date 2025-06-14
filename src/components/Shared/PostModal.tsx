"use client";
import { FC, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';

interface ModalProps {
    onClose: () => void;
    onSubmit: (content: string, image?: File) => void;
    isLoading?: boolean;
}

const PostModal: FC<ModalProps> = ({ onClose, onSubmit, isLoading = false }) => {
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        onSubmit(content, selectedImage || undefined);
        setContent('');
        setSelectedImage(null);
        setPreviewUrl(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Create Post</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full h-32 p-2 border rounded-lg mb-4 resize-none"
                />
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg inline-block"
                    >
                        Add Image
                    </label>
                    {previewUrl && (
                        <div className="mt-2 relative">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                width={200}
                                height={200}
                                className="rounded-lg"
                            />
                            <button
                                onClick={() => {
                                    setSelectedImage(null);
                                    setPreviewUrl(null);
                                }}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={!content.trim() || isLoading}
                        className={`px-4 py-2 rounded-lg ${
                            !content.trim() || isLoading
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        {isLoading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
