export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  stars: number;
  comments: number;
  medias: Array<Media>;
  variants: Array<Variant>;
};

export type ProductCard = Product & { quantity?: number; size?: string };

export type Media = {
  id: string;
  path: string;
};

export type Variant = {
  id: string;
  size: string;
};
