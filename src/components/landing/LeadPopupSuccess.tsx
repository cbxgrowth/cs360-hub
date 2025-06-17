
import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Crown, CheckCircle } from 'lucide-react';

interface LeadPopupSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadPopupSuccess: React.FC<LeadPopupSuccessProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-2xl">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4">
            PlayBook Enviado!
          </h3>
          <p className="text-slate-600 mb-6">
            Verifique seu email. O PlayBook Executivo foi enviado com estratégias exclusivas para transformar seu CS.
          </p>
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Conteúdo C-Level Exclusivo
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};
