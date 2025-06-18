import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Briefcase, PlusCircle, Calendar, MapPin, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Internship {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  type: 'Remote' | 'On-site' | 'Hybrid';
}

const InternshipManager = () => {
  const { toast } = useToast();
  const [internships, setInternships] = useState<Internship[]>([
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      position: 'Frontend Developer Intern',
      duration: '3 months',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      description: 'Worked on user interface development using React and collaborated with senior developers on mobile-responsive web applications.',
      skills: ['React', 'JavaScript', 'CSS', 'Git'],
      type: 'Remote'
    },
    {
      id: '2',
      company: 'DataTech Solutions',
      position: 'Data Analytics Intern',
      duration: '4 months',
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      description: 'Analyzed large datasets using Python and created data visualizations for business insights.',
      skills: ['Python', 'Pandas', 'Matplotlib', 'SQL'],
      type: 'On-site'
    }
  ]);

  const [newInternship, setNewInternship] = useState({
    company: '',
    position: '',
    duration: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: '',
    type: 'Remote' as Internship['type']
  });

  const [showForm, setShowForm] = useState(false);

  const addInternship = () => {
    if (!newInternship.company || !newInternship.position || !newInternship.description) {
      toast({
        title: "Error",
        description: "Please fill in company, position, and description",
        variant: "destructive"
      });
      return;
    }

    const internship: Internship = {
      id: Date.now().toString(),
      company: newInternship.company,
      position: newInternship.position,
      duration: newInternship.duration,
      startDate: newInternship.startDate,
      endDate: newInternship.endDate,
      description: newInternship.description,
      skills: newInternship.skills.split(',').map(s => s.trim()).filter(s => s),
      type: newInternship.type
    };

    setInternships([internship, ...internships]);
    setNewInternship({
      company: '',
      position: '',
      duration: '',
      startDate: '',
      endDate: '',
      description: '',
      skills: '',
      type: 'Remote'
    });
    setShowForm(false);
    
    toast({
      title: "Internship Added",
      description: `${newInternship.position} at ${newInternship.company} has been added!`
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Remote': 'bg-green-100 text-green-800',
      'On-site': 'bg-blue-100 text-blue-800',
      'Hybrid': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors['Remote'];
  };

  return (
    <div className="space-y-6">
      {/* Add Internship Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Internships</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Internship
        </Button>
      </div>

      {/* Add Internship Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Add New Internship
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Company *</label>
                <Input
                  placeholder="Company name"
                  value={newInternship.company}
                  onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Position *</label>
                <Input
                  placeholder="Internship position"
                  value={newInternship.position}
                  onChange={(e) => setNewInternship({ ...newInternship, position: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Duration</label>
                <Input
                  placeholder="e.g., 3 months"
                  value={newInternship.duration}
                  onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Start Date</label>
                <Input
                  type="date"
                  value={newInternship.startDate}
                  onChange={(e) => setNewInternship({ ...newInternship, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">End Date</label>
                <Input
                  type="date"
                  value={newInternship.endDate}
                  onChange={(e) => setNewInternship({ ...newInternship, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description *</label>
              <Textarea
                placeholder="Describe your internship experience..."
                rows={4}
                value={newInternship.description}
                onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Skills Gained</label>
                <Input
                  placeholder="React, Python, Data Analysis (comma-separated)"
                  value={newInternship.skills}
                  onChange={(e) => setNewInternship({ ...newInternship, skills: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newInternship.type}
                  onChange={(e) => setNewInternship({ ...newInternship, type: e.target.value as Internship['type'] })}
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={addInternship} className="bg-purple-500 hover:bg-purple-600">
                Add Internship
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Internships List View */}
      <div className="space-y-4">
        {internships.map((internship) => (
          <Card key={internship.id} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left side - Company icon and basic info */}
                <div className="flex items-start gap-3 md:w-64 flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{internship.position}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Building className="w-4 h-4" />
                      <span className="text-sm">{internship.company}</span>
                    </div>
                    <Badge className={getTypeColor(internship.type)}>
                      <MapPin className="w-3 h-3 mr-1" />
                      {internship.type}
                    </Badge>
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="flex-1">
                  {/* Duration */}
                  {(internship.duration || internship.startDate) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {internship.duration && `${internship.duration}`}
                        {internship.startDate && ` • ${new Date(internship.startDate).toLocaleDateString()}`}
                        {internship.endDate && ` - ${new Date(internship.endDate).toLocaleDateString()}`}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {internship.description}
                  </p>

                  {/* Skills */}
                  {internship.skills.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">SKILLS GAINED</p>
                      <div className="flex flex-wrap gap-1">
                        {internship.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {internships.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Internships Yet</h3>
            <p className="text-gray-500 mb-4">
              Start building your experience portfolio by adding your first internship!
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Your First Internship
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InternshipManager;
