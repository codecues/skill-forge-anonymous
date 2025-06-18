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
    <div className="space-y-4">
      {/* Profile Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{userProfile.alias}</p>
          {userProfile.branch && (
            <p className="text-xs text-gray-500 truncate">{userProfile.branch}</p>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">Score</span>
        </div>
        <span className={`text-sm font-medium ${getScoreColor(userProfile.profileScore)}`}>
          {userProfile.profileScore}%
        </span>
      </div>

      {/* Resume Export Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full h-8 text-xs"
        onClick={handleResumeExport}
      >
        <Download className="w-3 h-3 mr-2" />
        Export Resume
      </Button>
    </div>
  );
};

export default UserProfile;
