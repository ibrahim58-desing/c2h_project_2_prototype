export type CategoryId = 'basket' | 'textile' | 'home' | 'accessory'

export interface CategoryItem {
  id: CategoryId
  name: string
  description: string
  image: string
}

export const categories: CategoryItem[] = [
  {
    id: 'basket' as const,
    name: 'Baskets & Weaves',
    description: 'Hand-woven vessels from abaca fiber, shaped using traditional techniques passed through generations.',
    image: 'linear-gradient(145deg, #6b5344 0%, #8b7355 45%, #4a3728 100%)',
  },
  {
    id: 'textile' as const,
    name: 'Textiles',
    description: 'Natural banana silk blends with breathable, temperature-regulating properties for everyday comfort.',
    image: 'linear-gradient(145deg, #3d5c40 0%, #5a7a5e 45%, #2d4030 100%)',
  },
  {
    id: 'home' as const,
    name: 'Home & Living',
    description: 'Planters, wall pieces, and lighting crafted from compressed fiber pulp and layered weaves.',
    image: 'linear-gradient(145deg, #5c4a3a 0%, #7a6555 45%, #3d3228 100%)',
  },
  {
    id: 'accessory' as const,
    name: 'Accessories',
    description: 'Structured carry pieces and daily essentials made to soften and strengthen with use.',
    image: 'linear-gradient(145deg, #2a3d32 0%, #4a5c50 45%, #1a2820 100%)',
  },
]

export const companyInfo = {
  name: 'FIBRA',
  tagline: 'Banana Fiber Atelier',
  email: 'hello@fibra.co',
  phone: '+63 2 8123 4567',
  address: 'Lot 12, Abaca Road, Bicol Region, Philippines',
  hours: 'Mon – Sat, 9:00 – 18:00',
}
