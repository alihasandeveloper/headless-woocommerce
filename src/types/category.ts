export interface WooCommerceImage {
  id: number;
  date_created?: string;
  date_modified?: string;
  src: string;
  name?: string;
  alt?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WooCommerceImage | null;
  menu_order: number;
  count: number;
  _links?: Record<string, any>;
}
