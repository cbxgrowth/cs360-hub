
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, TrendingUp } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    benefits: string;
  };
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <Card className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <feature.icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-gray-900 mb-2">{feature.title}</CardTitle>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 mb-6">
          {feature.features.map((item, idx) => (
            <div key={idx} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 mb-1">Benefício Principal</div>
              <div className="text-blue-700 text-sm">{feature.benefits}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
