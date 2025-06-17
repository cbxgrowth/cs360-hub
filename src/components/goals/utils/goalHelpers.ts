
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'on-track': return 'bg-green-100 text-green-800';
    case 'at-risk': return 'bg-yellow-100 text-yellow-800';
    case 'behind': return 'bg-red-100 text-red-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};
