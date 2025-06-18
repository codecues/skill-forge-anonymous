
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, TrendingUp, Download } from 'lucide-react';

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

  const handleResumeExport = () => {
    // Placeholder for resume export functionality
    console.log('Exporting resume...');
    // TODO: Implement actual resume export logic
  };

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`w-12 h-12 rounded-full ${userColor} flex items-center justify-center`}>
            <User className="w-6 h-6 text-white" />
          </div>
          
          <div className="space-y-1">
            <p className="font-semibold text-gray-800 text-sm">{userProfile.alias}</p>
            
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 text-gray-500" />
              <span className={`text-xs font-medium ${getScoreColor(userProfile.profileScore)}`}>
                SkillSync Score: {userProfile.profileScore}%
              </span>
            </div>

            {userProfile.branch && (
              <Badge variant="secondary" className="text-xs">
                {userProfile.branch}
              </Badge>
            )}
          </div>

          {/* Resume Export Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={handleResumeExport}
          >
            <Download className="w-3 h-3 mr-2" />
            Export Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
