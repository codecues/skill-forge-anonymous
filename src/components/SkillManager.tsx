
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Tag, X, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
}

const SkillManager = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React', category: 'Programming', level: 'Advanced' },
    { id: '2', name: 'Python', category: 'Programming', level: 'Intermediate' },
    { id: '3', name: 'UI/UX Design', category: 'Design', level: 'Advanced' },
    { id: '4', name: 'Team Leadership', category: 'Soft Skills', level: 'Intermediate' },
  ]);

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    level: ''
  });

  const categories = ['Programming', 'Design', 'Soft Skills', 'Data Science', 'Marketing', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const addSkill = () => {
    if (!newSkill.name || !newSkill.category || !newSkill.level) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      ...newSkill
    };

    setSkills([...skills, skill]);
    setNewSkill({ name: '', category: '', level: '' });
    
    toast({
      title: "Skill Added",
      description: `${newSkill.name} has been added to your skillset!`
    });
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
    toast({
      title: "Skill Removed",
      description: "Skill has been removed from your skillset"
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Add New Skill
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
            </div>
            <div>
              <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={newSkill.level} onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addSkill} className="bg-blue-500 hover:bg-blue-600">
              Add Skill
            </Button>
          </div>
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
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
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
          
          {skills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No skills added yet. Add your first skill above!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillManager;
