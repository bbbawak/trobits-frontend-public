import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface UserCardProps {
  username: string;
  imageUrl?: string;
  followers?: number;
  isVerified?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  username,
  imageUrl,
  followers = 0,
  isVerified = false
}) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={username}
            fill
            className="object-cover"
          />
        ) : (
          <User className="w-6 h-6 text-slate-400" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-medium text-white">{username}</span>
          {isVerified && (
            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )}
        </div>
        <p className="text-sm text-slate-400">{followers.toLocaleString()} followers</p>
      </div>
    </div>
  );
};

export default UserCard; 