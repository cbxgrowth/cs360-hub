
import React from 'react';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { clientSegments } from './NPSSurveySegments';

interface NPSSurveyAudienceStepProps {
  selectedSegments: string[];
  onSegmentToggle: (segmentId: string) => void;
  onRemoveSegment: (segmentId: string) => void;
  getTotalRecipients: () => number;
}

export const NPSSurveyAudienceStep = ({ 
  selectedSegments, 
  onSegmentToggle, 
  onRemoveSegment, 
  getTotalRecipients 
}: NPSSurveyAudienceStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Seleção do Público</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientSegments.map((segment) => (
          <div
            key={segment.id}
            className={cn(
              "p-4 border rounded-lg cursor-pointer transition-colors",
              selectedSegments.includes(segment.id)
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300"
            )}
            onClick={() => onSegmentToggle(segment.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{segment.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{segment.count} clientes</div>
              </div>
              <input
                type="checkbox"
                checked={selectedSegments.includes(segment.id)}
                onChange={() => {}}
                className="rounded"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedSegments.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm text-gray-600 dark:text-gray-400">Segmentos Selecionados:</Label>
            <Badge variant="outline" className="text-blue-600 dark:text-blue-400">
              {getTotalRecipients()} destinatários
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSegments.map((segmentId) => {
              const segment = clientSegments.find(s => s.id === segmentId);
              return segment ? (
                <Badge key={segmentId} variant="secondary" className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  {segment.name} ({segment.count})
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => onRemoveSegment(segmentId)}
                  />
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
