import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Folder, PlusCircle, ExternalLink, Tag, Image, Video, Code, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  tags: string[];
  mediaUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  type: 'Personal' | 'Academic' | 'Hobby';
  mediaType: 'Software' | 'Video' | 'Design' | 'Research' | 'Other';
  allowContributions: boolean;
}

const ProjectManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Dashboard',
      description: 'A comprehensive admin dashboard for managing online store operations with real-time analytics and inventory management.',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      tags: ['Web Development', 'Full Stack', 'Dashboard'],
      githubUrl: 'https://github.com/example/dashboard',
      liveUrl: 'https://dashboard.example.com',
      type: 'Personal',
      mediaType: 'Software',
      allowContributions: false
    },
    {
      id: '2',
      title: 'Mobile Weather App',
      description: 'A clean and intuitive weather application with location-based forecasts and beautiful animations.',
      skills: ['React Native', 'JavaScript', 'API Integration'],
      tags: ['Mobile', 'Weather', 'UI/UX'],
      githubUrl: 'https://github.com/example/weather-app',
      type: 'Hobby',
      mediaType: 'Software',
      allowContributions: false
    },
    {
      id: '3',
      title: 'Product Demo Video',
      description: 'Created a professional product demonstration video showcasing key features and user experience flow.',
      skills: ['Video Editing', 'Storytelling', 'Adobe Premiere'],
      tags: ['Video Production', 'Marketing', 'Demo'],
      videoUrl: 'https://youtube.com/watch?v=example',
      type: 'Personal',
      mediaType: 'Video',
      allowContributions: false
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    skills: '',
    tags: '',
    githubUrl: '',
    liveUrl: '',
    videoUrl: '',
    type: 'Personal' as Project['type'],
    mediaType: 'Software' as Project['mediaType'],
    allowContributions: false
  });

  const [showForm, setShowForm] = useState(false);

  const addProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Error",
        description: "Please fill in title and description",
        variant: "destructive"
      });
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      skills: newProject.skills.split(',').map(s => s.trim()).filter(s => s),
      tags: newProject.tags.split(',').map(t => t.trim()).filter(t => t),
      githubUrl: newProject.githubUrl || undefined,
      liveUrl: newProject.liveUrl || undefined,
      videoUrl: newProject.videoUrl || undefined,
      type: newProject.type,
      mediaType: newProject.mediaType,
      allowContributions: newProject.allowContributions
    };

    setProjects([project, ...projects]);
    setNewProject({
      title: '',
      description: '',
      skills: '',
      tags: '',
      githubUrl: '',
      liveUrl: '',
      videoUrl: '',
      type: 'Personal',
      mediaType: 'Software',
      allowContributions: false
    });
    setShowForm(false);
    
    toast({
      title: "Project Added",
      description: `${newProject.title} has been added to your portfolio!`
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Personal': 'bg-blue-100 text-blue-800',
      'Academic': 'bg-green-100 text-green-800',
      'Hobby': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors['Personal'];
  };

  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'Software': return <Code className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Design': return <Image className="w-4 h-4" />;
      default: return <Folder className="w-4 h-4" />;
    }
  };

  const getMediaTypeColor = (mediaType: string) => {
    const colors = {
      'Software': 'bg-green-100 text-green-800',
      'Video': 'bg-red-100 text-red-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Research': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[mediaType as keyof typeof colors] || colors['Other'];
  };

  return (
    <div className="space-y-6">
      {/* Add Project Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5" />
              Add New Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title *</label>
                <Input
                  placeholder="Project title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newProject.type}
                  onChange={(e) => setNewProject({ ...newProject, type: e.target.value as Project['type'] })}
                >
                  <option value="Personal">Personal</option>
                  <option value="Academic">Academic</option>
                  <option value="Hobby">Hobby</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Media Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newProject.mediaType}
                onChange={(e) => setNewProject({ ...newProject, mediaType: e.target.value as Project['mediaType'] })}
              >
                <option value="Software">Software/Code</option>
                <option value="Video">Video Demonstration</option>
                <option value="Design">Design/Visual</option>
                <option value="Research">Research/Analysis</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description *</label>
              <Textarea
                placeholder="Describe your project..."
                rows={4}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Skills Used</label>
                <Input
                  placeholder="React, Python, Video Editing (comma-separated)"
                  value={newProject.skills}
                  onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tags</label>
                <Input
                  placeholder="Web Dev, Demo, Creative (comma-separated)"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">GitHub URL</label>
                <Input
                  placeholder="https://github.com/username/project"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Live Demo URL</label>
                <Input
                  placeholder="https://project.example.com"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Video URL</label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={newProject.videoUrl}
                  onChange={(e) => setNewProject({ ...newProject, videoUrl: e.target.value })}
                />
              </div>
            </div>

            {/* Contribution Option */}
            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
              <input
                type="checkbox"
                id="allowContributions"
                checked={newProject.allowContributions}
                onChange={(e) => setNewProject({ ...newProject, allowContributions: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="allowContributions" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Allow other users to contribute to this project
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={addProject} className="bg-green-500 hover:bg-green-600">
                Add Project
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <Badge className={getTypeColor(project.type)}>
                      {project.type}
                    </Badge>
                    <Badge className={getMediaTypeColor(project.mediaType)}>
                      {getMediaTypeIcon(project.mediaType)}
                      <span className="ml-1">{project.mediaType}</span>
                    </Badge>
                    {project.allowContributions && (
                      <Badge className="bg-green-100 text-green-800">
                        <Users className="w-3 h-3 mr-1" />
                        Open to Contributors
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  {getMediaTypeIcon(project.mediaType)}
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Skills */}
              {project.skills.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">SKILLS USED</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags.length > 0 && (
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
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live
                  </Button>
                )}
                {project.videoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.videoUrl, '_blank')}
                    className="flex-1 min-w-0"
                  >
                    <Video className="w-4 h-4 mr-1" />
                    Video
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Projects Yet</h3>
            <p className="text-gray-500 mb-4">
              Start building your portfolio by adding your first project!
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectManager;
