
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, Filter, Star } from 'lucide-react';

interface FeedbackItem {
  id: number;
  client: string;
  score: number;
  category: string;
  feedback: string;
  date: string;
  segment: string;
}

interface NPSFeedbackTabProps {
  feedbackData: FeedbackItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const getScoreColor = (score: number) => {
  if (score >= 9) return 'text-green-600 dark:text-green-400';
  if (score >= 7) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

const getCategoryColor = (category: string) => {
  const colors = {
    'promoter': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'passive': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'detractor': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};

export const NPSFeedbackTab = ({ feedbackData, searchTerm, onSearchChange }: NPSFeedbackTabProps) => {
  const filteredFeedback = feedbackData.filter(feedback =>
    feedback.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar feedback por cliente ou comentário..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
        <Button variant="outline" size="sm" className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <Card key={item.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{item.client}</span>
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                    <Badge variant="outline">{item.segment}</Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{item.feedback}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Score:</span>
                    <span className={`text-xl font-bold ${getScoreColor(item.score)}`}>{item.score}</span>
                    <div className="flex space-x-1 ml-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.score 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button size="sm" variant="outline" className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    Responder
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
