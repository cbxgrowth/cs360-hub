
import React from 'react';

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border rounded-xl shadow-2xl border-gray-200 dark:border-gray-600">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'rate' ? '%' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const COLORS = {
  promoters: '#10B981',
  passives: '#F59E0B', 
  detractors: '#EF4444',
  primary: '#3B82F6',
  secondary: '#8B5CF6'
};
