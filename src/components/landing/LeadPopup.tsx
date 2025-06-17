
import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { CheckCircle, X } from 'lucide-react';
import { LeadPopupHeader } from './LeadPopupHeader';
import { LeadPopupForm } from './LeadPopupForm';
import { LeadPopupSuccess } from './LeadPopupSuccess';
import { useLeadPopupForm } from '../../hooks/useLeadPopupForm';

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadPopup: React.FC<LeadPopupProps> = ({ isOpen, onClose }) => {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isFormValid
  } = useLeadPopupForm();

  if (isSubmitted) {
    return <LeadPopupSuccess isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white border-0 shadow-2xl overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          <LeadPopupHeader />

          <LeadPopupForm
            formData={formData}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSubmit={(e) => handleSubmit(e, onClose)}
            isFormValid={isFormValid}
          />

          {/* Trust indicators */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-blue-200/80">
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Sem Spam</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Conteúdo Exclusivo</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
