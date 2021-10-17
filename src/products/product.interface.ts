export interface ProductDataInterface {
  name: string;
  tags: Array<string>;
  price: number;
  photos: Array<{ name: string; src: string }>;
  details: string;
}

export interface Product extends ProductDataInterface {
  id: string;
}
