import type { EmailProvider } from '@/types/campaign';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private provider: EmailProvider | null = null;

  setProvider(provider: EmailProvider): void {
    this.provider = provider;
  }

  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    if (!this.provider) {
      return { success: false, error: 'Email provider not configured' };
    }

    try {
      // Simular envio de email
      console.log('Sending email:', {
        provider: this.provider.name,
        to: options.to,
        subject: options.subject
      });

      // Em produção, implementar integração real com SendGrid/Mailgun
      await new Promise(resolve => setTimeout(resolve, 500));

      return { 
        success: true, 
        messageId: `msg_${Date.now()}`
      };
    } catch (error: any) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async sendTestEmail(to: string): Promise<EmailResult> {
    return this.sendEmail({
      to,
      subject: 'Test Email from CS360 Hub',
      html: '<h1>Test Email</h1><p>This is a test email from CS360 Hub.</p>',
      text: 'Test Email\n\nThis is a test email from CS360 Hub.',
      from: this.provider?.from_email || 'noreply@cs360hub.com'
    });
  }

  async sendBulkEmails(emails: EmailOptions[]): Promise<EmailResult[]> {
    const results: EmailResult[] = [];

    for (const email of emails) {
      const result = await this.sendEmail(email);
      results.push(result);
      
      // Delay para evitar rate limiting
      await this.delay(100);
    }

    return results;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const emailService = new EmailService();
