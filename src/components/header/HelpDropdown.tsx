
import React from 'react';
import { HelpCircle, MessageSquare, Globe, User } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const HelpDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" align="end">
        <DropdownMenuLabel className="text-slate-700 dark:text-slate-300">Ajuda & Suporte</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
        <DropdownMenuItem className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <MessageSquare className="mr-2 h-4 w-4" />
          Central de Ajuda
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <Globe className="mr-2 h-4 w-4" />
          Documentação
        </DropdownMenuItem>
        <DropdownMenuItem className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <User className="mr-2 h-4 w-4" />
          Contatar Suporte
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
