
import React, { useState, useEffect } from 'react';
import { Logo } from './navigation/Logo';
import { DesktopNavigation } from './navigation/DesktopNavigation';
import { ActionButtons } from './navigation/ActionButtons';
import { MobileMenu } from './navigation/MobileMenu';

export const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 20;
      
      // Auto-hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setIsScrolled(scrolled);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside the navigation area
      const target = event.target as Element;
      if (!target.closest('[data-dropdown-container]')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside, true);
      return () => document.removeEventListener('click', handleClickOutside, true);
    }
  }, [activeDropdown]);

  const handleDropdownToggle = (label: string) => {
    console.log('Dropdown toggle:', label, 'current active:', activeDropdown);
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleDropdownClose = () => {
    console.log('Dropdown close');
    setActiveDropdown(null);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close dropdown when mobile menu is toggled
    setActiveDropdown(null);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' 
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? 'h-14' : 'h-16'
            }`}
            data-dropdown-container
          >
            <Logo isCompact={isScrolled} />
            
            <DesktopNavigation 
              activeDropdown={activeDropdown}
              onDropdownToggle={handleDropdownToggle}
              onDropdownClose={handleDropdownClose}
              isCompact={isScrolled}
            />
            
            <ActionButtons 
              isMenuOpen={isMenuOpen}
              onMenuToggle={handleMenuToggle}
              isCompact={isScrolled}
            />
          </div>
          
          <MobileMenu 
            isOpen={isMenuOpen} 
            onClose={handleMenuClose} 
          />
        </div>
        
        {/* Enhanced backdrop for dropdowns */}
        {activeDropdown && (
          <div 
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-200" 
            onClick={handleDropdownClose}
          />
        )}
      </header>

      {/* Spacer to prevent content jump */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`} />
    </>
  );
};
