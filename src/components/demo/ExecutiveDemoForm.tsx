
import React from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Crown, Clock, Loader2 } from 'lucide-react';
import { useExecutiveDemoForm } from '../../hooks/useExecutiveDemoForm';
import { PartnerFields } from './PartnerFields';
import { FormSuccessState } from './FormSuccessState';
import { PersonalInfoFields } from './PersonalInfoFields';
import { CompanyInfoFields } from './CompanyInfoFields';
import { SchedulingFields } from './SchedulingFields';
import { InterestTypeSelector } from './InterestTypeSelector';

export const ExecutiveDemoForm = () => {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    referralLink,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    resetForm,
    isFormValid
  } = useExecutiveDemoForm();

  if (isSubmitted) {
    return (
      <FormSuccessState 
        formData={formData}
        referralLink={referralLink}
        onReset={resetForm}
      />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Demonstração Executiva Exclusiva
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Agende sua Demonstração C-Level
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Demonstração personalizada de 45 minutos com nossos especialistas
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de Interesse */}
          <InterestTypeSelector 
            formData={formData}
            handleSelectChange={handleSelectChange}
          />

          {/* Campos específicos para Parceiros */}
          {formData.demoType === 'partner' && (
            <PartnerFields
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleCheckboxChange={handleCheckboxChange}
              referralLink={referralLink}
            />
          )}

          {/* Dados Pessoais */}
          <PersonalInfoFields
            formData={formData}
            handleInputChange={handleInputChange}
          />

          {/* Dados da Empresa */}
          <CompanyInfoFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />

          {/* Agendamento */}
          <SchedulingFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />

          {/* Mensagem Adicional */}
          <div className="space-y-2">
            <Label htmlFor="message">Objetivos da Demonstração (Opcional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Conte-nos mais sobre seus objetivos e o que gostaria de ver na demonstração..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 mr-2" />
                {formData.demoType === 'partner' && formData.partnerType === 'referral'
                  ? 'Registrar Indicação'
                  : 'Agendar Demonstração Executiva'
                }
              </>
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            * Campos obrigatórios. Seus dados estão protegidos pela nossa política de privacidade.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
