
export const NPS_STEPS = {
  CONFIG: 1,
  AUDIENCE: 2,
  EMAIL: 3,
  LINKS: 4
} as const;

export const NPS_STEP_LABELS = {
  [NPS_STEPS.CONFIG]: 'Configuração',
  [NPS_STEPS.AUDIENCE]: 'Público',
  [NPS_STEPS.EMAIL]: 'Email & Agendamento',
  [NPS_STEPS.LINKS]: 'Links & Distribuição'
} as const;

export const DEFAULT_FORM_DATA = {
  name: '',
  description: '',
  selectedSegments: ['all'],
  emailTemplate: 'standard',
  customSubject: '',
  customContent: '',
  scheduledDate: new Date(),
  expiryDate: null,
  reminderEnabled: true,
  reminderDays: 7,
  anonymous: false,
  customLink: '',
  trackingEnabled: true,
  customBranding: false,
  redirectUrl: ''
};

export const SURVEY_SOURCES = [
  { value: 'email', label: 'Email' },
  { value: 'direct', label: 'Link Direto' },
  { value: 'social', label: 'Redes Sociais' },
  { value: 'website', label: 'Website' },
  { value: 'qr-code', label: 'QR Code' },
  { value: 'other', label: 'Outros' }
];
