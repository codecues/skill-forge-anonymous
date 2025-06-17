
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ExternalLink, Tag, User, Eye } from 'lucide-react';

interface PeerProject {
  id: string;
  title: string;
  description: string;
  author: string;
  authorColor: string;
  skills: string[];
  tags: string[];
  type: string;
  views: number;
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterType, setFilterType] = useState('');

  // Sample peer projects data
  const [peerProjects] = useState<PeerProject[]>([
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'Smart task management app that uses AI to prioritize tasks and suggest optimal work schedules based on user behavior.',
      author: 'TechWizard47',
      authorColor: 'bg-blue-500',
      skills: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      tags: ['AI', 'Productivity', 'Machine Learning'],
      type: 'Personal',
      views: 342,
      githubUrl: 'https://github.com/example/ai-tasks',
      liveUrl: 'https://ai-tasks.example.com'
    },
    {
      id: '2',
      title: 'Blockchain Voting System',
      description: 'Decentralized voting platform ensuring transparency and security in electoral processes using blockchain technology.',
      author: 'CryptoBuilder92',
      authorColor: 'bg-purple-500',
      skills: ['Solidity', 'Web3', 'React', 'Ethereum'],
      tags: ['Blockchain', 'Democracy', 'Security'],
      type: 'Academic',
      views: 156,
      githubUrl: 'https://github.com/example/blockchain-voting'
    },
    {
      id: '3',
      title: 'AR Plant Identification',
      description: 'Mobile app that uses augmented reality and computer vision to identify plants and provide care instructions.',
      author: 'NatureTech23',
      authorColor: 'bg-green-500',
      skills: ['Swift', 'ARKit', 'CoreML', 'Python'],
      tags: ['AR', 'Mobile', 'Environmental'],
      type: 'Hobby',
      views: 289,
      liveUrl: 'https://plantid.example.com'
    },
    {
      id: '4',
      title: 'Social Media Analytics Dashboard',
      description: 'Comprehensive analytics platform for tracking social media performance across multiple platforms with real-time insights.',
      author: 'DataMaster88',
      authorColor: 'bg-orange-500',
      skills: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
      tags: ['Analytics', 'Social Media', 'Data Visualization'],
      type: 'Personal',
      views: 198,
      githubUrl: 'https://github.com/example/social-analytics'
    },
    {
      id: '5',
      title: 'Virtual Reality Art Gallery',
      description: 'Immersive VR experience showcasing digital art collections with interactive features and social viewing capabilities.',
      author: 'ArtistVR101',
      authorColor: 'bg-pink-500',
      skills: ['Unity', 'C#', 'VR', 'Blender'],
      tags: ['VR', 'Art', '3D', 'Interactive'],
      type: 'Hobby',
      views: 445,
      liveUrl: 'https://vr-gallery.example.com'
    }
  ]);

  // Filter projects based on search and filters
  const filteredProjects = peerProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !filterSkill || project.skills.includes(filterSkill);
    const matchesType = !filterType || project.type === filterType;
    
    return matchesSearch && matchesSkill && matchesType;
  });

  // Get unique skills and types for filter options
  const allSkills = [...new Set(peerProjects.flatMap(p => p.skills))].sort();
  const allTypes = [...new Set(peerProjects.map(p => p.type))];

  const getTypeColor = (type: string) => {
    const colors = {
      'Personal': 'bg-blue-100 text-blue-800',
      'Academic': 'bg-green-100 text-green-800',
      'Hobby': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors['Personal'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Explore Peer Projects</h2>
          <p className="text-gray-600">Discover amazing projects from fellow students</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredProjects.length} of {peerProjects.length} projects
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects, skills, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterSkill} onValueChange={setFilterSkill}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
                {allSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {allTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilterSkill('');
                setFilterType('');
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
          <Card key={project.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
            <CardContent className="p-6">
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full ${project.authorColor} flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{project.author}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    {project.views} views
                  </div>
                </div>
                <Badge className={getTypeColor(project.type)}>
                  {project.type}
                </Badge>
              </div>

              {/* Project Details */}
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">SKILLS</p>
                <div className="flex flex-wrap gap-1">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
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
                <p className="text-xs font-medium text-gray-500 mb-2">TAGS</p>
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
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Projects Found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters to find more projects.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilterSkill('');
                setFilterType('');
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

export default ProjectExplorer;
