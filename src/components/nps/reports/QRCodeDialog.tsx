
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { QRCodeData } from '../types/npsReportsTypes';

interface QRCodeDialogProps {
  qrCodeData: QRCodeData | null;
  onOpenChange: (isOpen: boolean) => void;
}

export const QRCodeDialog: React.FC<QRCodeDialogProps> = ({ qrCodeData, onOpenChange }) => {
  return (
    <Dialog open={!!qrCodeData} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code para: {qrCodeData?.name}</DialogTitle>
        </DialogHeader>
        {qrCodeData && (
          <div className="flex flex-col items-center justify-center p-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`https://${qrCodeData.link}`)}`}
              alt={`QR Code for ${qrCodeData.name}`}
              className="rounded-lg border"
            />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Aponte a câmera para escanear o link.
            </p>
            <a href={`https://${qrCodeData.link}`} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-600 hover:underline text-xs">
              {`https://${qrCodeData.link}`}
            </a>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
