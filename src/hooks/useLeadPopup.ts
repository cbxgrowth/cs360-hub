
import { useState, useEffect } from 'react';

export const useLeadPopup = (delayInSeconds: number = 10) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
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
        sessionStorage.setItem('leadPopupShown', 'true');
      }
    }, delayInSeconds * 1000);

    return () => clearTimeout(timer);
  }, [delayInSeconds, hasBeenShown]);

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
