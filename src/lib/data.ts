import cityData from '@/data/city_gifts.json';

export interface Gift {
  name: string;
  description: string;
  price_range_usd: string;
  image?: string;
  story?: string;
}

export interface City {
  city: string;
  country: string;
  gifts: Gift[];
  image?: string;
}

export const getCities = (): City[] => {
  return cityData.cities as City[];
};

export const getCityBySlug = (slug: string): City | undefined => {
  return getCities().find(c => slugify(c.city) === slug);
};

export const getProductBySlug = (citySlug: string, productSlug: string) => {
  const city = getCityBySlug(citySlug);
  if (!city) return undefined;
  return city.gifts.find(g => slugify(g.name) === productSlug);
};

export const slugify = (text: string) => {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
};

export const getCitiesByRegion = () => {
  const cities = getCities();
  return {
    'The Americas': cities.filter(c => c.country === 'USA'),
    'Europe': cities.filter(c => ['France', 'United Kingdom', 'Italy', 'Germany', 'Spain'].includes(c.country)),
    'China': cities.filter(c => c.country === 'China'),
  };
};

// Map some images to cities since they aren't in the JSON
export const cityImages: Record<string, string> = {
  'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600',
  'San Francisco': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600',
  'New Orleans': 'https://images.unsplash.com/photo-1541913165780-606f2c3ed037?auto=format&fit=crop&q=80&w=600',
  'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600',
  'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600',
  'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600',
  'Beijing': 'https://images.unsplash.com/photo-1508555024227-9c8699478f77?auto=format&fit=crop&q=80&w=600',
  'Shanghai': 'https://images.unsplash.com/photo-1548919973-5cfe5d4fc494?auto=format&fit=crop&q=80&w=600',
  'Hong Kong': 'https://images.unsplash.com/photo-1507450491953-1bc06575089e?auto=format&fit=crop&q=80&w=600',
  'Los Angeles': 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&q=80&w=600',
  'Chicago': 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80&w=600',
  'Berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=600',
  'Barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=600',
  'Guangzhou': 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&q=80&w=600',
  'Chengdu': 'https://images.unsplash.com/photo-1526481280693-3bfa756160f7?auto=format&fit=crop&q=80&w=600',
};

// Map some images to products
export const productImages: Record<string, string> = {
  'Ladurée Macaron Collection': 'https://images.unsplash.com/photo-1590005354167-6da97870c919?auto=format&fit=crop&q=80&w=800',
  'Napa Valley Wine Gift Set': 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800',
  'Ming Dynasty Style Tea Set': 'https://images.unsplash.com/photo-1567113379515-6e85ee7c36bf?auto=format&fit=crop&q=80&w=800',
  'Fortnum & Mason Tea Selection': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
};

// Default product image
export const defaultProductImage = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800';
