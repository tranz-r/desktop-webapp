import { CartItem } from '@/types/cart';
import { computeItemVolume } from '@/lib/volume';

export interface GoodsItem {
  id: number;
  name: string;
  height: number;
  width: number;
  length: number;
}

export async function loadGoodsDataset(): Promise<GoodsItem[]> {
  const res = await fetch('/data/Tranzr_goods_enriched_dimensions-Depth.json', { cache: 'force-cache' });
  if (!res.ok) throw new Error('Failed to load goods dataset');
  return res.json();
}

export function toCartItemBase(goods: GoodsItem): Omit<CartItem, 'quantity'> {
  const height = (goods.height || 0) / 100;
  const width = (goods.width || 0) / 100;
  const length = (goods.length || 0) / 100;
  const volume = computeItemVolume(height, width, length);
  return {
    id: goods.id,
    name: goods.name,
    height,
    width,
    length,
    volume,
  };
}
