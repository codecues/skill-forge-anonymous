
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Award, PlusCircle, ExternalLink, Calendar, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verificationLink: string;
}

const CertificateManager = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'React Developer Certification',
      issuer: 'Tech Academy',
      date: '2024-01-15',
      description: 'Comprehensive certification covering React fundamentals, hooks, and advanced patterns.',
      verificationLink: 'https://example.com/verify/123'
    },
    {
      id: '2',
      title: 'UX Design Professional',
      issuer: 'Design Institute',
      date: '2023-11-20',
      description: 'User experience design principles, prototyping, and user research methodologies.',
      verificationLink: 'https://example.com/verify/456'
    }
  ]);

  const [newCertificate, setNewCertificate] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    verificationLink: ''
  });

  const [showForm, setShowForm] = useState(false);

  const addCertificate = () => {
    if (!newCertificate.title || !newCertificate.issuer || !newCertificate.date) {
      toast({
        title: "Error",
        description: "Please fill in required fields (title, issuer, date)",
        variant: "destructive"
      });
      return;
    }

    const certificate: Certificate = {
      id: Date.now().toString(),
      ...newCertificate
    };

    setCertificates([certificate, ...certificates]);
    setNewCertificate({
      title: '',
      issuer: '',
      date: '',
      description: '',
      verificationLink: ''
    });
    setShowForm(false);
    
    toast({
      title: "Certificate Added",
      description: `${newCertificate.title} has been added to your profile!`
    });
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
      {/* Add Certificate Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificates</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Certificate
        </Button>
      </div>

      {/* Add Certificate Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Add New Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title *</label>
                <Input
                  placeholder="Certificate title"
                  value={newCertificate.title}
                  onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Issuer *</label>
                <Input
                  placeholder="Issuing organization"
                  value={newCertificate.issuer}
                  onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Date Issued *</label>
                <Input
                  type="date"
                  value={newCertificate.date}
                  onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Verification Link</label>
                <Input
                  placeholder="https://example.com/verify"
                  value={newCertificate.verificationLink}
                  onChange={(e) => setNewCertificate({ ...newCertificate, verificationLink: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                placeholder="Brief description of the certification..."
                rows={3}
                value={newCertificate.description}
                onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={addCertificate} className="bg-purple-500 hover:bg-purple-600">
                Add Certificate
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
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
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(certificate.verificationLink, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify Certificate
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Certificates Yet</h3>
            <p className="text-gray-500 mb-4">
              Add your first certificate to showcase your achievements and credentials.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Your First Certificate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CertificateManager;
