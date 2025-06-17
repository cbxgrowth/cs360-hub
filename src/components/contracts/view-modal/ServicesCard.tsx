
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface ServicesCardProps {
  services?: string[] | null;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({ services }) => {
  if (!services) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Serviços Contratados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(services) ? 
            services.map((service: string, index: number) => (
              <Badge key={index} variant="secondary">
                {service}
              </Badge>
            )) :
            <p className="text-gray-500">Nenhum serviço especificado</p>
          }
        </div>
      </CardContent>
    </Card>
  );
};
