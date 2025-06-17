
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { ExternalLink, Copy, QrCode, Eye, Share2, Clock } from 'lucide-react';
import { Campaign, QRCodeData } from '../types/npsReportsTypes';

const getStatusColor = (status: string) => {
    return status === 'Ativa'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
};

interface CampaignListProps {
  campaigns: Campaign[];
  onNewCampaignClick: () => void;
  onDetailsClick: (campaign: Campaign) => void;
  onGenerateQRCode: (campaign: QRCodeData) => void;
  copiedLink: string;
  onCopyLink: (link: string) => void;
}

export const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onNewCampaignClick,
  onDetailsClick,
  onGenerateQRCode,
  copiedLink,
  onCopyLink
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            Campanhas & Links
          </CardTitle>
          <Button
            onClick={onNewCampaignClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            Nova Campanha
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {campaign.name}
                    </h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline">{campaign.channel}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>📊 {campaign.responses}/{campaign.sent} respostas</span>
                    <span>📈 {campaign.responseRate}% taxa</span>
                    <span>⭐ NPS {campaign.npsScore}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {campaign.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                    <Input
                      value={`https://${campaign.link}`}
                      readOnly
                      className="border-0 bg-transparent text-sm"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onCopyLink(campaign.link)}
                      className="text-blue-600"
                    >
                      <Copy className="w-4 h-4" />
                      {copiedLink === campaign.link ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onGenerateQRCode(campaign)}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDetailsClick(campaign)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
