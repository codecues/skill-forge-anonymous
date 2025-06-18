
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Award, Folder, Sparkles, Briefcase, Users, FileText, Calendar, Heart, GraduationCap, Code } from 'lucide-react';
import SkillManager from '@/components/SkillManager';
import CertificateManager from '@/components/CertificateManager';
import ProjectManager from '@/components/ProjectManager';
import InternshipManager from '@/components/InternshipManager';
import PersonalizedFeed from '@/components/PersonalizedFeed';
import BlogManager from '@/components/BlogManager';
import EventManager from '@/components/EventManager';
import MentorManager from '@/components/MentorManager';
import AppreciationManager from '@/components/AppreciationManager';
import UserProfile from '@/components/UserProfile';
import HackathonManager from '@/components/HackathonManager';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  
  // Sample user profile data with masked names
  const [userProfile, setUserProfile] = useState({
    alias: 'TechExplorer42',
    realName: 'CodeNinja2024', // This is also masked
    branch: 'Computer Science Engineering',
    profileScore: 78,
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
        verificationLink: 'https://example.com/verify/123',
        skills: ['React', 'JavaScript', 'TypeScript']
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
        imageUrl: '/placeholder.svg',
        allowContributions: true
      },
    ],
    internships: [
      {
        id: '1',
        company: 'TechCorp Solutions',
        position: 'Frontend Developer Intern',
        duration: '3 months',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        description: 'Worked on user interface development using React and collaborated with senior developers on mobile-responsive web applications.',
        skills: ['React', 'JavaScript', 'CSS'],
        type: 'Remote'
      },
    ],
    blogs: [],
    events: [],
    mentors: [],
    appreciations: []
  });

  const tabs = [
    { id: 'feed', label: 'Discover', icon: Sparkles },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'hackathons', label: 'Hackathons', icon: Code },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'appreciations', label: 'Appreciations', icon: Heart },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'feed':
        return <PersonalizedFeed userProfile={userProfile} />;
      case 'skills':
        return <SkillManager certificates={userProfile.certificates} projects={userProfile.projects} internships={userProfile.internships} />;
      case 'certificates':
        return <CertificateManager />;
      case 'projects':
        return <ProjectManager />;
      case 'internships':
        return <InternshipManager />;
      case 'hackathons':
        return <HackathonManager />;
      case 'blogs':
        return <BlogManager />;
      case 'events':
        return <EventManager />;
      case 'mentors':
        return <MentorManager />;
      case 'appreciations':
        return <AppreciationManager />;
      default:
        return <PersonalizedFeed userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar with Navigation */}
        <div className="w-72 min-h-screen bg-white border-r border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-900">
              SkillSync
            </h1>
            <p className="text-sm text-gray-500 mt-1">Portfolio Builder</p>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-100">
            <UserProfile userProfile={userProfile} />
          </div>

          {/* Navigation Tabs */}
          <div className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`w-full justify-start h-10 px-3 font-normal ${
                    activeTab === tab.id 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4 mr-3" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="container mx-auto px-6 py-6">
            {/* Active Tab Content */}
            <div className="max-w-5xl">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
