
import React from 'react';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Target
} from 'lucide-react';

interface GoalsStatusIconProps {
  status: string;
}

export const GoalsStatusIcon: React.FC<GoalsStatusIconProps> = ({ status }) => {
  switch (status) {
    case 'on-track': return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'at-risk': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    case 'behind': return <Clock className="w-4 h-4 text-red-600" />;
    case 'completed': return <Award className="w-4 h-4 text-blue-600" />;
    default: return <Target className="w-4 h-4 text-gray-600" />;
  }
};
