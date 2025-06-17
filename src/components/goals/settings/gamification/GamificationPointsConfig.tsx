
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { pointsConfig } from './gamificationData';

interface GamificationPointsConfigProps {
  localSettings: any;
  onPointsChange: (pointId: string, value: number) => void;
}

export const GamificationPointsConfig = ({ localSettings, onPointsChange }: GamificationPointsConfigProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Configuração de Pontos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pointsConfig.map((point) => (
            <div key={point.id} className="flex items-center justify-between">
              <Label htmlFor={point.id}>{point.label}</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={point.id}
                  type="number"
                  value={localSettings.points?.[point.id] || point.defaultValue}
                  onChange={(e) => onPointsChange(point.id, parseInt(e.target.value))}
                  min="1"
                  max="1000"
                  className="w-20"
                />
                <span className="text-sm text-gray-500">pts</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
