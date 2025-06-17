
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => {
  return (
    <div className="flex items-center flex-1 max-w-md">
      <form onSubmit={onSubmit} className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
        <Input
          placeholder="Buscar clientes, métricas, relatórios..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 bg-slate-50/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 
                     focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500/50 dark:focus:border-blue-400/50
                     transition-all duration-200 rounded-xl text-sm h-10"
        />
      </form>
    </div>
  );
};
