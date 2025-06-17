
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar } from 'lucide-react';

export const TodaySchedule = () => {
  const schedule = [
    { time: '09:00', event: 'Ligação TechCorp', type: 'call' },
    { time: '11:30', event: 'Review StartupXYZ', type: 'meeting' },
    { time: '14:00', event: 'Análise de dados', type: 'analysis' },
    { time: '16:30', event: 'Follow-up emails', type: 'email' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calendar className="w-5 h-5 mr-2" />
          Agenda de Hoje
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {schedule.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{item.event}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.time}</p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
