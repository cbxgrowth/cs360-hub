
import React from 'react';
import { Badge } from '../../../ui/badge';
import { Switch } from '../../../ui/switch';
import { Permission } from './permissionsData';
import { 
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Search,
  BarChart3,
  Users,
  Settings,
  Shield,
  Database
} from 'lucide-react';

interface PermissionItemProps {
  permission: Permission;
  hasPermission: boolean;
  isDisabled: boolean;
  getCategoryColor: (category: string) => string;
}

const iconMap = {
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Search,
  BarChart3,
  Users,
  Settings,
  Shield,
  Database
};

export const PermissionItem: React.FC<PermissionItemProps> = ({
  permission,
  hasPermission,
  isDisabled,
  getCategoryColor
}) => {
  const IconComponent = iconMap[permission.icon as keyof typeof iconMap] || Eye;

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-3">
        <IconComponent className="w-4 h-4 text-gray-500" />
        <div>
          <p className="text-sm font-medium">{permission.action}</p>
          <p className="text-xs text-gray-500">{permission.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className={getCategoryColor(permission.category)} variant="outline">
          {permission.category}
        </Badge>
        <Switch 
          checked={hasPermission}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};
