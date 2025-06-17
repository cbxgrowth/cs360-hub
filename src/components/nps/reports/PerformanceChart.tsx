
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Campaign } from '../types/npsReportsTypes';

interface PerformanceChartProps {
    selectedCampaign: Campaign;
    chartRef: React.RefObject<HTMLDivElement>;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ selectedCampaign, chartRef }) => {
    return (
        <Card ref={chartRef}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Performance da Campanha: {selectedCampaign.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedCampaign.performance}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="responses"
                            stroke="#10B981"
                            strokeWidth={3}
                            name="Respostas Acumuladas"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
