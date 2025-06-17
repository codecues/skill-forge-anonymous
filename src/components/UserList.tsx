
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, BookOpen, Award, Folder } from 'lucide-react';

interface UserProfile {
  id: string;
  alias: string;
  color: string;
  skills: any[];
  certificates: any[];
  projects: any[];
}

interface UserListProps {
  users: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  selectedUserId?: string;
}

const UserList = ({ users, onSelectUser, selectedUserId }: UserListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          All Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => (
            <Card 
              key={user.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedUserId === user.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onSelectUser(user)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center`}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.alias}</p>
                      <Badge variant="secondary" className="text-xs">
                        Anonymous Student
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{user.skills.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{user.certificates.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Folder className="w-4 h-4" />
                      <span>{user.projects.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserList;
