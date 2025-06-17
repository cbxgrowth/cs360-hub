import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Youtube,
  Twitter,
  ArrowRight,
  Shield,
  Award,
  Globe,
  Clock,
  Star
} from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_70%)]" />
      
      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CS360°
                </span>
              </div>
              
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                A plataforma de Customer Success com IA que revoluciona resultados. 
                Transforme dados em insights, previna churn e escale seu sucesso.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  SOC 2 Certificado
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Award className="w-3 h-3 mr-1" />
                  LGPD Compliant
                </Badge>
              </div>

              {/* Social links */}
              <div className="flex space-x-3">
                <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h3 className="font-bold text-xl mb-6 text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                Produto
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Funcionalidades', href: '/features', desc: 'Descubra nossas ferramentas' },
                  { name: 'Preços', href: '/pricing', desc: 'Planos flexíveis' },
                  { name: 'Integrações', href: '/features#integrations', desc: '200+ conectores' },
                  { name: 'Segurança', href: '/features#security', desc: 'Proteção enterprise' },
                  { name: 'API', href: '/features#api', desc: 'Desenvolvedores' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="group flex items-start space-x-2 text-slate-400 hover:text-white transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mt-0.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                      <div>
                        <div className="font-medium">{link.name}</div>
                        <div className="text-xs text-slate-500">{link.desc}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company Links */}
            <div>
              <h3 className="font-bold text-xl mb-6 text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-400" />
                Empresa
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Programa de Parceiros', href: '/partners-program', desc: 'Até 40% comissão' },
                  { name: 'Portal do Parceiro', href: '/partner-portal-website', desc: 'Área exclusiva' },
                  { name: 'Blog', href: '/blog', desc: 'Insights e novidades' },
                  { name: 'Central de Ajuda', href: '/help', desc: 'Suporte 24/7' },
                  { name: 'Sobre Nós', href: '/about', desc: 'Nossa história' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="group flex items-start space-x-2 text-slate-400 hover:text-white transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mt-0.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                      <div>
                        <div className="font-medium">{link.name}</div>
                        <div className="text-xs text-slate-500">{link.desc}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="font-bold text-xl mb-6 text-white flex items-center">
                <Phone className="w-5 h-5 mr-2 text-cyan-400" />
                Contato
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium">contato@cs360.com.br</div>
                    <div className="text-xs text-slate-500">Resposta em até 2h</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium">+55 88 98843 2310</div>
                    <div className="text-xs text-slate-500">Seg-Sex 9h às 18h</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium">Juazeiro do Norte, CE</div>
                    <div className="text-xs text-slate-500">Brasil</div>
                  </div>
                </div>
              </div>

              {/* Support status */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium text-sm">Suporte Online</span>
                </div>
                <p className="text-xs text-slate-400">
                  Nossa equipe está disponível para ajudar você agora mesmo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-700/50 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              {/* Legal links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6 text-sm text-slate-400">
                <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                  Política de Privacidade
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors duration-300">
                  Termos de Uso
                </Link>
                <Link to="/cookies" className="hover:text-white transition-colors duration-300">
                  Cookies
                </Link>
                <Link to="/security" className="hover:text-white transition-colors duration-300">
                  Segurança
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-center lg:text-right">
                <p className="text-slate-400 text-sm mb-1">
                  © 2025 CS360° by CBX Growth. Todos os direitos reservados.
                </p>
                <p className="text-slate-500 text-xs">
                  Transformando Customer Success com Inteligência Artificial
                </p>
              </div>
            </div>

            {/* Awards and certifications */}
            <div className="mt-8 pt-6 border-t border-slate-700/30">
              <div className="flex flex-wrap items-center justify-center space-x-8 opacity-60">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Star className="w-4 h-4" />
                  <span>4.9/5 Satisfação</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Shield className="w-4 h-4" />
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Award className="w-4 h-4" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
