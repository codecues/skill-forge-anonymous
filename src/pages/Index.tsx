
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Users } from 'lucide-react';
import CompleteUserProfile from '@/components/CompleteUserProfile';
import UserList from '@/components/UserList';

// Sample data for multiple users
const sampleUsers = [
  {
    id: '1',
    alias: 'CodeNinja247',
    color: 'bg-blue-500',
    skills: [
      { id: '1', name: 'React', category: 'Programming', level: 'Advanced' },
      { id: '2', name: 'Python', category: 'Programming', level: 'Intermediate' },
      { id: '3', name: 'UI/UX Design', category: 'Design', level: 'Advanced' },
    ],
    certificates: [
      {
        id: '1',
        title: 'React Developer Certification',
        issuer: 'Tech Academy',
        date: '2024-01-15',
        description: 'Comprehensive certification covering React fundamentals, hooks, and advanced patterns.',
        verificationLink: 'https://example.com/verify/123'
      },
    ],
    projects: [
      {
        id: '1',
        title: 'E-commerce Dashboard',
        description: 'A comprehensive admin dashboard for managing e-commerce operations with real-time analytics.',
        skills: ['React', 'TypeScript', 'Chart.js'],
        category: 'Web Development',
        demoLink: 'https://example.com/demo',
        githubLink: 'https://github.com/example',
        imageUrl: '/placeholder.svg'
      },
    ]
  },
  {
    id: '2',
    alias: 'DesignWizard891',
    color: 'bg-purple-500',
    skills: [
      { id: '4', name: 'Figma', category: 'Design', level: 'Expert' },
      { id: '5', name: 'Adobe Photoshop', category: 'Design', level: 'Advanced' },
      { id: '6', name: 'Prototyping', category: 'Design', level: 'Advanced' },
    ],
    certificates: [
      {
        id: '2',
        title: 'UX Design Professional',
        issuer: 'Design Institute',
        date: '2023-11-20',
        description: 'User experience design principles, prototyping, and user research methodologies.',
        verificationLink: 'https://example.com/verify/456'
      },
    ],
    projects: [
      {
        id: '2',
        title: 'Mobile Banking App Design',
        description: 'Complete UI/UX design for a modern mobile banking application with focus on accessibility.',
        skills: ['Figma', 'User Research', 'Prototyping'],
        category: 'UI/UX Design',
        demoLink: 'https://example.com/demo2',
        githubLink: '',
        imageUrl: '/placeholder.svg'
      },
    ]
  },
  {
    id: '3',
    alias: 'DataDriven123',
    color: 'bg-green-500',
    skills: [
      { id: '7', name: 'Python', category: 'Programming', level: 'Expert' },
      { id: '8', name: 'Machine Learning', category: 'Data Science', level: 'Advanced' },
      { id: '9', name: 'SQL', category: 'Data Science', level: 'Advanced' },
    ],
    certificates: [
      {
        id: '3',
        title: 'Data Science Specialist',
        issuer: 'Data Academy',
        date: '2024-02-10',
        description: 'Advanced data science techniques including machine learning and statistical analysis.',
        verificationLink: 'https://example.com/verify/789'
      },
    ],
    projects: [
      {
        id: '3',
        title: 'Predictive Analytics Platform',
        description: 'Machine learning platform for predictive analytics with interactive visualizations.',
        skills: ['Python', 'TensorFlow', 'Pandas'],
        category: 'Data Science',
        demoLink: 'https://example.com/demo3',
        githubLink: 'https://github.com/example3',
        imageUrl: '/placeholder.svg'
      },
    ]
  }
];

const Index = () => {
  const [selectedUser, setSelectedUser] = useState(sampleUsers[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillSync
            </h1>
            <p className="text-gray-600 mt-2">Anonymous Student Portfolio Platform</p>
          </div>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">{sampleUsers.length} Students</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User List Sidebar */}
          <div className="lg:col-span-1">
            <UserList 
              users={sampleUsers}
              onSelectUser={setSelectedUser}
              selectedUserId={selectedUser.id}
            />
          </div>

          {/* Selected User Profile */}
          <div className="lg:col-span-3">
            <CompleteUserProfile user={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
