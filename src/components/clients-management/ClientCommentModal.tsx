
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { DisplayClient } from './adapters/clientsAdapter';
import { Loader2 } from 'lucide-react';

interface ClientCommentModalProps {
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (clientId: number, notes: string) => void;
  client: DisplayClient | null;
}

export const ClientCommentModal: React.FC<ClientCommentModalProps> = ({ isOpen, isSaving, onClose, onSubmit, client }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (client) {
      setNotes(client.notes || '');
    }
  }, [client]);

  const handleSubmit = () => {
    if (client) {
      onSubmit(client.id, notes);
    }
  };

  if (!isOpen || !client) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar/Editar Comentário</DialogTitle>
          <DialogDescription>
            Adicione notas para o cliente {client.name}. Essas notas serão visíveis para sua equipe.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="grid gap-2">
            <Label htmlFor="notes">Comentário</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite seu comentário aqui..."
              rows={5}
              disabled={isSaving}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? 'Salvando...' : 'Salvar Comentário'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
