
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const enterpriseLogos = [
  { 
    name: 'Salesforce', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    color: 'from-blue-500 to-blue-600',
    description: 'CRM Líder'
  },
  { 
    name: 'Microsoft', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg',
    color: 'from-blue-600 to-indigo-600',
    description: 'Suite Corporativa'
  },
  { 
    name: 'HubSpot', 
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    color: 'from-orange-500 to-red-500',
    description: 'Marketing & Vendas'
  },
  { 
    name: 'Pipedrive', 
    logo: 'https://cdn.worldvectorlogo.com/logos/pipedrive.svg',
    color: 'from-green-500 to-emerald-600',
    description: 'Pipeline Inteligente'
  },
  { 
    name: 'Zendesk', 
    logo: 'https://d1eipm3vz40hy0.cloudfront.net/images/AMER/zendesk-logo.png',
    color: 'from-green-600 to-teal-600',
    description: 'Suporte Premium'
  },
  { 
    name: 'Slack', 
    logo: 'https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png',
    color: 'from-purple-500 to-pink-500',
    description: 'Comunicação'
  }
];

const integrationFeatures = [
  { icon: Zap, text: 'Setup em 1 clique', color: 'text-yellow-500' },
  { icon: Shield, text: 'Segurança Enterprise', color: 'text-green-500' },
  { icon: Clock, text: 'Sincronização Real-time', color: 'text-blue-500' }
];

export const IntegrationsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23818CF8' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='15' cy='45' r='1'/%3E%3Ccircle cx='45' cy='15' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <Badge className="mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 text-base font-semibold shadow-lg">
            <Zap className="w-5 h-5 mr-2" />
            20+ Integrações Nativas
          </Badge>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight">
            Integra com Seu
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-2">
              Ecossistema Enterprise
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Conecte-se nativamente com as ferramentas que sua equipe já utiliza.
            <span className="block mt-2 text-sm md:text-base font-medium text-slate-700">
              Zero configuração. Máxima produtividade.
            </span>
          </p>

          {/* Integration Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 mb-16">
            {integrationFeatures.map((feature, index) => (
              <div key={index} className="flex items-center bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
                <feature.icon className={`w-5 h-5 mr-3 ${feature.color}`} />
                <span className="font-semibold text-slate-700 text-sm lg:text-base">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Integration Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 items-center justify-items-center mb-16">
          {enterpriseLogos.map((integration, index) => (
            <div key={index} className="group relative">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-500 p-3 group-hover:scale-110 group-hover:rotate-3 border border-white/20 backdrop-blur-sm">
                <img 
                  src={integration.logo} 
                  alt={integration.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-gray-800 group-hover:text-gray-600 transition-colors text-xs lg:text-sm font-bold text-center">
                  {integration.name}
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl">
                  {integration.description}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="text-2xl lg:text-3xl font-black text-blue-600 mb-2">20+</div>
            <div className="text-slate-600 font-semibold text-xs lg:text-sm">Integrações</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="text-2xl lg:text-3xl font-black text-green-600 mb-2">99.9%</div>
            <div className="text-slate-600 font-semibold text-xs lg:text-sm">Uptime</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="text-2xl lg:text-3xl font-black text-purple-600 mb-2">&lt;2min</div>
            <div className="text-slate-600 font-semibold text-xs lg:text-sm">Setup</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
            <div className="text-2xl lg:text-3xl font-black text-orange-600 mb-2">Zero</div>
            <div className="text-slate-600 font-semibold text-xs lg:text-sm">Código</div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <Link to="/features#integrations">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 shadow-2xl font-black transform hover:scale-105 transition-all duration-300 rounded-2xl border-2 border-white/20"
            >
              Ver Todas as Integrações
              <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
