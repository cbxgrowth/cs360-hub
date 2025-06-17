
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Star, Send, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

interface NPSResponse {
  score: number;
  feedback: string;
  email?: string;
  clientId?: string;
  createdAt: string;
}

interface NPSDataCollectorProps {
  surveyId: string;
  clientInfo?: {
    name: string;
    email: string;
    segment: string;
  };
  onSubmit: (response: NPSResponse) => void;
  isAnonymous?: boolean;
}

export const NPSDataCollector = ({ 
  surveyId, 
  clientInfo, 
  onSubmit, 
  isAnonymous = false 
}: NPSDataCollectorProps) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState(clientInfo?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getScoreCategory = (score: number) => {
    if (score >= 9) return { category: 'promoter', icon: ThumbsUp, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' };
    if (score >= 7) return { category: 'passive', icon: Meh, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' };
    return { category: 'detractor', icon: ThumbsDown, color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' };
  };

  const getFollowUpQuestion = (score: number) => {
    if (score >= 9) return "Que bom! O que mais te agrada em nossa solução?";
    if (score >= 7) return "Obrigado pelo feedback! O que poderíamos melhorar?";
    return "Sentimos muito. O que podemos fazer para melhorar sua experiência?";
  };

  const handleSubmit = async () => {
    if (selectedScore === null) return;

    setIsSubmitting(true);
    
    const response: NPSResponse = {
      score: selectedScore,
      feedback,
      email: isAnonymous ? undefined : email,
      clientId: clientInfo?.name,
      createdAt: new Date().toISOString()
    };

    try {
      await onSubmit(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar resposta NPS:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Obrigado pelo seu feedback!
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Sua opinião é muito importante para continuarmos melhorando.
            </p>
          </div>
          
          {selectedScore !== null && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Star className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                Sua nota: {selectedScore}/10
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Como você avalia nossa solução?
        </CardTitle>
        <p className="text-slate-600 dark:text-slate-300">
          Em uma escala de 0 a 10, o quanto você recomendaria o CS360° para um colega?
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Score Selection */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Sua Nota (0 = Não recomendaria, 10 = Recomendaria totalmente)
          </Label>
          
          <div className="grid grid-cols-11 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <Button
                key={score}
                variant={selectedScore === score ? 'default' : 'outline'}
                className={`h-12 font-bold transition-all ${
                  selectedScore === score 
                    ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600'
                }`}
                onClick={() => setSelectedScore(score)}
              >
                {score}
              </Button>
            ))}
          </div>

          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Muito improvável</span>
            <span>Muito provável</span>
          </div>
        </div>

        {/* Category Badge */}
        {selectedScore !== null && (
          <div className="text-center">
            {(() => {
              const { category, icon: Icon, color, bgColor } = getScoreCategory(selectedScore);
              return (
                <Badge className={`${bgColor} ${color} px-4 py-2 text-sm font-medium capitalize`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {category === 'promoter' ? 'Promotor' : category === 'passive' ? 'Neutro' : 'Detrator'}
                </Badge>
              );
            })()}
          </div>
        )}

        {/* Follow-up Question */}
        {selectedScore !== null && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {getFollowUpQuestion(selectedScore)}
            </Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Compartilhe seus comentários e sugestões..."
              rows={4}
              className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
        )}

        {/* Email for non-anonymous surveys */}
        {!isAnonymous && (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email (opcional)
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
            />
          </div>
        )}

        {/* Client Info Display */}
        {clientInfo && (
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">{clientInfo.name}</strong>
              {clientInfo.segment && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {clientInfo.segment}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={selectedScore === null || isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white h-12 font-medium transition-all hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enviando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar Avaliação
            </div>
          )}
        </Button>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Sua resposta nos ajuda a melhorar continuamente nossos serviços
        </p>
      </CardContent>
    </Card>
  );
};
