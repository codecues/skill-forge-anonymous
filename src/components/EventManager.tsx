
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, MapPin, Users } from 'lucide-react';

interface TechEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type: 'Conference' | 'Workshop' | 'Hackathon' | 'Meetup' | 'Webinar';
  skills: string[];
}

const EventManager = () => {
  const [events, setEvents] = useState<TechEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    type: 'Conference' as TechEvent['type'],
    skills: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: TechEvent = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      type: formData.type,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    };
    setEvents([...events, newEvent]);
    setFormData({ name: '', description: '', date: '', location: '', type: 'Conference', skills: '' });
    setShowForm(false);
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Conference': 'bg-blue-100 text-blue-800',
      'Workshop': 'bg-green-100 text-green-800',
      'Hackathon': 'bg-purple-100 text-purple-800',
      'Meetup': 'bg-orange-100 text-orange-800',
      'Webinar': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || colors['Conference'];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Technical Events ({events.length})
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Card className="mb-6 border-dashed">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Event name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Event description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Event date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as TechEvent['type'] })}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                  <Input
                    placeholder="Skills gained (comma separated)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button type="submit">Add Event</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <Card key={event.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{event.name}</h3>
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                  {event.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {event.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No events added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventManager;
