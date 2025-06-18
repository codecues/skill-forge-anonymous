
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, ExternalLink, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishDate: string;
  tags: string[];
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    url: '',
    publishDate: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: formData.title,
      summary: formData.summary,
      url: formData.url,
      publishDate: formData.publishDate,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    setPosts([...posts, newPost]);
    setFormData({ title: '', summary: '', url: '', publishDate: '', tags: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Blog Posts ({posts.length})
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Blog Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Card className="mb-6 border-dashed">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Blog post title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Brief summary of the blog post"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Blog post URL"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Publish date"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button type="submit">Add Blog Post</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.summary}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(post.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Post
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No blog posts added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager;
