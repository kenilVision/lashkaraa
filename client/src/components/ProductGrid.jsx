import React from 'react';
import ProductCard from './common/ProductCard';

// interface ProductGridProps {
//   products: Product[];
// }

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      
      {products.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <p className="text-gray-500 text-lg">No products match your selected filters.</p>
          <p className="mt-2 text-gray-600">Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;