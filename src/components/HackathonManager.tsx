
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code, Plus, MapPin, Users, Trophy } from 'lucide-react';

interface Hackathon {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  teamSize: number;
  prize?: string;
  skills: string[];
  projectTitle?: string;
  projectDescription?: string;
}

const HackathonManager = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    teamSize: 1,
    prize: '',
    skills: '',
    projectTitle: '',
    projectDescription: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHackathon: Hackathon = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      teamSize: formData.teamSize,
      prize: formData.prize || undefined,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      projectTitle: formData.projectTitle || undefined,
      projectDescription: formData.projectDescription || undefined
    };
    setHackathons([newHackathon, ...hackathons]);
    setFormData({
      name: '',
      description: '',
      date: '',
      location: '',
      teamSize: 1,
      prize: '',
      skills: '',
      projectTitle: '',
      projectDescription: ''
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Hackathons ({hackathons.length})
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Hackathon
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Card className="mb-6 border-dashed">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Hackathon name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Hackathon description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Team size"
                      type="number"
                      min="1"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                      required
                    />
                    <Input
                      placeholder="Prize (optional)"
                      value={formData.prize}
                      onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Skills used (comma separated)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                  <Input
                    placeholder="Project title (optional)"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  />
                  <Textarea
                    placeholder="Project description (optional)"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button type="submit">Add Hackathon</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {hackathons.map((hackathon) => (
              <Card key={hackathon.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{hackathon.name}</h3>
                        {hackathon.prize && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Trophy className="w-3 h-3 mr-1" />
                            {hackathon.prize}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{hackathon.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {hackathon.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Team of {hackathon.teamSize}
                        </div>
                        <div>
                          {new Date(hackathon.date).toLocaleDateString()}
                        </div>
                      </div>

                      {hackathon.projectTitle && (
                        <div className="mb-3">
                          <h4 className="font-medium text-sm text-gray-700">Project: {hackathon.projectTitle}</h4>
                          {hackathon.projectDescription && (
                            <p className="text-xs text-gray-600 mt-1">{hackathon.projectDescription}</p>
                          )}
                        </div>
                      )}

                      {hackathon.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {hackathon.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {hackathons.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No hackathons added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HackathonManager;
