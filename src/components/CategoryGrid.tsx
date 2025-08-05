"use client";

import React from 'react';
import { CategoryIcon } from '@/components/icons';
import { useTranzrData } from '@/hooks/useTranzrData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect?: (categoryId: number, categoryName: string) => void;
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  onCategorySelect,
  className = "" 
}) => {
  const { categories, loading, error } = useTranzrData();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="ml-2 text-gray-600">Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-2">Error loading categories</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCategories.map((category) => (
          <Card 
            key={category.id} 
            className="hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onCategorySelect?.(category.id, category.name)}
          >
            <CardContent className="p-4 text-center">
              {/* Icon Container */}
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                <CategoryIcon
                  categoryName={category.name}
                  iconUrl={category.icon}
                  className="w-8 h-8 text-primary-600"
                />
              </div>
              
              {/* Category Name */}
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {category.name}
              </h3>
              
              {/* Category ID (for debugging) */}
              <p className="text-xs text-gray-500 mt-1">
                ID: {category.id}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCategories.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <div className="text-gray-500">No categories found matching "{searchTerm}"</div>
        </div>
      )}

      {/* Total Count */}
      <div className="text-sm text-gray-500 text-center">
        Showing {filteredCategories.length} of {categories.length} categories
      </div>
    </div>
  );
};

// Example usage component
const TranzrCategoryDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<{id: number, name: string} | null>(null);

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    console.log('Selected category:', { id: categoryId, name: categoryName });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tranzr Categories
        </h1>
        <p className="text-gray-600">
          Browse through our moving categories with React SVG components
        </p>
      </div>

      {/* Selected Category Display */}
      {selectedCategory && (
        <Card className="mb-6 bg-primary-50 border-primary-200">
          <CardHeader>
            <CardTitle className="text-primary-800">Selected Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <CategoryIcon
                categoryName={selectedCategory.name}
                className="w-6 h-6 text-primary-600"
              />
              <span className="text-primary-800 font-medium">
                {selectedCategory.name} (ID: {selectedCategory.id})
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Grid */}
      <CategoryGrid onCategorySelect={handleCategorySelect} />
    </div>
  );
};

export { CategoryGrid, TranzrCategoryDemo };
export default CategoryGrid;
