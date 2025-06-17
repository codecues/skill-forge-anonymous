
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, BookOpen, Award, Folder, Calendar, Building, ExternalLink } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verificationLink: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  category: string;
  demoLink: string;
  githubLink: string;
  imageUrl: string;
}

interface UserProfile {
  id: string;
  alias: string;
  color: string;
  skills: Skill[];
  certificates: Certificate[];
  projects: Project[];
}

interface CompleteUserProfileProps {
  user: UserProfile;
}

const CompleteUserProfile = ({ user }: CompleteUserProfileProps) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Programming': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Soft Skills': 'bg-green-100 text-green-800',
      'Data Science': 'bg-orange-100 text-orange-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'Beginner': 'bg-yellow-100 text-yellow-800',
      'Intermediate': 'bg-blue-100 text-blue-800',
      'Advanced': 'bg-green-100 text-green-800',
      'Expert': 'bg-purple-100 text-purple-800'
    };
    return colors[level] || colors['Beginner'];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* User Header */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${user.color} flex items-center justify-center`}>
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.alias}</h2>
              <Badge variant="secondary" className="mt-1">
                Anonymous Student
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Skills ({user.skills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.skills.map((skill) => (
              <Card key={skill.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{skill.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={getCategoryColor(skill.category)}>
                      {skill.category}
                    </Badge>
                    <Badge className={getLevelColor(skill.level)}>
                      {skill.level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certificates ({user.certificates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.certificates.map((certificate) => (
              <Card key={certificate.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{certificate.title}</h3>
                      <Badge variant="secondary" className="mt-1">
                        Certificate
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{certificate.issuer}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(certificate.date)}</span>
                    </div>

                    {certificate.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {certificate.description}
                      </p>
                    )}

                    {certificate.verificationLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => window.open(certificate.verificationLink, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Verify Certificate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Projects ({user.projects.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.projects.map((project) => (
              <Card key={project.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {project.imageUrl && (
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <Badge className={getCategoryColor(project.category)} variant="secondary">
                        {project.category}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {project.demoLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(project.demoLink, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(project.githubLink, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          GitHub
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteUserProfile;
