export interface CartItem {
  id: string;
  name: string;
  height: number; // meters
  width: number;  // meters
  length: number; // meters
  volume: number; // cubic meters (per item)
  quantity: number;
}

export type CartItems = CartItem[];
