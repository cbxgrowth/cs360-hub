
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

interface NotificationOptions {
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (options: NotificationOptions) => {
    logger.info(`Success notification: ${options.title}`, { description: options.description });
    toast({
      title: options.title,
      description: options.description,
      duration: options.duration || 5000,
      variant: "default",
    });
  };

  const showError = (options: NotificationOptions) => {
    logger.error(`Error notification: ${options.title}`, { description: options.description });
    toast({
      title: options.title,
      description: options.description,
      duration: options.duration || 8000,
      variant: "destructive",
    });
  };

  const showWarning = (options: NotificationOptions) => {
    logger.warn(`Warning notification: ${options.title}`, { description: options.description });
    toast({
      title: options.title,
      description: options.description,
      duration: options.duration || 6000,
    });
  };

  const showInfo = (options: NotificationOptions) => {
    logger.info(`Info notification: ${options.title}`, { description: options.description });
    toast({
      title: options.title,
      description: options.description,
      duration: options.duration || 5000,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
