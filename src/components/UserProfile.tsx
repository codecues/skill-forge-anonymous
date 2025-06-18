
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
    console.log('Generating resume...');
    
    // Create a simple resume content
    const resumeContent = `
RESUME - ${userProfile.alias}

Profile Information:
- Alias: ${userProfile.alias}
${userProfile.branch ? `- Branch: ${userProfile.branch}` : ''}
- SkillSync Score: ${userProfile.profileScore}%

This is a placeholder resume. In a real application, this would:
- Compile data from skills, projects, certificates, internships, and hackathons
- Format it professionally
- Generate a downloadable PDF
- Include all portfolio achievements

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    // Create and download the file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userProfile.alias}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('Resume exported successfully!');
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
