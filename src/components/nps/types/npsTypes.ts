
export interface NPSSurveyFormData {
  name: string;
  description: string;
  selectedSegments: string[];
  emailTemplate: string;
  customSubject: string;
  customContent: string;
  scheduledDate: Date;
  expiryDate: Date | null;
  reminderEnabled: boolean;
  reminderDays: number;
  anonymous: boolean;
  customLink?: string;
  trackingEnabled: boolean;
  customBranding: boolean;
  redirectUrl?: string;
}

export interface ClientSegment {
  id: string;
  name: string;
  count: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export interface NPSData {
  month: string;
  score: number;
  responses: number;
  promoters: number;
  passives: number;
  detractors: number;
}

export interface NPSSurveyLink {
  id: string;
  surveyId: string;
  clientId?: string;
  customSlug: string;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  clickCount: number;
  responseCount: number;
  lastAccessedAt: Date | null;
}

export interface NPSResponse {
  id: string;
  surveyId: string;
  linkId: string;
  clientId?: string;
  score: number;
  feedback?: string;
  followUpResponses?: Record<string, string>;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  source: 'email' | 'direct' | 'social' | 'other';
}

export interface NPSSurveyStats {
  surveyId: string;
  totalLinks: number;
  totalClicks: number;
  totalResponses: number;
  responseRate: number;
  npsScore: number;
  promoters: number;
  passives: number;
  detractors: number;
  avgCompletionTime: number;
  topSources: Array<{ source: string; count: number }>;
  dailyStats: Array<{
    date: string;
    clicks: number;
    responses: number;
    score: number;
  }>;
}
