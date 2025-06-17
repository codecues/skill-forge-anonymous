
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, User, Eye, ExternalLink, Tag, TrendingUp, Filter } from 'lucide-react';

interface UserProfile {
  alias: string;
  skills: Array<{ id: string; name: string; category: string; level: string }>;
  certificates: Array<{ id: string; title: string; issuer: string; date: string }>;
  projects: Array<{ id: string; title: string; skills: string[] }>;
}

interface PersonalizedFeedProps {
  userProfile: UserProfile;
}

const PersonalizedFeed = ({ userProfile }: PersonalizedFeedProps) => {
  const [relevanceFilter, setRelevanceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Sample projects from other users that would be fetched from backend
  const allProjects = [
    {
      id: '1',
      title: 'Advanced React Dashboard',
      description: 'Interactive dashboard with real-time data visualization using React and D3.js',
      author: 'ReactMaster99',
      authorColor: 'bg-blue-500',
      skills: ['React', 'TypeScript', 'D3.js', 'Node.js'],
      tags: ['Dashboard', 'Data Visualization', 'Real-time'],
      category: 'Web Development',
      views: 245,
      relevanceScore: 95,
      githubUrl: 'https://github.com/example/react-dashboard',
      liveUrl: 'https://react-dashboard.example.com'
    },
    {
      id: '2',
      title: 'Python Data Analysis Pipeline',
      description: 'Automated data processing pipeline for analyzing large datasets with Python and Pandas',
      author: 'DataWizard23',
      authorColor: 'bg-green-500',
      skills: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
      tags: ['Data Science', 'Automation', 'Analytics'],
      category: 'Data Science',
      views: 189,
      relevanceScore: 75,
      githubUrl: 'https://github.com/example/data-pipeline'
    },
    {
      id: '3',
      title: 'Mobile UI/UX Design System',
      description: 'Comprehensive design system for mobile applications with Figma components',
      author: 'DesignPro456',
      authorColor: 'bg-purple-500',
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'Design Systems'],
      tags: ['Mobile', 'Design System', 'Components'],
      category: 'Design',
      views: 321,
      relevanceScore: 85,
      liveUrl: 'https://design-system.example.com'
    },
    {
      id: '4',
      title: 'React Native E-commerce App',
      description: 'Full-featured mobile e-commerce application with payment integration',
      author: 'MobileDev789',
      authorColor: 'bg-orange-500',
      skills: ['React', 'React Native', 'JavaScript', 'Firebase'],
      tags: ['Mobile', 'E-commerce', 'Payment'],
      category: 'Mobile Development',
      views: 156,
      relevanceScore: 80,
      githubUrl: 'https://github.com/example/rn-ecommerce'
    },
    {
      id: '5',
      title: 'TypeScript API Framework',
      description: 'Lightweight REST API framework built with TypeScript and Express',
      author: 'BackendGuru12',
      authorColor: 'bg-red-500',
      skills: ['TypeScript', 'Node.js', 'Express', 'MongoDB'],
      tags: ['Backend', 'API', 'Framework'],
      category: 'Backend Development',
      views: 98,
      relevanceScore: 60,
      githubUrl: 'https://github.com/example/ts-api-framework'
    }
  ];

  // Calculate relevance based on user's skills
  const calculateRelevance = (projectSkills: string[]) => {
    const userSkills = userProfile.skills.map(skill => skill.name.toLowerCase());
    const matchingSkills = projectSkills.filter(skill => 
      userSkills.includes(skill.toLowerCase())
    );
    return (matchingSkills.length / projectSkills.length) * 100;
  };

  // Enhanced projects with calculated relevance
  const enhancedProjects = useMemo(() => {
    return allProjects.map(project => ({
      ...project,
      calculatedRelevance: calculateRelevance(project.skills),
      matchingSkills: project.skills.filter(skill =>
        userProfile.skills.some(userSkill => 
          userSkill.name.toLowerCase() === skill.toLowerCase()
        )
      )
    }));
  }, [userProfile.skills]);

  // Filter projects based on user preferences
  const filteredProjects = useMemo(() => {
    let filtered = [...enhancedProjects];

    // Filter by relevance
    if (relevanceFilter === 'high') {
      filtered = filtered.filter(project => project.calculatedRelevance >= 50);
    } else if (relevanceFilter === 'medium') {
      filtered = filtered.filter(project => project.calculatedRelevance >= 25 && project.calculatedRelevance < 50);
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    // Sort by relevance score
    return filtered.sort((a, b) => b.calculatedRelevance - a.calculatedRelevance);
  }, [enhancedProjects, relevanceFilter, categoryFilter]);

  const getRelevanceBadgeColor = (relevance: number) => {
    if (relevance >= 50) return 'bg-green-100 text-green-800';
    if (relevance >= 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const categories = [...new Set(allProjects.map(p => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            Personalized Feed
          </h2>
          <p className="text-gray-600">Projects tailored to your skills and interests</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredProjects.length} relevant projects found
        </div>
      </div>

      {/* User Skills Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">Matching based on your skills:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.slice(0, 6).map((skill) => (
              <Badge key={skill.id} className="bg-blue-100 text-blue-800">
                {skill.name}
              </Badge>
            ))}
            {userProfile.skills.length > 6 && (
              <Badge className="bg-blue-100 text-blue-800">
                +{userProfile.skills.length - 6} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="high">High Relevance (50%+)</SelectItem>
                <SelectItem value="medium">Medium Relevance (25-50%)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setRelevanceFilter('all');
                setCategoryFilter('');
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              {/* Author and Relevance */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${project.authorColor} flex items-center justify-center`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{project.author}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      {project.views} views
                    </div>
                  </div>
                </div>
                <Badge className={getRelevanceBadgeColor(project.calculatedRelevance)}>
                  {Math.round(project.calculatedRelevance)}% match
                </Badge>
              </div>

              {/* Project Details */}
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Matching Skills */}
              {project.matchingSkills.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-green-600 mb-1">YOUR SKILLS:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.matchingSkills.map((skill, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* All Skills */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">ALL SKILLS:</p>
                <div className="flex flex-wrap gap-1">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`text-xs ${
                        project.matchingSkills.includes(skill) 
                          ? 'border-green-500 text-green-700' 
                          : ''
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Relevant Projects Found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or add more skills to your profile to discover relevant projects.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setRelevanceFilter('all');
                setCategoryFilter('');
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalizedFeed;
