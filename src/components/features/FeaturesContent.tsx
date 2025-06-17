
import React from 'react';
import { featuresData } from '../../data/featuresData';
import { featureCategories } from '../../data/featureCategories';
import { FeatureCard } from './FeatureCard';

interface FeaturesContentProps {
  activeCategory: string;
}

export const FeaturesContent: React.FC<FeaturesContentProps> = ({ activeCategory }) => {
  const currentCategory = featureCategories.find(cat => cat.id === activeCategory);
  const features = featuresData[activeCategory as keyof typeof featuresData] || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {currentCategory?.name}
          </h2>
          <p className="text-xl text-gray-600">
            {currentCategory?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
