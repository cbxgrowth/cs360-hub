
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Plus, Send } from 'lucide-react';
import { NPSSurveySteps } from './NPSSurveySteps';
import { NPSSurveyConfigStep } from './NPSSurveyConfigStep';
import { NPSSurveyAudienceStep } from './NPSSurveyAudienceStep';
import { NPSSurveyEmailStep } from './NPSSurveyEmailStep';
import { NPSSurveyLinksStep } from './NPSSurveyLinksStep';
import { useNPSSurvey } from './hooks/useNPSSurvey';

interface NPSSurveyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const NPSSurveyManager = ({ isOpen, onClose, onSubmit }: NPSSurveyManagerProps) => {
  const {
    formData,
    setFormData,
    currentStep,
    handleSegmentToggle,
    removeSegment,
    getTotalRecipients,
    prepareSubmitData,
    nextStep,
    prevStep,
    canProceed
  } = useNPSSurvey();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = prepareSubmitData();
    onSubmit(submitData);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <NPSSurveyConfigStep formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <NPSSurveyAudienceStep
            selectedSegments={formData.selectedSegments}
            onSegmentToggle={handleSegmentToggle}
            onRemoveSegment={removeSegment}
            getTotalRecipients={getTotalRecipients}
          />
        );
      case 3:
        return <NPSSurveyEmailStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <NPSSurveyLinksStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Nova Pesquisa NPS
          </DialogTitle>
        </DialogHeader>

        <NPSSurveySteps currentStep={currentStep} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderCurrentStep()}

          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                >
                  Anterior
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                Cancelar
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!canProceed()}
                >
                  Próximo
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Salvar Rascunho
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Criar & Ativar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
