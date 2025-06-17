
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Send, Calendar } from 'lucide-react';

interface Survey {
  id: number;
  name: string;
  status: string;
  sent: number;
  responses: number;
  responseRate: number;
  npsScore: number;
  createdAt: string;
  expiresAt: string;
}

interface NPSSurveysTabProps {
  surveyData: Survey[];
  onSendSurvey: (surveyId: number) => void;
}

const getScoreColor = (score: number) => {
  if (score >= 9) return 'text-green-600 dark:text-green-400';
  if (score >= 7) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

const getStatusColor = (status: string) => {
  const colors = {
    'ativa': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'finalizada': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'rascunho': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    'pausada': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};

export const NPSSurveysTab = ({ surveyData, onSendSurvey }: NPSSurveysTabProps) => {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pesquisa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enviadas</TableHead>
              <TableHead>Respostas</TableHead>
              <TableHead>Taxa</TableHead>
              <TableHead>NPS</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveyData.map((survey) => (
              <TableRow key={survey.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{survey.name}</div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(survey.status)} capitalize`}>
                    {survey.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{survey.sent}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{survey.responses}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{survey.responseRate}%</TableCell>
                <TableCell>
                  <span className={`font-medium ${getScoreColor(survey.npsScore)}`}>
                    {survey.npsScore || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {survey.createdAt} até {survey.expiresAt}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {survey.status === 'rascunho' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => onSendSurvey(survey.id)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Enviar
                      </Button>
                    )}
                    {survey.status === 'ativa' && (
                      <Button size="sm" variant="outline" className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 mr-1" />
                        Programar
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                      Ver Detalhes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
