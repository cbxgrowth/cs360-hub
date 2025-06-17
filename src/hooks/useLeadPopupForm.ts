
import { useState } from 'react';

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  position: string;
  whatsapp: string;
  preferredTime: string;
}

export const useLeadPopupForm = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    whatsapp: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTime: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent, onClose: () => void) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      onClose();
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ 
      name: '', 
      email: '', 
      company: '', 
      position: '', 
      whatsapp: '', 
      preferredTime: '' 
    });
  };

  const isFormValid = Boolean(formData.name && formData.email && formData.company && formData.whatsapp);

  return {
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    resetForm,
    isFormValid
  };
};
