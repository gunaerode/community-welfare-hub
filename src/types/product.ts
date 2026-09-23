export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  /** Price in INR */
  price: number;
  image?: string;
  description?: string;
  descriptionEn?: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}
