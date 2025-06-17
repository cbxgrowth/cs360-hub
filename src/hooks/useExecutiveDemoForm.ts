
import { useState } from 'react';

interface ExecutiveDemoFormData {
  name: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  employees: string;
  revenue: string;
  demoType: 'partner' | 'customer';
  preferredDate: string;
  preferredTime: string;
  message: string;
  
  // Campos específicos para parceiros
  partnerType: 'agency' | 'consulting' | 'referral' | '';
  activeClients: string;
  hasProspects: boolean;
  prospectsDescription: string;
  
  // Dados do cliente indicado (para referral)
  referralClientName: string;
  referralClientEmail: string;
  referralClientCompany: string;
  referralClientPhone: string;
}

export const useExecutiveDemoForm = () => {
  const [formData, setFormData] = useState<ExecutiveDemoFormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    employees: '',
    revenue: '',
    demoType: 'customer',
    preferredDate: '',
    preferredTime: '',
    message: '',
    
    // Campos específicos para parceiros
    partnerType: '',
    activeClients: '',
    hasProspects: false,
    prospectsDescription: '',
    
    // Dados do cliente indicado
    referralClientName: '',
    referralClientEmail: '',
    referralClientCompany: '',
    referralClientPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const generateReferralLink = () => {
    if (formData.partnerType === 'referral' && formData.referralClientEmail) {
      const baseUrl = window.location.origin;
      const encodedEmail = encodeURIComponent(formData.referralClientEmail);
      const encodedPartner = encodeURIComponent(formData.email);
      return `${baseUrl}/executive-demo?ref=${encodedPartner}&client=${encodedEmail}`;
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Gerar link de indicação se for o caso
    if (formData.partnerType === 'referral') {
      const link = generateReferralLink();
      setReferralLink(link);
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Executive Demo Form Data:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setReferralLink('');
    setFormData({
      name: '',
      email: '',
      company: '',
      position: '',
      phone: '',
      employees: '',
      revenue: '',
      demoType: 'customer',
      preferredDate: '',
      preferredTime: '',
      message: '',
      partnerType: '',
      activeClients: '',
      hasProspects: false,
      prospectsDescription: '',
      referralClientName: '',
      referralClientEmail: '',
      referralClientCompany: '',
      referralClientPhone: ''
    });
  };

  const isFormValid = Boolean(
    formData.name && 
    formData.email && 
    formData.company && 
    formData.position && 
    formData.phone &&
    formData.preferredDate &&
    formData.preferredTime &&
    (formData.demoType === 'customer' || 
     (formData.demoType === 'partner' && formData.partnerType && 
      (formData.partnerType !== 'referral' || 
       (formData.referralClientName && formData.referralClientEmail && formData.referralClientCompany)
      )
     )
    )
  );

  return {
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
  };
};
