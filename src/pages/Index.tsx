
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Award, Folder, Sparkles, Briefcase } from 'lucide-react';
import SkillManager from '@/components/SkillManager';
import CertificateManager from '@/components/CertificateManager';
import ProjectManager from '@/components/ProjectManager';
import InternshipManager from '@/components/InternshipManager';
import PersonalizedFeed from '@/components/PersonalizedFeed';

const Index = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  // Sample user profile data - this would typically come from user input
  const [userProfile, setUserProfile] = useState({
    alias: 'MyProfile',
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
    ],
    internships: [
      {
        id: '1',
        company: 'Tech Innovations Inc.',
        position: 'Frontend Developer Intern',
        duration: '3 months',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        description: 'Worked on user interface development using React and collaborated with senior developers on mobile-responsive web applications.',
        skills: ['React', 'JavaScript', 'CSS'],
        type: 'Remote'
      },
    ]
  });

  const tabs = [
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'feed', label: 'Discover', icon: Sparkles },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillManager />;
      case 'certificates':
        return <CertificateManager />;
      case 'projects':
        return <ProjectManager />;
      case 'internships':
        return <InternshipManager />;
      case 'feed':
        return <PersonalizedFeed userProfile={userProfile} />;
      default:
        return <SkillManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillSync
            </h1>
            <p className="text-gray-600 mt-2">Build Your Portfolio & Discover Relevant Projects</p>
          </div>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Anonymous Profile</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`flex-shrink-0 rounded-none border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-transparent hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Tab Content */}
        <div className="space-y-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Index;
