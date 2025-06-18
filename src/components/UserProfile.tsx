
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, TrendingUp } from 'lucide-react';

interface UserProfileProps {
  userProfile: {
    alias: string;
    branch?: string;
    profileScore: number;
  };
}

const UserProfile = ({ userProfile }: UserProfileProps) => {
  const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
  const userColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${userColor} flex items-center justify-center`}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{userProfile.alias}</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-gray-500" />
              <span className={`text-sm font-medium ${getScoreColor(userProfile.profileScore)}`}>
                SkillSync Score: {userProfile.profileScore}%
              </span>
            </div>
            {userProfile.branch && (
              <Badge variant="secondary" className="text-xs mt-1">
                {userProfile.branch}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
