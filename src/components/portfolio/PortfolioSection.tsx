
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2, Plus } from 'lucide-react';

interface PortfolioSectionProps {
  title: string;
  children: React.ReactNode;
  onAddItem?: () => void;
  onEnhanceWithAI?: () => void;
  addButtonText?: string;
  icon?: React.ReactNode;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  title,
  children,
  onAddItem,
  onEnhanceWithAI,
  addButtonText = "Add",
  icon
}) => {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon}
            <span>{title}</span>
          </div>
          <div className="flex space-x-2">
            {onEnhanceWithAI && (
              <Button
                size="sm"
                variant="outline"
                onClick={onEnhanceWithAI}
                className="bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30"
              >
                <Wand2 className="h-4 w-4 mr-1" />
                Enhance
              </Button>
            )}
            {onAddItem && (
              <Button
                size="sm"
                onClick={onAddItem}
                className="bg-white/10 hover:bg-white/20"
              >
                <Plus className="h-4 w-4 mr-1" />
                {addButtonText}
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
