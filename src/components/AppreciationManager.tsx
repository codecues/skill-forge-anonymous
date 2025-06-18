
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, User, Calendar, Award } from 'lucide-react';

interface Appreciation {
  id: string;
  fromUser: string; // Masked name
  toUser: string; // Masked name
  message: string;
  category: 'Collaboration' | 'Technical Help' | 'Mentorship' | 'Project Contribution' | 'Other';
  date: string;
  isReceived: boolean;
}

const AppreciationManager = () => {
  const [appreciations, setAppreciations] = useState<Appreciation[]>([
    {
      id: '1',
      fromUser: 'CodeMaster88',
      toUser: 'TechExplorer42',
      message: 'Thank you for helping me debug the React component issue. Your explanation was very clear!',
      category: 'Technical Help',
      date: '2024-03-15',
      isReceived: true
    },
    {
      id: '2',
      fromUser: 'TechExplorer42',
      toUser: 'DesignPro456',
      message: 'Great collaboration on the UI design project. Your attention to detail is impressive!',
      category: 'Collaboration',
      date: '2024-03-10',
      isReceived: false
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    toUser: '',
    message: '',
    category: 'Technical Help' as Appreciation['category']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppreciation: Appreciation = {
      id: Date.now().toString(),
      fromUser: 'TechExplorer42', // Current user's masked name
      toUser: formData.toUser,
      message: formData.message,
      category: formData.category,
      date: new Date().toISOString().split('T')[0],
      isReceived: false
    };
    setAppreciations([...appreciations, newAppreciation]);
    setFormData({ toUser: '', message: '', category: 'Technical Help' });
    setShowForm(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Collaboration': 'bg-blue-100 text-blue-800',
      'Technical Help': 'bg-green-100 text-green-800',
      'Mentorship': 'bg-purple-100 text-purple-800',
      'Project Contribution': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  const receivedAppreciations = appreciations.filter(a => a.isReceived);
  const sentAppreciations = appreciations.filter(a => !a.isReceived);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Appreciations
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Send Appreciation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Card className="mb-6 border-dashed">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="User's masked name (e.g., CodeNinja123)"
                    value={formData.toUser}
                    onChange={(e) => setFormData({ ...formData, toUser: e.target.value })}
                    required
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Appreciation['category'] })}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="Technical Help">Technical Help</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Project Contribution">Project Contribution</option>
                    <option value="Other">Other</option>
                  </select>
                  <Textarea
                    placeholder="Write your appreciation message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit">Send Appreciation</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Received Appreciations */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Received ({receivedAppreciations.length})
              </h3>
              <div className="space-y-4">
                {receivedAppreciations.map((appreciation) => (
                  <Card key={appreciation.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-sm">{appreciation.fromUser}</span>
                        <Badge className={getCategoryColor(appreciation.category)}>
                          {appreciation.category}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{appreciation.message}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(appreciation.date).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {receivedAppreciations.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No appreciations received yet.</p>
                )}
              </div>
            </div>

            {/* Sent Appreciations */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                Sent ({sentAppreciations.length})
              </h3>
              <div className="space-y-4">
                {sentAppreciations.map((appreciation) => (
                  <Card key={appreciation.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-sm">To: {appreciation.toUser}</span>
                        <Badge className={getCategoryColor(appreciation.category)}>
                          {appreciation.category}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{appreciation.message}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(appreciation.date).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {sentAppreciations.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No appreciations sent yet.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppreciationManager;
