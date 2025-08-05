import { useState, useEffect } from 'react';

// Define the data structure based on your JSON
export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  dimensions?: {
    length?: number;
    width?: number;
    depth?: number;
    weight?: number;
    volume?: number;
  };
  // Add other product properties as needed
}

export interface TranzrData {
  categories: Category[];
  products?: Product[];
}

// Custom hook to load and manage the Tranzr data
export const useTranzrData = () => {
  const [data, setData] = useState<TranzrData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/Tranzr_goods_enriched_dimensions-Depth.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Error loading Tranzr data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper function to get category by ID
  const getCategoryById = (categoryId: number): Category | undefined => {
    return data?.categories.find(cat => cat.id === categoryId);
  };

  // Helper function to get products by category
  const getProductsByCategory = (categoryId: number): Product[] => {
    if (!data?.products) return [];
    return data.products.filter(product => product.category_id === categoryId);
  };

  // Helper function to search products
  const searchProducts = (query: string): Product[] => {
    if (!data?.products || !query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return data.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
  };

  // Enhanced search function that returns both categories and products
  const searchAll = (query: string): { categories: Category[], products: Product[] } => {
    if (!query.trim()) return { categories: [], products: [] };
    
    const searchTerm = query.toLowerCase();
    
    const matchedCategories = data?.categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    ) || [];
    
    const matchedProducts = data?.products?.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    ) || [];

    return {
      categories: matchedCategories,
      products: matchedProducts
    };
  };

  // Get popular/featured categories (you can customize this logic)
  const getFeaturedCategories = (limit: number = 6): Category[] => {
    return data?.categories.slice(0, limit) || [];
  };

  // Get products with their category information
  const getProductsWithCategory = (): Array<Product & { category?: Category }> => {
    if (!data?.products) return [];
    
    return data.products.map(product => ({
      ...product,
      category: data.categories.find(cat => cat.id === product.category_id)
    }));
  };

  return {
    data,
    loading,
    error,
    categories: data?.categories || [],
    products: data?.products || [],
    getCategoryById,
    getProductsByCategory,
    searchProducts,
    searchAll,
    getFeaturedCategories,
    getProductsWithCategory,
  };
};

export default useTranzrData;
