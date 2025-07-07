export interface ProductDetailsResponse {
  product: ProductDetail;
  venture: VentureDetail;
  producerUser: UserDetail;
  producerInfo: ProducerInfoDetail;
  reviews: ReviewDetail[];
}

// Product.ts
export interface ProductDetail {
  id: number;
  venture_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
}

// Venture.ts
export interface VentureDetail {
  id: number;
  name: string;
  description: string;
  image_url: string;
  producer_id: number;
  created_at: string;
}

// User.ts
export interface UserDetail {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  is_producer: boolean;
  created_at: string;
  updated_at: string;
}

// ProducerInfo.ts
export interface ProducerInfoDetail {
  id: number;
  user_id: number;
  bio: string;
  location: string;
  phone: string;
}

export interface ReviewDetail {
  id: number;
  rating: number;
  comment: string;
  product_id: number;
  created_at: string;
  user_id: number;
  user_name: string;
  avatar_url: string | null;
}
