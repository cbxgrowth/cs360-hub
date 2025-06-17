
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Mail, MessageSquare, Download, Share2 } from 'lucide-react';

interface QuickActionsProps {
    onSendEmail: () => void;
    onShareSms: () => void;
    onExportData: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onSendEmail, onShareSms, onExportData }) => {
    return (
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-blue-600" />
                    Ações Rápidas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={onSendEmail} className="h-16 flex-col bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border hover:bg-blue-50">
                        <Mail className="w-6 h-6 mb-1" />
                        Enviar por Email
                    </Button>
                    <Button onClick={onShareSms} className="h-16 flex-col bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border hover:bg-blue-50">
                        <MessageSquare className="w-6 h-6 mb-1" />
                        Compartilhar SMS
                    </Button>
                    <Button onClick={onExportData} className="h-16 flex-col bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border hover:bg-blue-50">
                        <Download className="w-6 h-6 mb-1" />
                        Exportar Dados
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
