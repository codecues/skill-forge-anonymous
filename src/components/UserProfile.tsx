
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

const UserProfile = () => {
  // Generate a random anonymous identity
  const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
  const aliases = ['CodeNinja', 'DesignWizard', 'TechExplorer', 'PixelMaster', 'DataDriven'];
  
  const userColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
  const userAlias = aliases[Math.floor(Math.random() * aliases.length)] + Math.floor(Math.random() * 1000);

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${userColor} flex items-center justify-center`}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{userAlias}</p>
            <Badge variant="secondary" className="text-xs">
              Anonymous Student
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
