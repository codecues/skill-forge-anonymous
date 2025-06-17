
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, BookOpen, RefreshCw } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  source: 'certificate' | 'project';
  sourceTitle: string;
}

interface SkillManagerProps {
  certificates?: Array<{ title: string; skills?: string[] }>;
  projects?: Array<{ title: string; skills: string[] }>;
}

const SkillManager = ({ certificates = [], projects = [] }: SkillManagerProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);

  // Auto-populate skills from certificates and projects
  useEffect(() => {
    const autoSkills: Skill[] = [];
    
    // Extract skills from certificates
    certificates.forEach(cert => {
      if (cert.skills) {
        cert.skills.forEach(skillName => {
          if (!autoSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
            autoSkills.push({
              id: `cert-${Date.now()}-${skillName}`,
              name: skillName,
              category: getCategoryFromSkill(skillName),
              level: 'Intermediate',
              source: 'certificate',
              sourceTitle: cert.title
            });
          }
        });
      }
    });

    // Extract skills from projects
    projects.forEach(project => {
      project.skills.forEach(skillName => {
        if (!autoSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
          autoSkills.push({
            id: `proj-${Date.now()}-${skillName}`,
            name: skillName,
            category: getCategoryFromSkill(skillName),
            level: getProjectSkillLevel(skillName),
            source: 'project',
            sourceTitle: project.title
          });
        }
      });
    });

    setSkills(autoSkills);
  }, [certificates, projects]);

  const getCategoryFromSkill = (skillName: string): string => {
    const skill = skillName.toLowerCase();
    
    if (skill.includes('react') || skill.includes('javascript') || skill.includes('typescript') || 
        skill.includes('python') || skill.includes('node') || skill.includes('java') || 
        skill.includes('html') || skill.includes('css')) {
      return 'Programming';
    }
    
    if (skill.includes('design') || skill.includes('figma') || skill.includes('photoshop') || 
        skill.includes('ui') || skill.includes('ux') || skill.includes('adobe')) {
      return 'Design';
    }
    
    if (skill.includes('video') || skill.includes('editing') || skill.includes('premiere') || 
        skill.includes('after effects') || skill.includes('storytelling')) {
      return 'Content Creation';
    }
    
    if (skill.includes('aws') || skill.includes('cloud') || skill.includes('docker') || 
        skill.includes('kubernetes') || skill.includes('devops')) {
      return 'Cloud Computing';
    }
    
    if (skill.includes('data') || skill.includes('analytics') || skill.includes('pandas') || 
        skill.includes('numpy') || skill.includes('machine learning')) {
      return 'Data Science';
    }
    
    if (skill.includes('leadership') || skill.includes('management') || skill.includes('communication')) {
      return 'Soft Skills';
    }
    
    return 'Other';
  };

  const getProjectSkillLevel = (skillName: string): string => {
    // Simple heuristic: if it's a common skill, assume intermediate, otherwise advanced
    const commonSkills = ['html', 'css', 'javascript'];
    return commonSkills.some(common => skillName.toLowerCase().includes(common)) ? 'Intermediate' : 'Advanced';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Programming': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Soft Skills': 'bg-green-100 text-green-800',
      'Data Science': 'bg-orange-100 text-orange-800',
      'Content Creation': 'bg-pink-100 text-pink-800',
      'Cloud Computing': 'bg-indigo-100 text-indigo-800',
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

  const getSourceColor = (source: string) => {
    return source === 'certificate' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700';
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Auto-Generated Skills</span>
          </div>
          <p className="text-blue-700 text-sm">
            Your skills are automatically extracted from your certificates and projects. 
            Add more projects and certificates to expand your skill set!
          </p>
        </CardContent>
      </Card>

      {/* Skills List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Your Skills ({skills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <Badge className={getCategoryColor(skill.category)}>
                        {skill.category}
                      </Badge>
                      <Badge className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="text-xs">
                      <Badge variant="outline" className={getSourceColor(skill.source)}>
                        From {skill.source}: {skill.sourceTitle}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {skills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="mb-2">No skills detected yet.</p>
              <p className="text-sm">Add certificates and projects to automatically populate your skills!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillManager;
