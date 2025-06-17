
import React, { useState, useRef } from 'react';
import { useToast } from '../../hooks/use-toast';
import { CampaignsOverview } from './reports/CampaignsOverview';
import { CampaignList } from './reports/CampaignList';
import { PerformanceChart } from './reports/PerformanceChart';
import { QuickActions } from './reports/QuickActions';
import { QRCodeDialog } from './reports/QRCodeDialog';
import { Campaign, QRCodeData } from './types/npsReportsTypes';

const campaignData: Campaign[] = [
  {
    id: 1,
    name: 'Pesquisa Q2 2024',
    link: 'cs360.app/nps/q2-2024',
    channel: 'Email',
    sent: 1247,
    responses: 892,
    responseRate: 71.5,
    npsScore: 78,
    status: 'Ativa',
    createdAt: '2024-06-01',
    performance: [
      { day: 1, responses: 45 },
      { day: 2, responses: 123 },
      { day: 3, responses: 189 },
      { day: 4, responses: 267 },
      { day: 5, responses: 334 },
      { day: 6, responses: 456 },
      { day: 7, responses: 567 },
      { day: 8, responses: 678 },
      { day: 9, responses: 789 },
      { day: 10, responses: 892 }
    ]
  },
  {
    id: 2,
    name: 'Pós-Implementação',
    link: 'cs360.app/nps/post-impl',
    channel: 'SMS + Email',
    sent: 567,
    responses: 423,
    responseRate: 74.6,
    npsScore: 85,
    status: 'Finalizada',
    createdAt: '2024-05-15',
    performance: [
      { day: 1, responses: 67 },
      { day: 2, responses: 145 },
      { day: 3, responses: 234 },
      { day: 4, responses: 298 },
      { day: 5, responses: 356 },
      { day: 6, responses: 389 },
      { day: 7, responses: 423 }
    ]
  }
];

interface NPSLinksReportsProps {
  onNewCampaignClick: () => void;
}

export const NPSLinksReports: React.FC<NPSLinksReportsProps> = ({ onNewCampaignClick }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaignData[0]);
  const [copiedLink, setCopiedLink] = useState('');
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    setCopiedLink(link);
    toast({
        title: 'Link Copiado!',
        description: `O link ${link} foi copiado para a área de transferência.`,
    });
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const generateQRCode = (campaign: QRCodeData) => {
    setQrCodeData(campaign);
  };

  const handleDetailsClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setTimeout(() => {
        chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSendEmail = () => {
    const { link, name } = selectedCampaign;
    const fullLink = `https://${link}`;
    const subject = `Participe da nossa pesquisa: ${name}`;
    const body = `Olá,\n\nGostaríamos de convidar você para participar da nossa pesquisa de satisfação. Por favor, acesse o link abaixo:\n\n${fullLink}\n\nObrigado!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({
        title: 'Abrindo cliente de e-mail',
        description: 'Prepare seu e-mail para ser enviado.',
    });
  };

  const handleShareSms = () => {
    const { link, name } = selectedCampaign;
    const fullLink = `https://${link}`;
    navigator.clipboard.writeText(`Participe da pesquisa "${name}": ${fullLink}`);
    toast({
        title: 'Conteúdo para SMS copiado!',
        description: 'Cole no seu aplicativo de mensagens para compartilhar.',
    });
  };

  const handleExportData = () => {
    const { name, performance } = selectedCampaign;
    const headers = "Dia,Respostas Acumuladas\n";
    const csvContent = "data:text/csv;charset=utf-8,"
      + headers
      + performance.map(e => `${e.day},${e.responses}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const linkEl = document.createElement("a");
    linkEl.setAttribute("href", encodedUri);
    linkEl.setAttribute("download", `performance_${name.replace(/ /g, '_')}.csv`);
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);

    toast({
      title: "Exportação Concluída",
      description: `Os dados de performance da campanha "${name}" foram exportados.`,
    });
  };

  return (
    <div className="space-y-6">
      <CampaignsOverview />
      <CampaignList
        campaigns={campaignData}
        onNewCampaignClick={onNewCampaignClick}
        onDetailsClick={handleDetailsClick}
        onGenerateQRCode={generateQRCode}
        copiedLink={copiedLink}
        onCopyLink={copyToClipboard}
      />
      <PerformanceChart
        selectedCampaign={selectedCampaign}
        chartRef={chartRef}
      />
      <QuickActions
        onSendEmail={handleSendEmail}
        onShareSms={handleShareSms}
        onExportData={handleExportData}
      />
      <QRCodeDialog
        qrCodeData={qrCodeData}
        onOpenChange={(isOpen) => !isOpen && setQrCodeData(null)}
      />
    </div>
  );
};
