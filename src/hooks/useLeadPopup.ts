
import { useState, useEffect } from 'react';

export const useLeadPopup = (delayInSeconds: number = 10) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Verificar se estamos no lado do cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Só executar no lado do cliente
    if (!isClient || typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return;
    }

    try {
      // Check if popup has already been shown in this session
      const popupShown = sessionStorage.getItem('leadPopupShown');
      
      if (popupShown) {
        setHasBeenShown(true);
        return;
      }

      const timer = setTimeout(() => {
        if (!hasBeenShown) {
          setIsPopupOpen(true);
          setHasBeenShown(true);
          try {
            sessionStorage.setItem('leadPopupShown', 'true');
          } catch (error) {
            console.warn('Failed to save to sessionStorage:', error);
          }
        }
      }, delayInSeconds * 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.warn('SessionStorage not available:', error);
    }
  }, [delayInSeconds, hasBeenShown, isClient]);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  return {
    isPopupOpen,
    closePopup,
    openPopup,
    hasBeenShown
  };
};
