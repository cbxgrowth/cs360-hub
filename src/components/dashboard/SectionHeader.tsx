
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
}

export const SectionHeader = ({ icon: Icon, title, iconColor = 'text-blue-600' }: SectionHeaderProps) => {
  return (
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
      <Icon className={`w-6 h-6 ${iconColor}`} />
      {title}
    </h2>
  );
};
