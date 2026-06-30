export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  category: 'basket' | 'textile' | 'home' | 'accessory'
  color: string
  accentColor: string
  features: string[]
  dimensions: string
  material: string
  sustainability: {
    co2Saved: number
    plasticReplaced: number
    wasteDiverted: number
  }
}

export const products: Product[] = [
  {
    id: 'woven-basket',
    name: 'Helix Basket',
    tagline: 'Hand-woven from abaca fiber',
    description:
      'Each strand tells a story of transformation — banana waste reborn through ancestral weaving techniques into a sculptural vessel.',
    price: 89,
    category: 'basket',
    color: '#7a6348',
    accentColor: '#a08868',
    features: ['Water-resistant coating', 'Reinforced base weave', 'Natural dye finish'],
    dimensions: '32 × 28 × 18 cm',
    material: '100% Banana Abaca Fiber',
    sustainability: { co2Saved: 2.4, plasticReplaced: 0.8, wasteDiverted: 1.2 },
  },
  {
    id: 'fiber-throw',
    name: 'Canopy Throw',
    tagline: 'Breathable natural textile',
    description:
      'Luxuriously soft banana fiber textile with a living texture that breathes with your space.',
    price: 145,
    category: 'textile',
    color: '#3d5238',
    accentColor: '#5a7050',
    features: ['Temperature regulating', 'Antimicrobial fibers', 'Hand-finished edges'],
    dimensions: '180 × 140 cm',
    material: 'Banana Silk Blend',
    sustainability: { co2Saved: 3.1, plasticReplaced: 0, wasteDiverted: 2.0 },
  },
  {
    id: 'planter-set',
    name: 'Root Planter',
    tagline: 'Biodegradable garden vessel',
    description:
      'A planter that returns to earth — crafted from compressed banana fiber pulp with natural waterproofing.',
    price: 54,
    category: 'home',
    color: '#5c4a3a',
    accentColor: '#8a7560',
    features: ['Self-watering base', 'Compostable at end of life', 'UV resistant'],
    dimensions: '24 × 24 × 20 cm',
    material: 'Compressed Banana Pulp',
    sustainability: { co2Saved: 1.8, plasticReplaced: 1.2, wasteDiverted: 0.9 },
  },
  {
    id: 'wall-art',
    name: 'Fiber Canvas',
    tagline: 'Sculptural wall installation',
    description:
      'Layers of woven banana fiber create depth and shadow — a living artwork that shifts with light.',
    price: 220,
    category: 'home',
    color: '#9a8468',
    accentColor: '#b8a888',
    features: ['Museum-grade mounting', 'Light-reactive weave', 'Signed by artisan'],
    dimensions: '90 × 60 cm',
    material: 'Layered Abaca Weave',
    sustainability: { co2Saved: 4.2, plasticReplaced: 0, wasteDiverted: 3.5 },
  },
  {
    id: 'tote-bag',
    name: 'Harvest Tote',
    tagline: 'Everyday carry, earth-first',
    description:
      'Structured tote with invisible strength — banana fiber handles that soften with age.',
    price: 68,
    category: 'accessory',
    color: '#2a3828',
    accentColor: '#4a5c48',
    features: ['Reinforced handles', 'Interior pocket', 'Machine washable'],
    dimensions: '38 × 35 × 12 cm',
    material: 'Woven Abaca + Cotton Lining',
    sustainability: { co2Saved: 1.5, plasticReplaced: 2.0, wasteDiverted: 0.6 },
  },
  {
    id: 'lamp-shade',
    name: 'Lumen Shade',
    tagline: 'Diffused golden light',
    description:
      'Translucent banana fiber creates warm, dappled light — like sunlight through a canopy.',
    price: 112,
    category: 'home',
    color: '#c4b080',
    accentColor: '#ddd0a8',
    features: ['Warm light diffusion', 'Universal fit bracket', 'Hand-pleated'],
    dimensions: 'Ø 35 cm',
    material: 'Translucent Abaca Membrane',
    sustainability: { co2Saved: 2.0, plasticReplaced: 0.5, wasteDiverted: 1.1 },
  },
]

export const storyChapters = [
  {
    id: 'forest',
    title: 'Origin',
    subtitle: 'Where waste becomes wonder',
    body: 'Deep in the canopy, banana trees stand — their pseudostems holding secrets of sustainable craft.',
  },
  {
    id: 'plantation',
    title: 'Harvest',
    subtitle: 'Nature provides twice',
    body: 'After the fruit is gathered, the pseudostem — once discarded — becomes the raw material of transformation.',
  },
  {
    id: 'extraction',
    title: 'Extraction',
    subtitle: 'Fibers emerge',
    body: 'Layer by layer, golden strands are pulled from the stem — each fiber stronger than cotton, softer than silk.',
  },
  {
    id: 'workshop',
    title: 'Craft',
    subtitle: 'Hands remember',
    body: 'In workshops where time moves slowly, artisans weave centuries of knowledge into every strand.',
  },
  {
    id: 'products',
    title: 'Creation',
    subtitle: 'Form follows fiber',
    body: 'From basket to textile, each product is a vessel carrying the story of regeneration.',
  },
  {
    id: 'home',
    title: 'Living',
    subtitle: 'Craft enters life',
    body: 'In homes around the world, banana fiber objects breathe — living materials in living spaces.',
  },
]

export const sustainabilityStats = [
  { label: 'CO₂ Offset', value: 847, unit: 'tons', trend: -12 },
  { label: 'Plastic Replaced', value: 2340, unit: 'kg', trend: -28 },
  { label: 'Waste Diverted', value: 15600, unit: 'kg', trend: +34 },
  { label: 'Artisans Supported', value: 128, unit: 'people', trend: +18 },
]
