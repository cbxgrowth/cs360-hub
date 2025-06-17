
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Users } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
}

export const EmptyState = ({ searchTerm }: EmptyStateProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum membro encontrado</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Tente ajustar os filtros de busca' : 'Adicione o primeiro membro da equipe'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
