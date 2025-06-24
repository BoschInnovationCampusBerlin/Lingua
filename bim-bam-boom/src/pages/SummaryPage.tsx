import React from 'react';

const SummaryPage = () => {
  const totalCost = 1234.56;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Summary</h1>
      <p>Total Cost: ${totalCost.toFixed(2)}</p>
    </div>
  );
};

export default SummaryPage;