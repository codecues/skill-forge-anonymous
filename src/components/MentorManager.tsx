
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, MessageSquare, User, Star } from 'lucide-react';

interface Mentor {
  id: string;
  alias: string; // Masked name
  expertise: string[];
  bio: string;
  experience: string;
  isMyMentor: boolean;
}

const MentorManager = () => {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: '1',
      alias: 'TechGuru99',
      expertise: ['React', 'Node.js', 'System Design'],
      bio: 'Senior Software Engineer with 8+ years of experience in full-stack development.',
      experience: '8+ years',
      isMyMentor: false
    },
    {
      id: '2',
      alias: 'DataWizard42',
      expertise: ['Python', 'Machine Learning', 'Data Science'],
      bio: 'Data Scientist specializing in ML and AI solutions for enterprise applications.',
      experience: '6+ years',
      isMyMentor: true
    }
  ]);
  
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    message: '',
    expertise: ''
  });

  const handleRequestMentorship = (mentorId: string) => {
    console.log(`Mentorship requested for mentor: ${mentorId}`);
    // Here you would typically send the request to the backend
    alert('Mentorship request sent!');
    setShowRequestForm(false);
    setRequestData({ message: '', expertise: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Mentors & Mentorship
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className={`border-l-4 ${mentor.isMyMentor ? 'border-l-green-500' : 'border-l-blue-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{mentor.alias}</h3>
                      <p className="text-sm text-gray-500">{mentor.experience} experience</p>
                    </div>
                    {mentor.isMyMentor && (
                      <Badge className="bg-green-100 text-green-800 ml-auto">
                        <Star className="w-3 h-3 mr-1" />
                        My Mentor
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{mentor.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {!mentor.isMyMentor ? (
                      <Button
                        size="sm"
                        onClick={() => setShowRequestForm(true)}
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Mentorship
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {showRequestForm && (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Request Mentorship</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Area of expertise you need help with"
                    value={requestData.expertise}
                    onChange={(e) => setRequestData({ ...requestData, expertise: e.target.value })}
                  />
                  <Textarea
                    placeholder="Why do you want this mentorship? What are your goals?"
                    value={requestData.message}
                    onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleRequestMentorship('1')}>
                      Send Request
                    </Button>
                    <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {mentors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No mentors available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorManager;
