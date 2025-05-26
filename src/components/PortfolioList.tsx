
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Eye, Trash2, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolios } from '@/hooks/usePortfolios';
import { useToast } from '@/hooks/use-toast';

const PortfolioList = () => {
  const navigate = useNavigate();
  const { portfolios, loading, deletePortfolio } = usePortfolios();
  const { toast } = useToast();

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePortfolio(id);
      } catch (error) {
        console.error('Error deleting portfolio:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-white text-center">Loading portfolios...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">My Portfolios</CardTitle>
          <Button
            onClick={() => navigate('/portfolio')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Portfolio
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {portfolios.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No portfolios yet</h3>
              <p className="text-gray-500">Create your first portfolio to showcase your work</p>
            </div>
            <Button
              onClick={() => navigate('/portfolio')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Portfolio
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{portfolio.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        {portfolio.is_published ? (
                          <><Globe className="h-4 w-4 text-green-400" /><span className="text-green-400">Published</span></>
                        ) : (
                          <><Lock className="h-4 w-4 text-gray-500" /><span>Draft</span></>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-gray-400 mb-4">
                    <p>Created: {formatDate(portfolio.created_at)}</p>
                    <p>Updated: {formatDate(portfolio.updated_at)}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/portfolio?id=${portfolio.id}`)}
                      className="flex-1 border-white/20 hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    {portfolio.is_published && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`#`, '_blank')}
                        className="border-white/20 hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(portfolio.id, portfolio.title)}
                      className="border-red-500/50 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioList;
