
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Settings } from 'lucide-react';
import { userRoles } from './permissionsData';

export const UsersByRole = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Usuários por Função</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userRoles.map((role) => (
            <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <role.icon className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium">{role.label}</h4>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {Math.floor(Math.random() * 20) + 1} usuários
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
