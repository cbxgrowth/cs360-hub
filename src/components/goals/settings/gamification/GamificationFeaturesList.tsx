
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Badge } from '../../../ui/badge';
import { gamificationFeatures, getCategoryColor } from './gamificationData';

interface GamificationFeaturesListProps {
  localSettings: any;
  onFeatureToggle: (featureId: string, enabled: boolean) => void;
}

export const GamificationFeaturesList = ({ localSettings, onFeatureToggle }: GamificationFeaturesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recursos de Gamificação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gamificationFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <feature.icon className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{feature.label}</h4>
                    <Badge className={getCategoryColor(feature.category)} variant="outline">
                      {feature.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
              <Switch
                checked={localSettings.gamification?.[feature.id] ?? feature.defaultEnabled}
                onCheckedChange={(checked) => onFeatureToggle(feature.id, checked)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
