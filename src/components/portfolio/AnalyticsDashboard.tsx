
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Eye, Mouse, Download, Share, Calendar } from 'lucide-react';
import { usePortfolioAnalytics } from '@/hooks/usePortfolioAnalytics';
import PortfolioSection from './PortfolioSection';

interface AnalyticsDashboardProps {
  portfolioId?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ portfolioId }) => {
  const { analytics, loading, getEventCounts } = usePortfolioAnalytics(portfolioId);

  if (loading) {
    return (
      <PortfolioSection title="Analytics" icon={<BarChart3 className="h-5 w-5" />}>
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading analytics...</p>
        </div>
      </PortfolioSection>
    );
  }

  if (!portfolioId) {
    return (
      <PortfolioSection title="Analytics" icon={<BarChart3 className="h-5 w-5" />}>
        <div className="text-center py-8">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Save your portfolio to view analytics</p>
        </div>
      </PortfolioSection>
    );
  }

  const counts = getEventCounts();

  const statCards = [
    { label: 'Total Views', value: counts.views, icon: Eye, color: 'text-blue-400' },
    { label: 'Contact Clicks', value: counts.contactClicks, icon: Mouse, color: 'text-green-400' },
    { label: 'Project Clicks', value: counts.projectClicks, icon: Mouse, color: 'text-purple-400' },
    { label: 'Downloads', value: counts.downloads, icon: Download, color: 'text-orange-400' },
    { label: 'Shares', value: counts.shares, icon: Share, color: 'text-pink-400' },
  ];

  return (
    <PortfolioSection title="Portfolio Analytics" icon={<BarChart3 className="h-5 w-5" />}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {analytics.length > 0 ? (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-300 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Recent Activity</span>
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {analytics.slice(0, 10).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-xs">
                    {event.event_type.replace('_', ' ')}
                  </Badge>
                  <span className="text-sm text-gray-300">
                    {new Date(event.created_at).toLocaleDateString()} at{' '}
                    {new Date(event.created_at).toLocaleTimeString()}
                  </span>
                </div>
                {event.referrer && (
                  <div className="text-xs text-gray-400 truncate max-w-32">
                    from {new URL(event.referrer).hostname}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No analytics data yet</p>
          <p className="text-sm text-gray-500">Share your portfolio to start tracking visits!</p>
        </div>
      )}
    </PortfolioSection>
  );
};

export default AnalyticsDashboard;
