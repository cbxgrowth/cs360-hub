
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Edit, Trash2, Mail, Phone, Calendar, Shield, UserCheck, Crown } from 'lucide-react';
import type { InternalUser } from '../../../hooks/useSuperAdmin/types';
import { roles } from './constants';

interface TeamMemberCardProps {
  user: InternalUser;
  onDelete: (userId: string) => void;
}

export const TeamMemberCard = ({ user, onDelete }: TeamMemberCardProps) => {
  const getRoleConfig = (role: string) => {
    return roles.find(r => r.value === role) || roles[0];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const roleConfig = getRoleConfig(user.role);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{user.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge className={roleConfig.color}>
                {user.role === 'financeiro' && <Crown className="w-3 h-3 mr-1" />}
                {user.role === 'comercial' && <Shield className="w-3 h-3 mr-1" />}
                {user.role === 'cs' && <UserCheck className="w-3 h-3 mr-1" />}
                {roleConfig.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{user.phone}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Desde {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          <span className="font-medium">Departamento:</span> {user.department?.charAt(0).toUpperCase() + user.department?.slice(1)}
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onDelete(user.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
