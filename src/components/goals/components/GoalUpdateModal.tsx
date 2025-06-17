
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Upload } from 'lucide-react';
import { Goal } from '../types/goalsTypes';

interface GoalUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
  updateValue: string;
  setUpdateValue: (value: string) => void;
  updateComment: string;
  setUpdateComment: (comment: string) => void;
  onUpdate: () => void;
}

export const GoalUpdateModal = ({
  isOpen,
  onClose,
  goal,
  updateValue,
  setUpdateValue,
  updateComment,
  setUpdateComment,
  onUpdate
}: GoalUpdateModalProps) => {
  if (!goal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Meta: {goal.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Valor Atual</label>
            <Input
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
              placeholder={`${goal.current} ${goal.unit}`}
              type="number"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Comentário</label>
            <Textarea
              value={updateComment}
              onChange={(e) => setUpdateComment(e.target.value)}
              placeholder="Descreva o progresso, obstáculos ou conquistas..."
              rows={3}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={onUpdate} className="flex-1">
              Salvar Atualização
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-1" />
              Anexar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
