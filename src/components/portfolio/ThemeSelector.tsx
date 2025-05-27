
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Crown, Check } from 'lucide-react';
import { usePortfolioThemes } from '@/hooks/usePortfolioThemes';
import PortfolioSection from './PortfolioSection';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeName: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const { themes, loading } = usePortfolioThemes();

  if (loading) {
    return (
      <PortfolioSection title="Portfolio Theme" icon={<Palette className="h-5 w-5" />}>
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading themes...</p>
        </div>
      </PortfolioSection>
    );
  }

  return (
    <PortfolioSection title="Portfolio Theme" icon={<Palette className="h-5 w-5" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedTheme === theme.name
                ? 'ring-2 ring-purple-500 bg-purple-500/20'
                : 'bg-white/10 hover:bg-white/20'
            } border-white/20`}
            onClick={() => onThemeChange(theme.name)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2">
                  <span>{theme.display_name}</span>
                  {theme.is_premium && <Crown className="h-4 w-4 text-yellow-400" />}
                </span>
                {selectedTheme === theme.name && (
                  <Check className="h-4 w-4 text-green-400" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-300 mb-3">{theme.description}</p>
              
              {/* Color Preview */}
              <div className="flex space-x-2 mb-3">
                <div
                  className="w-6 h-6 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.config?.colors?.primary || '#3B82F6' }}
                />
                <div
                  className="w-6 h-6 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.config?.colors?.secondary || '#1E40AF' }}
                />
                <div
                  className="w-6 h-6 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.config?.colors?.background || '#FFFFFF' }}
                />
              </div>

              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  {theme.config?.layout || 'Standard'}
                </Badge>
                {theme.config?.animations && (
                  <Badge variant="outline" className="text-xs">
                    Animated
                  </Badge>
                )}
                {theme.is_premium && (
                  <Badge className="text-xs bg-yellow-500/20 text-yellow-300">
                    Premium
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
        <h4 className="font-semibold text-blue-300 mb-2">Theme Features</h4>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Responsive design optimized for all devices</li>
          <li>• Customizable colors and typography</li>
          <li>• SEO-friendly structure</li>
          <li>• Fast loading animations</li>
        </ul>
      </div>
    </PortfolioSection>
  );
};

export default ThemeSelector;
