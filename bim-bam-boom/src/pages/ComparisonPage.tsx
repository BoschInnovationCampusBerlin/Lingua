import React from 'react';
import ProductTable from '../components/ProductTable';

const ComparisonPage = () => {
  const mockData = [
    { id: '1', name: 'Laptop', category: 'Electronics', criteria: ['Price', 'Brand'] },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Comparison</h1>
      <ProductTable products={mockData} />
    </div>
  );
};

export default ComparisonPage;