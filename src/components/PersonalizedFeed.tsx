
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, User, Eye, ExternalLink, Tag, TrendingUp, Filter, Award, Folder, Video, Code } from 'lucide-react';

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
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');

  // Sample feed items from other users that would be fetched from backend
  const allFeedItems = [
    {
      id: '1',
      type: 'project',
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
      liveUrl: 'https://react-dashboard.example.com',
      mediaType: 'Software'
    },
    {
      id: '2',
      type: 'project',
      title: 'Python Data Analysis Pipeline',
      description: 'Automated data processing pipeline for analyzing large datasets with Python and Pandas',
      author: 'DataWizard23',
      authorColor: 'bg-green-500',
      skills: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
      tags: ['Data Science', 'Automation', 'Analytics'],
      category: 'Data Science',
      views: 189,
      relevanceScore: 75,
      githubUrl: 'https://github.com/example/data-pipeline',
      mediaType: 'Software'
    },
    {
      id: '3',
      type: 'project',
      title: 'Mobile UI/UX Design System',
      description: 'Comprehensive design system for mobile applications with Figma components',
      author: 'DesignPro456',
      authorColor: 'bg-purple-500',
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'Design Systems'],
      tags: ['Mobile', 'Design System', 'Components'],
      category: 'Design',
      views: 321,
      relevanceScore: 85,
      liveUrl: 'https://design-system.example.com',
      mediaType: 'Design'
    },
    {
      id: '4',
      type: 'project',
      title: 'Product Demo Video Series',
      description: 'Professional video demonstrations showcasing software features and user workflows',
      author: 'VideoMaker101',
      authorColor: 'bg-red-500',
      skills: ['Video Editing', 'Storytelling', 'Adobe Premiere', 'After Effects'],
      tags: ['Video Production', 'Demo', 'Marketing'],
      category: 'Content Creation',
      views: 412,
      relevanceScore: 60,
      videoUrl: 'https://youtube.com/watch?v=example',
      mediaType: 'Video'
    },
    {
      id: '5',
      type: 'certificate',
      title: 'AWS Solutions Architect Professional',
      description: 'Advanced certification covering complex AWS architectures and best practices',
      author: 'CloudExpert789',
      authorColor: 'bg-orange-500',
      skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Infrastructure'],
      tags: ['Cloud', 'AWS', 'Architecture'],
      category: 'Cloud Computing',
      views: 156,
      relevanceScore: 80,
      issuer: 'Amazon Web Services',
      date: '2024-03-15',
      verificationUrl: 'https://aws.amazon.com/verification/example'
    },
    {
      id: '6',
      type: 'certificate',
      title: 'Google UX Design Professional Certificate',
      description: 'Comprehensive UX design program covering user research, prototyping, and testing',
      author: 'UXDesigner456',
      authorColor: 'bg-pink-500',
      skills: ['UX Design', 'User Research', 'Prototyping', 'Figma'],
      tags: ['UX Design', 'Google', 'Professional'],
      category: 'Design',
      views: 298,
      relevanceScore: 90,
      issuer: 'Google via Coursera',
      date: '2024-02-20',
      verificationUrl: 'https://coursera.org/verify/example'
    }
  ];

  // Calculate relevance based on user's skills
  const calculateRelevance = (itemSkills: string[]) => {
    const userSkills = userProfile.skills.map(skill => skill.name.toLowerCase());
    const matchingSkills = itemSkills.filter(skill => 
      userSkills.includes(skill.toLowerCase())
    );
    return (matchingSkills.length / itemSkills.length) * 100;
  };

  // Enhanced feed items with calculated relevance
  const enhancedFeedItems = useMemo(() => {
    return allFeedItems.map(item => ({
      ...item,
      calculatedRelevance: calculateRelevance(item.skills),
      matchingSkills: item.skills.filter(skill =>
        userProfile.skills.some(userSkill => 
          userSkill.name.toLowerCase() === skill.toLowerCase()
        )
      )
    }));
  }, [userProfile.skills]);

  // Filter items based on user preferences
  const filteredItems = useMemo(() => {
    let filtered = [...enhancedFeedItems];

    // Filter by relevance
    if (relevanceFilter === 'high') {
      filtered = filtered.filter(item => item.calculatedRelevance >= 50);
    } else if (relevanceFilter === 'medium') {
      filtered = filtered.filter(item => item.calculatedRelevance >= 25 && item.calculatedRelevance < 50);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Filter by content type
    if (contentTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === contentTypeFilter);
    }

    // Sort by relevance score
    return filtered.sort((a, b) => b.calculatedRelevance - a.calculatedRelevance);
  }, [enhancedFeedItems, relevanceFilter, categoryFilter, contentTypeFilter]);

  const getRelevanceBadgeColor = (relevance: number) => {
    if (relevance >= 50) return 'bg-green-100 text-green-800';
    if (relevance >= 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string, mediaType?: string) => {
    if (type === 'certificate') return <Award className="w-4 h-4" />;
    if (mediaType === 'Video') return <Video className="w-4 h-4" />;
    if (mediaType === 'Software') return <Code className="w-4 h-4" />;
    return <Folder className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'certificate' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800';
  };

  const categories = [...new Set(allFeedItems.map(item => item.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            Discover Feed
          </h2>
          <p className="text-gray-600">Projects and certifications tailored to your skills and interests</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredItems.length} relevant items found
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
            
            <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="project">Projects Only</SelectItem>
                <SelectItem value="certificate">Certificates Only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={relevanceFilter} onValueChange={setRelevanceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="high">High Relevance (50%+)</SelectItem>
                <SelectItem value="medium">Medium Relevance (25-50%)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
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
                setCategoryFilter('all');
                setContentTypeFilter('all');
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feed Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              {/* Author and Relevance */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${item.authorColor} flex items-center justify-center`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.author}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      {item.views} views
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getRelevanceBadgeColor(item.calculatedRelevance)}>
                    {Math.round(item.calculatedRelevance)}% match
                  </Badge>
                  <Badge className={getTypeColor(item.type)}>
                    {getTypeIcon(item.type, item.mediaType)}
                    <span className="ml-1 capitalize">{item.type}</span>
                  </Badge>
                </div>
              </div>

              {/* Item Details */}
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Certificate specific info */}
              {item.type === 'certificate' && (item.issuer || item.date) && (
                <div className="mb-3 p-2 bg-yellow-50 rounded">
                  {item.issuer && <p className="text-xs font-medium text-yellow-800">Issued by: {item.issuer}</p>}
                  {item.date && <p className="text-xs text-yellow-700">Date: {new Date(item.date).toLocaleDateString()}</p>}
                </div>
              )}

              {/* Matching Skills */}
              {item.matchingSkills.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-green-600 mb-1">YOUR SKILLS:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.matchingSkills.map((skill, index) => (
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
                  {item.skills.slice(0, 4).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`text-xs ${
                        item.matchingSkills.includes(skill) 
                          ? 'border-green-500 text-green-700' 
                          : ''
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {item.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {item.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.githubUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                )}
                {item.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.liveUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </Button>
                )}
                {item.videoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.videoUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <Video className="w-4 h-4 mr-1" />
                    Video
                  </Button>
                )}
                {item.verificationUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.verificationUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <Award className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Relevant Content Found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or add more skills to your profile to discover relevant content.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setRelevanceFilter('all');
                setCategoryFilter('all');
                setContentTypeFilter('all');
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
