import { Product } from '../types/product';

// Upload CSV file with context
export const uploadCSVWithContext = async (file: File, context: string): Promise<{ jobId: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('context', context);

  const response = await fetch('http://localhost:5678/webhook/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return await response.json(); // Expected to return something like { jobId: 'abc123' }
};

// Get comparison data from backend
export const getComparisonData = async (jobId: string): Promise<Product[]> => {
  const response = await fetch(`http://localhost:5678/webhook/comparison?jobId=${jobId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch comparison data');
  }

  return await response.json(); // Expected to return an array of Product
};

// Get summary data (e.g., cost) from backend
export const getSummary = async (jobId: string): Promise<{ totalCost: number }> => {
  const response = await fetch(`http://localhost:5678/webhook/summary?jobId=${jobId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch summary');
  }

  return await response.json(); // Expected to return { totalCost: number }
};
