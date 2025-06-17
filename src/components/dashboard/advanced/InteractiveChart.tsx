
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ChartSettingsModal } from './ChartSettingsModal';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine,
  Dot
} from 'recharts';
import { 
  Play, 
  Pause, 
  Download, 
  Settings, 
  Eye, 
  EyeOff,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

interface InteractiveChartProps {
  title: string;
  subtitle?: string;
  data: Array<{
    name: string;
    value: number;
    predicted?: number;
    target?: number;
    anomaly?: boolean;
  }>;
  type?: 'area' | 'line' | 'bar';
  color?: string;
  gradient?: string[];
  showPrediction?: boolean;
  showAnomalies?: boolean;
  showTarget?: boolean;
  isRealtime?: boolean;
  height?: number;
}

export const InteractiveChart = ({
  title,
  subtitle,
  data,
  color = '#3B82F6',
  gradient = ['from-blue-500', 'to-blue-600'],
  showPrediction = false,
  showAnomalies = false,
  showTarget = false,
  isRealtime = false,
  height = 300
}: InteractiveChartProps) => {
  const [isPlaying, setIsPlaying] = useState(isRealtime);
  const [showPredictions, setShowPredictions] = useState(showPrediction);
  const [showTargetLine, setShowTargetLine] = useState(showTarget);
  const [showAnomalyDetection, setShowAnomalyDetection] = useState(showAnomalies);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chartSettings, setChartSettings] = useState({
    showPredictions: showPrediction,
    showAnomalies: showAnomalies,
    showTarget: showTarget,
    chartType: 'area' as 'area' | 'line' | 'bar',
    color: color,
    height: height,
    refreshInterval: 10000
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.anomaly && showAnomalyDetection) {
      return <Dot cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
    }
    return null;
  };

  const handleSettingsChange = (newSettings: any) => {
    setChartSettings(newSettings);
    setShowPredictions(newSettings.showPredictions);
    setShowTargetLine(newSettings.showTarget);
    setShowAnomalyDetection(newSettings.showAnomalies);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Real-time Controls */}
              {isRealtime && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center space-x-1"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="hidden sm:inline">
                      {isPlaying ? 'Pausar' : 'Executar'}
                    </span>
                  </Button>
                  
                  <Badge 
                    variant="outline" 
                    className={`${isPlaying ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    {isPlaying ? 'Tempo Real' : 'Pausado'}
                  </Badge>
                </>
              )}

              {/* Chart Controls */}
              <div className="flex items-center space-x-1">
                {showPrediction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPredictions(!showPredictions)}
                    className={`p-2 ${showPredictions ? 'bg-blue-100 text-blue-600' : ''}`}
                    title="Toggle Predictions"
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                )}
                
                {showTarget && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTargetLine(!showTargetLine)}
                    className={`p-2 ${showTargetLine ? 'bg-orange-100 text-orange-600' : ''}`}
                    title="Toggle Target Line"
                  >
                    <Target className="w-4 h-4" />
                  </Button>
                )}
                
                {showAnomalies && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAnomalyDetection(!showAnomalyDetection)}
                    className={`p-2 ${showAnomalyDetection ? 'bg-red-100 text-red-600' : ''}`}
                    title="Toggle Anomaly Detection"
                  >
                    <Zap className="w-4 h-4" />
                  </Button>
                )}
                
                <Button variant="ghost" size="sm" className="p-2" title="Download Chart">
                  <Download className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2" 
                  title="Chart Settings"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div style={{ height: `${chartSettings.height}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartSettings.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartSettings.color} stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  stroke="#6B7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6B7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Target Line */}
                {showTargetLine && data[0]?.target && (
                  <ReferenceLine 
                    y={data[0].target} 
                    stroke="#F59E0B" 
                    strokeDasharray="5 5"
                    label={{ value: "Meta", position: "insideTopRight" }}
                  />
                )}
                
                {/* Main Data */}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartSettings.color}
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={<CustomDot />}
                  name="Valor Atual"
                />
                
                {/* Predictions */}
                {showPredictions && (
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fill="url(#colorPredicted)"
                    name="Previsão IA"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend Info */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartSettings.color }}></div>
              <span>Dados Reais</span>
            </div>
            {showPredictions && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Previsão IA</span>
              </div>
            )}
            {showTargetLine && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-orange-500"></div>
                <span>Meta</span>
              </div>
            )}
            {showAnomalyDetection && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Anomalias Detectadas</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ChartSettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={chartSettings}
        onSettingsChange={handleSettingsChange}
      />
    </>
  );
};
