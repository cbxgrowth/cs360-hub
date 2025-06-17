
import React from 'react';
import { featureCategories } from '../../data/featureCategories';

interface FeatureCategoriesProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const FeatureCategories: React.FC<FeatureCategoriesProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featureCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <category.icon className={`w-8 h-8 mx-auto mb-2 ${
                activeCategory === category.id ? 'text-white' : 'text-gray-600'
              }`} />
              <div className="font-medium text-sm">{category.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
