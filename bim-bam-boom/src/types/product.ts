export interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  alternatives?: AlternativeProduct[];
  criteria?: string[];
}

export interface AlternativeProduct {
  name: string;
  price: number;
  source: string;
}