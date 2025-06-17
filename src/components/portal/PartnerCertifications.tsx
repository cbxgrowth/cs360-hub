
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Award, ExternalLink } from 'lucide-react';

export const PartnerCertifications = () => {
  const certifications = [
    { name: "Vendas SaaS", completed: true, progress: 100 },
    { name: "Implantação do Sistema", completed: true, progress: 100 },
    { name: "Sucesso do Cliente", completed: true, progress: 100 },
    { name: "Suporte e Retenção", completed: false, progress: 60 },
    { name: "Marca e Experiência", completed: false, progress: 0 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Suas Certificações</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{cert.name}</h4>
                    {cert.completed && (
                      <Badge variant="default">
                        <Award className="w-3 h-3 mr-1" />
                        Concluída
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <Progress value={cert.progress} className="h-2" />
                    <span className="text-sm text-muted-foreground mt-1">{cert.progress}% concluído</span>
                  </div>
                </div>
                <Button size="sm" variant={cert.completed ? "outline" : "default"}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {cert.completed ? "Visualizar" : "Continuar"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
