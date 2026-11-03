// Shared domain types used by both server and client code.
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  popular?: boolean;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
};
