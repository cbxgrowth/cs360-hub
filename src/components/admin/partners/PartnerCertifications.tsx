
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  Award, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Play,
  FileText,
  Users,
  Lightbulb
} from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  category: 'sales' | 'implementation' | 'support' | 'product' | 'leadership';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'available' | 'in_progress' | 'completed' | 'locked';
  progress?: number;
  completedAt?: string;
  validUntil?: string;
}

const certifications: Certification[] = [
  {
    id: 'cs-fundamentals',
    name: 'Customer Success Fundamentals',
    category: 'product',
    difficulty: 'beginner',
    duration: '2 horas',
    description: 'Fundamentos do Customer Success e metodologias básicas',
    requirements: ['Cadastro como parceiro'],
    benefits: ['Acesso a materiais básicos', '+5 pontos no score'],
    status: 'completed',
    progress: 100,
    completedAt: '2024-05-15',
    validUntil: '2025-05-15'
  },
  {
    id: 'sales-specialist',
    name: 'Sales Specialist',
    category: 'sales',
    difficulty: 'intermediate',
    duration: '4 horas',
    description: 'Técnicas avançadas de vendas e negociação',
    requirements: ['CS Fundamentals', '10 leads gerados'],
    benefits: ['Comissão adicional de 2%', 'Suporte prioritário'],
    status: 'in_progress',
    progress: 65
  },
  {
    id: 'implementation-expert',
    name: 'Implementation Expert',
    category: 'implementation',
    difficulty: 'advanced',
    duration: '8 horas',
    description: 'Especialização em implementação e onboarding de clientes',
    requirements: ['Sales Specialist', '5 implementações bem-sucedidas'],
    benefits: ['Acesso a projetos premium', '+15% comissão em implementações'],
    status: 'locked'
  },
  {
    id: 'support-master',
    name: 'Support Master',
    category: 'support',
    difficulty: 'intermediate',
    duration: '3 horas',
    description: 'Excelência em atendimento e resolução de problemas',
    requirements: ['CS Fundamentals', 'NPS médio > 8.0'],
    benefits: ['Certificado de qualidade', 'Bônus por satisfação'],
    status: 'available'
  },
  {
    id: 'leadership-program',
    name: 'Partner Leadership Program',
    category: 'leadership',
    difficulty: 'advanced',
    duration: '12 horas',
    description: 'Programa de liderança para parceiros elite',
    requirements: ['3 certificações completas', 'Nível Gold ou superior'],
    benefits: ['Participação em decisões estratégicas', 'Revenue sharing'],
    status: 'locked'
  }
];

const getCategoryIcon = (category: string) => {
  const icons = {
    sales: Users,
    implementation: Play,
    support: Lightbulb,
    product: BookOpen,
    leadership: Award
  };
  return icons[category as keyof typeof icons] || BookOpen;
};

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };
  return colors[difficulty as keyof typeof colors];
};

const getStatusColor = (status: string) => {
  const colors = {
    available: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    locked: 'bg-gray-100 text-gray-800'
  };
  return colors[status as keyof typeof colors];
};

export const PartnerCertifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCertifications = selectedCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  const completedCount = certifications.filter(cert => cert.status === 'completed').length;
  const inProgressCount = certifications.filter(cert => cert.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Certificações</span>
            </div>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{completedCount} Completas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{inProgressCount} Em andamento</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="sales">Vendas</TabsTrigger>
              <TabsTrigger value="implementation">Implementação</TabsTrigger>
              <TabsTrigger value="support">Suporte</TabsTrigger>
              <TabsTrigger value="product">Produto</TabsTrigger>
              <TabsTrigger value="leadership">Liderança</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCertifications.map((cert) => {
                  const CategoryIcon = getCategoryIcon(cert.category);
                  
                  return (
                    <Card key={cert.id} className={`${cert.status === 'locked' ? 'opacity-60' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold">{cert.name}</h3>
                          </div>
                          <Badge className={getStatusColor(cert.status)} variant="outline">
                            {cert.status === 'available' && 'Disponível'}
                            {cert.status === 'in_progress' && 'Em andamento'}
                            {cert.status === 'completed' && 'Completa'}
                            {cert.status === 'locked' && 'Bloqueada'}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className={getDifficultyColor(cert.difficulty)}>
                            {cert.difficulty === 'beginner' && 'Iniciante'}
                            {cert.difficulty === 'intermediate' && 'Intermediário'}
                            {cert.difficulty === 'advanced' && 'Avançado'}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {cert.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                        
                        {cert.status === 'in_progress' && cert.progress && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progresso</span>
                              <span>{cert.progress}%</span>
                            </div>
                            <Progress value={cert.progress} />
                          </div>
                        )}

                        {cert.status === 'completed' && (
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-2 text-green-800">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Completa em {cert.completedAt}
                              </span>
                            </div>
                            <p className="text-xs text-green-700 mt-1">
                              Válida até: {cert.validUntil}
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Requisitos:</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {cert.requirements.map((req, index) => (
                                <li key={index}>• {req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Benefícios:</h4>
                            <ul className="text-xs text-blue-600 space-y-1">
                              {cert.benefits.map((benefit, index) => (
                                <li key={index}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          {cert.status === 'available' && (
                            <Button className="w-full" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Iniciar Certificação
                            </Button>
                          )}
                          {cert.status === 'in_progress' && (
                            <Button className="w-full" variant="outline" size="sm">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Continuar
                            </Button>
                          )}
                          {cert.status === 'completed' && (
                            <Button className="w-full" variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Ver Certificado
                            </Button>
                          )}
                          {cert.status === 'locked' && (
                            <Button className="w-full" variant="ghost" size="sm" disabled>
                              Bloqueada
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
