
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, User, Search, BookOpen, Folder, Award } from 'lucide-react';
import SkillManager from '@/components/SkillManager';
import CertificateManager from '@/components/CertificateManager';
import ProjectManager from '@/components/ProjectManager';
import ProjectExplorer from '@/components/ProjectExplorer';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for the overview
  const stats = {
    skills: 12,
    certificates: 3,
    projects: 5,
    views: 247
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
            <p className="text-gray-600 mt-2">Anonymous Student Portfolio Platform</p>
          </div>
          <UserProfile />
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Explore
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Skills</p>
                      <p className="text-3xl font-bold">{stats.skills}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Certificates</p>
                      <p className="text-3xl font-bold">{stats.certificates}</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Projects</p>
                      <p className="text-3xl font-bold">{stats.projects}</p>
                    </div>
                    <Folder className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Profile Views</p>
                      <p className="text-3xl font-bold">{stats.views}</p>
                    </div>
                    <User className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab('skills')}
                    className="h-20 flex flex-col gap-2 bg-blue-500 hover:bg-blue-600"
                  >
                    <PlusCircle className="w-6 h-6" />
                    Add New Skill
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('certificates')}
                    className="h-20 flex flex-col gap-2 bg-purple-500 hover:bg-purple-600"
                  >
                    <Award className="w-6 h-6" />
                    Add Certificate
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('projects')}
                    className="h-20 flex flex-col gap-2 bg-green-500 hover:bg-green-600"
                  >
                    <Folder className="w-6 h-6" />
                    Create Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <SkillManager />
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <CertificateManager />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore">
            <ProjectExplorer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
