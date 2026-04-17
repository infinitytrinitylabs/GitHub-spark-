export type Category = 'thrifted' | 'jewellery' | 'accessories';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: Category;
  era: string;
  material: string;
  story: string;
  palette: [string, string, string];
  shape: 'garment' | 'ring' | 'pendant' | 'earring' | 'bag' | 'glasses' | 'watch' | 'hat';
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: 'thrifted',
    label: 'Thrifted Clothes',
    blurb:
      'Pre-loved garments with a second life. Hand-picked denim, cotton and wool — re-worked and ready.',
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
    blurb:
      'Heirloom gold, oxidised silver, and vintage stones. Quiet pieces that carry weight.',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    blurb:
      'Leather, linen, lenses and links. The small objects that make a wardrobe whole.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-01',
    name: 'Fieldhand Denim Jacket',
    tagline: 'Sun-faded 1974 indigo',
    price: 148,
    category: 'thrifted',
    era: '1974',
    material: 'Selvedge cotton denim',
    story:
      'Pulled from a Rajasthan estate sale. The cuffs have softened into a second skin.',
    palette: ['#3B4A6B', '#6B7A96', '#C79A3A'],
    shape: 'garment',
  },
  {
    id: 'p-02',
    name: 'Ochre Linen Smock',
    tagline: 'Hand-dyed, hand-stitched',
    price: 96,
    category: 'thrifted',
    era: '1990s',
    material: 'Belgian linen',
    story: 'Loose through the body. Lives in the afternoon light.',
    palette: ['#C79A3A', '#E9B949', '#F2ECE2'],
    shape: 'garment',
  },
  {
    id: 'p-03',
    name: 'Wayfarer Wool Coat',
    tagline: 'Russet herringbone',
    price: 212,
    category: 'thrifted',
    era: '1980s',
    material: 'Donegal wool',
    story: 'A coat with pockets deep enough for letters.',
    palette: ['#7A3B1F', '#B87333', '#2B1B10'],
    shape: 'garment',
  },
  {
    id: 'p-04',
    name: 'Half-Moon Signet',
    tagline: '14k recycled gold',
    price: 340,
    category: 'jewellery',
    era: 'New-made, old-soul',
    material: '14k gold, hand-hammered',
    story: 'Cast from re-smelted scrap. No two identical.',
    palette: ['#E9B949', '#C79A3A', '#14110F'],
    shape: 'ring',
  },
  {
    id: 'p-05',
    name: 'Monsoon Pendant',
    tagline: 'Oxidised silver & moonstone',
    price: 184,
    category: 'jewellery',
    era: '1960s setting',
    material: 'Sterling silver, moonstone',
    story: 'The stone catches light like a slow rain.',
    palette: ['#C9C6BC', '#6B7A96', '#14110F'],
    shape: 'pendant',
  },
  {
    id: 'p-06',
    name: 'Dusk Hoops',
    tagline: 'Brass & rosewood',
    price: 72,
    category: 'jewellery',
    era: 'Handmade in Jaipur',
    material: 'Brass, rosewood',
    story: 'Light as a whisper. Warm against the jaw.',
    palette: ['#B87333', '#7A3B1F', '#EDE4D3'],
    shape: 'earring',
  },
  {
    id: 'p-07',
    name: 'Postman Satchel',
    tagline: 'Raw bridle leather',
    price: 268,
    category: 'accessories',
    era: '1968',
    material: 'English bridle leather',
    story: 'Its patina is a map of every city it has ever seen.',
    palette: ['#7A3B1F', '#B87333', '#2B1B10'],
    shape: 'bag',
  },
  {
    id: 'p-08',
    name: 'Meridian Sunglasses',
    tagline: 'Tortoise acetate',
    price: 124,
    category: 'accessories',
    era: '1970s',
    material: 'Italian acetate, glass lens',
    story: 'A pair that remembers the south of France.',
    palette: ['#2B1B10', '#B87333', '#C79A3A'],
    shape: 'glasses',
  },
  {
    id: 'p-09',
    name: 'Foundry Watch',
    tagline: 'Brushed steel, cream dial',
    price: 420,
    category: 'accessories',
    era: '1972',
    material: 'Swiss steel, sapphire crystal',
    story: 'Quiet, mechanical, exactly on time.',
    palette: ['#C9C6BC', '#EDE4D3', '#14110F'],
    shape: 'watch',
  },
];
