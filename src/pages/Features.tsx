
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WebsiteLayout } from '../components/layout/WebsiteLayout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Activity, Play, Calendar, Sparkles } from 'lucide-react';
import FeaturesInteractiveCharts from '../components/FeaturesInteractiveCharts';
import { FeatureCategories } from '../components/features/FeatureCategories';
import { FeaturesContent } from '../components/features/FeaturesContent';
import { IntegrationsShowcase } from '../components/features/IntegrationsShowcase';

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('dashboard');

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Activity className="w-4 h-4 mr-2" />
            Demonstração Interativa
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Funcionalidades que
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              revolucionam seu CS
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubra como o CS360° transforma cada aspecto do seu Customer Success 
            com tecnologia de ponta e inteligência artificial.
          </p>
          
          <Link to="/executive-demo">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Play className="w-5 h-5 mr-2" />
              Ver Dashboard Completo
            </Button>
          </Link>
        </div>
      </section>

      {/* Interactive Charts Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Activity className="w-4 h-4 mr-2" />
              Demonstração Interativa
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Experimente o Poder dos Nossos
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Analytics em Tempo Real
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como nossos gráficos interativos transformam dados complexos em insights acionáveis. 
              Passe o mouse sobre os gráficos para experimentar a interatividade real do dashboard.
            </p>
          </div>

          <FeaturesInteractiveCharts />

          <div className="text-center mt-12">
            <Link to="/executive-demo">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Play className="w-5 h-5 mr-2" />
                Ver Dashboard Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FeatureCategories 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <FeaturesContent activeCategory={activeCategory} />
      
      <IntegrationsShowcase />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para experimentar tudo isso?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Teste todas as funcionalidades gratuitamente por 14 dias
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Sparkles className="w-5 h-5 mr-2" />
                Começar Teste Grátis
              </Button>
            </Link>
            <Link to="/executive-demo">
              <Button variant="outline" size="lg" className="border-white hover:bg-white text-slate-800">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default Features;
