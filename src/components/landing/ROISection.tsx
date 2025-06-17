
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

const roiMetrics = [
  {
    icon: DollarSign,
    metric: 'R$ 2.5M',
    label: 'Receita Retida Média',
    description: 'Por ano com redução de 60% no churn',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Clock,
    metric: '75%',
    label: 'Redução de Tempo',
    description: 'Em tarefas manuais com automação',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Users,
    metric: '300%',
    label: 'Aumento de Eficiência',
    description: 'Da equipe de Customer Success',
    color: 'from-purple-500 to-violet-600'
  },
  {
    icon: TrendingUp,
    metric: '850%',
    label: 'ROI Médio',
    description: 'No primeiro ano de implementação',
    color: 'from-orange-500 to-red-500'
  }
];

const caseStudy = {
  company: 'TechCorp Brasil',
  industry: 'SaaS Enterprise',
  employees: '500+',
  results: [
    { metric: 'ARR', before: 'R$ 50M', after: 'R$ 200M', improvement: '+300%' },
    { metric: 'Churn Rate', before: '15%', after: '3%', improvement: '-80%' },
    { metric: 'NPS', before: '45', after: '78', improvement: '+73%' },
    { metric: 'Time to Value', before: '90 dias', after: '15 dias', improvement: '-83%' }
  ]
};

export const ROISection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-8 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200 px-4 py-2 text-base font-semibold">
            <TrendingUp className="w-4 h-4 mr-2" />
            ROI Comprovado
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6">
            Impacto Financeiro
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Mensurado e Garantido
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dados reais de clientes que transformaram Customer Success em motor de crescimento
          </p>
        </div>
        
        {/* ROI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {roiMetrics.map((metric, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                  <metric.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">{metric.metric}</div>
                <div className="font-bold text-slate-800 mb-2 text-sm lg:text-base">{metric.label}</div>
                <div className="text-slate-600 text-xs lg:text-sm leading-relaxed">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Case Study */}
        <Card className="bg-white border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 font-semibold">
                Case Study
              </Badge>
              <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-2">
                {caseStudy.company}
              </h3>
              <p className="text-slate-600">
                {caseStudy.industry} • {caseStudy.employees} funcionários
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="text-center p-4 bg-slate-50 rounded-xl">
                  <div className="text-lg font-black text-slate-900 mb-1">{result.metric}</div>
                  <div className="text-sm text-slate-600 mb-2">
                    <span className="line-through">{result.before}</span> → <span className="font-bold">{result.after}</span>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs font-bold">
                    {result.improvement}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-slate-600 italic">
                "O CS360° transformou nossa operação em apenas 90 dias. ROI de 850% no primeiro ano foi além de todas as expectativas."
              </p>
              <p className="text-slate-800 font-semibold mt-2">
                - Carlos Silva, CEO TechCorp Brasil
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
