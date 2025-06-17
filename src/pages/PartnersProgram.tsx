import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { MainNavigation } from '../components/MainNavigation';
import { BarChart3, Handshake, Users, Building2, DollarSign, CheckCircle, Star, TrendingUp, Award, Shield, Rocket, ArrowRight, Phone, Mail, User, Building, Globe, Target } from 'lucide-react';
import { WebsiteFooter } from '../components/layout/WebsiteFooter';

const PartnersProgram = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    website: '',
    partnerType: '',
    experience: '',
    clientsCount: '',
    revenue: '',
    goals: '',
    hasTeam: false,
    teamSize: '',
    acceptTerms: false,
    acceptNewsletter: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner registration:', formData);
    // Here you would send the data to your backend
  };

  const partnerTypes = [
    {
      icon: Handshake,
      title: 'Parceiro de Indicação',
      commission: '10% recorrente',
      description: 'Ideal para profissionais que querem monetizar sua rede de contatos',
      benefits: ['Sem investimento inicial', 'Comissão vitalícia', 'Material de apoio', 'Dashboard exclusivo'],
      requirements: ['Rede de contatos em CS', 'Conhecimento básico do mercado'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Parceiro Revendedor',
      commission: 'Até 40%',
      description: 'Para empresas que querem vender nossa solução como parte do seu portfólio',
      benefits: ['Desconto progressivo', 'Suporte dedicado', 'Treinamento completo', 'Materiais de vendas'],
      requirements: ['Equipe de vendas', 'Experiência em SaaS', 'Metas mínimas'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Building2,
      title: 'Parceiro Implementador',
      commission: 'R$ 5.000 - R$ 25.000',
      description: 'Para consultorias especializadas em implementação de Customer Success',
      benefits: ['Projetos exclusivos', 'Margem alta', 'Crescimento escalável', 'Certificação oficial'],
      requirements: ['Equipe técnica', 'Experiência em CS', 'Casos de sucesso'],
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Comissões Competitivas',
      description: 'Até 40% de comissão recorrente'
    },
    {
      icon: Rocket,
      title: 'Crescimento Acelerado',
      description: 'Ferramentas e suporte para escalar rapidamente'
    },
    {
      icon: Award,
      title: 'Certificação Oficial',
      description: 'Programa de certificação reconhecido no mercado'
    },
    {
      icon: Shield,
      title: 'Suporte Dedicado',
      description: 'Equipe especializada para apoiar seu sucesso'
    },
    {
      icon: TrendingUp,
      title: 'Material de Marketing',
      description: 'Kit completo de materiais e campanhas'
    },
    {
      icon: Users,
      title: 'Comunidade Exclusiva',
      description: 'Acesso a rede de parceiros e eventos'
    }
  ];

  const testimonials = [
    {
      name: 'Mariana Santos',
      role: 'Diretora Comercial',
      company: 'TechConsult',
      content: 'Em 18 meses como parceira, aumentamos nossa receita em 300%. O suporte do CS360° é excepcional.',
      results: ['300% ↑ Receita', '50+ Clientes', '18 meses'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face'
    },
    {
      name: 'Carlos Rodrigues',
      role: 'CEO',
      company: 'Growth Partners',
      content: 'Conseguimos criar uma nova linha de negócio lucrativa. As comissões recorrentes mudaram nosso modelo.',
      results: ['40% Margem', 'R$ 2M ARR', '12 meses'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
    }
  ];

  // Função para rolar até o formulário
  const scrollToForm = () => {
    const formElement = document.getElementById('register');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Updated Header with MainNavigation */}
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-2" />
              Programa de Parceiros CS360°
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Cresça conosco e
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent block">
                maximize seus ganhos
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Junte-se ao programa de parceiros mais lucrativo do mercado de Customer Success. 
              <strong className="text-gray-800">Até 40% de comissão recorrente</strong> e suporte completo para seu crescimento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" onClick={scrollToForm}>
                <Handshake className="w-6 h-6 mr-3" />
                Candidatar-se Agora
              </Button>
              <a href="https://wa.me/88988432310" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-2">
                  <Phone className="w-6 h-6 mr-3" />
                  Falar com Especialista
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tipos de Parceria
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o modelo que melhor se adapta ao seu negócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 mb-2">{type.title}</CardTitle>
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-green-600 to-emerald-600">
                    {type.commission}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 text-center">{type.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Benefícios:</h4>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Requisitos:</h4>
                    <div className="space-y-2">
                      {type.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Target className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full group-hover:text-white transition-colors bg-green-700 hover:bg-green-600 font-medium" onClick={scrollToForm}>
                    Escolher Este Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que ser parceiro CS360°?
            </h2>
            <p className="text-xl text-gray-600">
              Benefícios exclusivos para impulsionar seu crescimento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cadastre-se como Parceiro
            </h2>
            <p className="text-xl text-gray-600">
              Preencha o formulário e nossa equipe entrará em contato em até 24 horas
            </p>
          </div>
          
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo *</Label>
                    <Input id="name" type="text" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="mt-1" placeholder="Seu nome completo" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail Corporativo *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="mt-1" placeholder="seu@email.com" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone *</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="mt-1" placeholder="(11) 99999-9999" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">Empresa *</Label>
                    <Input id="company" type="text" value={formData.company} onChange={e => handleInputChange('company', e.target.value)} className="mt-1" placeholder="Nome da sua empresa" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="position" className="text-sm font-medium text-gray-700">Cargo *</Label>
                    <Input id="position" type="text" value={formData.position} onChange={e => handleInputChange('position', e.target.value)} className="mt-1" placeholder="Seu cargo na empresa" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="website" className="text-sm font-medium text-gray-700">Website da Empresa</Label>
                    <Input id="website" type="url" value={formData.website} onChange={e => handleInputChange('website', e.target.value)} className="mt-1" placeholder="https://www.suaempresa.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="partnerType" className="text-sm font-medium text-gray-700">Tipo de Parceria Desejada *</Label>
                  <Select value={formData.partnerType} onValueChange={value => handleInputChange('partnerType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o tipo de parceria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="referral">Parceiro de Indicação</SelectItem>
                      <SelectItem value="reseller">Parceiro Revendedor</SelectItem>
                      <SelectItem value="implementer">Parceiro Implementador</SelectItem>
                      <SelectItem value="not-sure">Não tenho certeza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700">Experiência em Customer Success *</Label>
                    <Select value={formData.experience} onValueChange={value => handleInputChange('experience', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione sua experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante (menos de 1 ano)</SelectItem>
                        <SelectItem value="intermediate">Intermediário (1-3 anos)</SelectItem>
                        <SelectItem value="advanced">Avançado (3-5 anos)</SelectItem>
                        <SelectItem value="expert">Especialista (mais de 5 anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="clientsCount" className="text-sm font-medium text-gray-700">Quantos clientes você atende?</Label>
                    <Select value={formData.clientsCount} onValueChange={value => handleInputChange('clientsCount', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a quantidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 clientes</SelectItem>
                        <SelectItem value="11-50">11-50 clientes</SelectItem>
                        <SelectItem value="51-100">51-100 clientes</SelectItem>
                        <SelectItem value="100+">Mais de 100 clientes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="revenue" className="text-sm font-medium text-gray-700">Faturamento Anual Aproximado</Label>
                  <Select value={formData.revenue} onValueChange={value => handleInputChange('revenue', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione o faturamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100k">Até R$ 100k</SelectItem>
                      <SelectItem value="100k-500k">R$ 100k - R$ 500k</SelectItem>
                      <SelectItem value="500k-1m">R$ 500k - R$ 1M</SelectItem>
                      <SelectItem value="1m-5m">R$ 1M - R$ 5M</SelectItem>
                      <SelectItem value="5m+">Mais de R$ 5M</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="goals" className="text-sm font-medium text-gray-700">Quais são seus objetivos como parceiro? *</Label>
                  <Textarea id="goals" value={formData.goals} onChange={e => handleInputChange('goals', e.target.value)} className="mt-1" placeholder="Descreva seus objetivos e expectativas como parceiro CS360°" rows={4} required />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasTeam" checked={formData.hasTeam} onCheckedChange={checked => handleInputChange('hasTeam', checked as boolean)} />
                  <Label htmlFor="hasTeam" className="text-sm text-gray-700">
                    Possuo equipe para vendas/implementação
                  </Label>
                </div>
                
                {formData.hasTeam && <div>
                    <Label htmlFor="teamSize" className="text-sm font-medium text-gray-700">Tamanho da Equipe</Label>
                    <Select value={formData.teamSize} onValueChange={value => handleInputChange('teamSize', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tamanho da equipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-5">2-5 pessoas</SelectItem>
                        <SelectItem value="6-10">6-10 pessoas</SelectItem>
                        <SelectItem value="11-20">11-20 pessoas</SelectItem>
                        <SelectItem value="20+">Mais de 20 pessoas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>}
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acceptTerms" checked={formData.acceptTerms} onCheckedChange={checked => handleInputChange('acceptTerms', checked as boolean)} required />
                    <Label htmlFor="acceptTerms" className="text-sm text-gray-700">
                      Aceito os <a href="#" className="text-blue-600 hover:underline">termos e condições</a> do programa de parceiros *
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="acceptNewsletter" checked={formData.acceptNewsletter} onCheckedChange={checked => handleInputChange('acceptNewsletter', checked as boolean)} />
                    <Label htmlFor="acceptNewsletter" className="text-sm text-gray-700">
                      Desejo receber newsletter com dicas e novidades sobre o programa
                    </Label>
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-4">
                  <Handshake className="w-5 h-5 mr-2" />
                  Enviar Candidatura
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Parceiros de Sucesso
            </h2>
            <p className="text-xl text-gray-600">
              Veja como nossos parceiros estão prosperando
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => <Card key={index} className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                  </div>
                  
                  <blockquote className="text-gray-700 mb-6 italic text-lg">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center mb-6">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm font-medium text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    {testimonial.results.map((result, idx) => <div key={idx} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{result}</div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para ser nosso próximo parceiro de sucesso?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Junte-se a centenas de parceiros que já faturam 6 dígitos por mês com o CS360°
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-10 py-4" onClick={scrollToForm}>
              <Handshake className="w-6 h-6 mr-3" />
              Candidatar-se Agora
            </Button>
            <a href="https://wa.me/88988432310" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-2 border-white hover:bg-white text-lg px-10 py-4 text-slate-900">
                <Phone className="w-6 h-6 mr-3" />
                Agendar Reunião
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <WebsiteFooter />
    </div>
  );
};

export default PartnersProgram;
