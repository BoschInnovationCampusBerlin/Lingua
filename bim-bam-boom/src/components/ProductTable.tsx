import React from 'react';
import { Product } from '../types/product';

type Props = {
  products: Product[];
};

const ProductTable: React.FC<Props> = ({ products }) => (
  <table className="w-full border">
    <thead>
      <tr>
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Category</th>
        <th className="border px-4 py-2">Criteria</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td className="border px-4 py-2">{p.name}</td>
          <td className="border px-4 py-2">{p.category}</td>
          <td className="border px-4 py-2">{p.criteria?.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;