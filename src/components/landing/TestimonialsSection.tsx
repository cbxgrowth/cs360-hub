
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Crown, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Eduardo Silva',
    role: 'CEO',
    company: 'TechCorp Brasil',
    content: 'O CS360° nos permitiu escalar de 50M para 200M em ARR mantendo 95% de retenção. A IA preditiva é um game-changer absoluto para líderes que precisam de resultados.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    results: '300% crescimento ARR',
    rating: 5,
    company_size: '500+ funcionários'
  },
  {
    name: 'Ana Paula Costa',
    role: 'VP Customer Success',
    company: 'Enterprise Solutions',
    content: 'Transformamos nossa operação de CS em 90 dias. ROI de 850% no primeiro ano. Indispensável para qualquer líder sério sobre Customer Success.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    results: '850% ROI ano 1',
    rating: 5,
    company_size: '1000+ funcionários'
  },
  {
    name: 'Roberto Martins',
    role: 'Chief Revenue Officer',
    company: 'Scale Ventures',
    content: 'A capacidade de prever e prevenir churn nos deu vantagem competitiva inigualável. Recomendo para todos os C-levels que conheço.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    results: '95% retenção',
    rating: 5,
    company_size: '200+ funcionários'
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 mb-6 text-base font-semibold border-blue-200">
            <Crown className="w-4 h-4 mr-2" />
            Validado por Líderes de Mercado
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6">
            O que C-Levels Estão Dizendo
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Depoimentos de executivos que transformaram seus resultados de Customer Success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                {/* Rating */}
                <div className="flex mb-4 lg:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-blue-400 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-slate-700 mb-6 lg:mb-8 italic text-sm lg:text-base leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </blockquote>
                
                {/* Author & Results */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-3 lg:mr-4 shadow-lg" 
                    />
                    <div>
                      <div className="font-black text-slate-900 text-sm lg:text-base">{testimonial.name}</div>
                      <div className="text-slate-600 text-xs lg:text-sm font-semibold">{testimonial.role}</div>
                      <div className="font-semibold text-blue-600 text-xs lg:text-sm">{testimonial.company}</div>
                      <div className="text-slate-500 text-xs">{testimonial.company_size}</div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 font-bold text-sm">
                    {testimonial.results}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
