import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';


interface StatCard {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  description?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  stats?: StatCard[];
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<any>;
  };
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  stats,
  actionButton,
  breadcrumbs
}) => {
  const getIconColor = (color: string) => {
    const colors = {
      'blue': 'bg-primary/10 text-primary',
      'green': 'bg-success/10 text-success',
      'yellow': 'bg-warning/10 text-warning',
      'purple': 'bg-purple-100 text-purple-600',
      'red': 'bg-red-100 text-red-600',
      'gray': 'bg-gray-100 text-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              <span className={crumb.href ? 'hover:text-primary cursor-pointer' : ''}>
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Header Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">{title}</h1>
          {description && (
            <p className="text-sm text-[#1E293B]/70">{description}</p>
          )}
        </div>
        
        {actionButton && (
          <Button 
            onClick={actionButton.onClick}
            className="bg-gradient-to-r from-[#4C1D95] to-[#3B82F6] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {actionButton.icon && <actionButton.icon className="w-4 h-4 mr-2" />}
            {actionButton.label}
          </Button>
        )}
      </div>

      {/* Estatísticas */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="gradient-card shadow-card">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${getIconColor(stat.color)}`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.title}</p>
                      {stat.description && (
                        <p className="text-xs text-gray-500">{stat.description}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageHeader; 