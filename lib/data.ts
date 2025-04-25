import { Coffee, IceCream2, UtensilsCrossed, Waves } from 'lucide-react';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type MenuSection = {
  id: string;
  name: string;
  icon: React.ElementType;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    id: 'frescas',
    name: 'Frescas',
    icon: Waves,
    items: [
      { 
        id: 'mango-dragonfruit',
        name: 'Mango Dragonfruit',
        description: 'Fresh mango and dragonfruit blend with a hint of lime',
        price: 5.99,
        image: '/frescas/mango_dragonfruit.jpg'
      },
      { 
        id: 'strawberry-acai',
        name: 'Strawberry Acai',
        description: 'Refreshing strawberry and acai blend with fresh berries',
        price: 5.99,
        image: '/frescas/strawberry_acai.jpg'
      },
      { 
        id: 'horchata',
        name: 'Horchata',
        description: 'Traditional rice and cinnamon drink',
        price: 4.99,
        image: '/frescas/horchata.jpg'
      },
      { 
        id: 'horchata-cafe',
        name: 'Horchata Cafe',
        description: 'Our signature horchata with a shot of espresso',
        price: 5.99,
        image: '/frescas/horchata_cafe.jpg'
      },
      { 
        id: 'strawberry-horchata',
        name: 'Strawberry Horchata',
        description: 'Creamy horchata blended with fresh strawberries',
        price: 5.99,
        image: '/frescas/strawberry_horchata.jpg'
      },
      { 
        id: 'coconut-roso',
        name: 'Coconut Roso',
        description: 'Coconut water with rose essence and lychee',
        price: 5.99,
        image: '/frescas/coco_roso.jpg'
      },
    ]
  },
  {
    id: 'granitas',
    name: 'Granitas',
    icon: IceCream2,
    items: [
      { 
        id: 'mango-chamoy',
        name: 'Mango Chamoy',
        description: 'Sweet and spicy mango slush with chamoy',
        price: 6.49,
        image: '/granitas/mango_chamoy.jpg'
      },
      { 
        id: 'watermelon-chamoy',
        name: 'Watermelon Chamoy',
        description: 'Fresh watermelon slush with chamoy and tajin',
        price: 6.49,
        image: '/granitas/watermelon_chamoy.jpg'
      },
      { 
        id: 'strawberry-chamoy',
        name: 'Strawberry Chamoy',
        description: 'Sweet strawberry slush with chamoy rim',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'tamarindo-chamoy',
        name: 'Tamarindo Chamoy',
        description: 'Tangy tamarind slush with chamoy and chile',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'pineapple-chamoy',
        name: 'Pineapple Chamoy',
        description: 'Tropical pineapple slush with chamoy',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1587883012610-e3df17d41270?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'strawberry-redbull',
        name: 'Strawberry Redbull Frozen',
        description: 'Energizing frozen Red Bull with strawberry',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1558138838-76294be30005?auto=format&fit=crop&q=80&w=400'
      },
    ]
  },
  {
    id: 'frappes',
    name: 'Frappes',
    icon: Coffee,
    items: [
      { 
        id: 'vanilla-frappe',
        name: 'Vanilla Frappe',
        description: 'Creamy vanilla blend with whipped cream',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'chocolate-frappe',
        name: 'Chocolate Frappe',
        description: 'Rich chocolate blend with chocolate drizzle',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1577595166653-c4b06b30fa1c?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'caramel-frappe',
        name: 'Caramel Frappe',
        description: 'Sweet caramel blend with whipped cream',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'mocha-frappe',
        name: 'Mocha Frappe',
        description: 'Coffee and chocolate blend with espresso',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'oreo-frappe',
        name: 'Oreo Frappe',
        description: 'Cookies and cream blend with cookie crumbs',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'taro-frappe',
        name: 'Taro Frappe',
        description: 'Smooth taro blend with whipped cream',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=400'
      },
    ]
  },
  {
    id: 'hot-drinks',
    name: 'Hot Drinks',
    icon: Coffee,
    items: [
      { 
        id: 'americano',
        name: 'Americano',
        description: 'Double shot of espresso with hot water',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'cappucco',
        name: 'Cappucco',
        description: 'Espresso topped with foamy milk',
        price: 4.49,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'cafe-con-leche',
        name: 'Cafe Con Leche',
        description: 'Cuban style coffee with steamed milk',
        price: 4.49,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'mocha',
        name: 'Mocha',
        description: 'Espresso with chocolate and steamed milk',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400'
      },
    ]
  },
  {
    id: 'food',
    name: 'Food',
    icon: UtensilsCrossed,
    items: [
      { 
        id: 'croissant',
        name: 'Croissant',
        description: 'Freshly baked butter croissant',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'ham-cheese-croissant',
        name: 'Ham & Cheese Croissant',
        description: 'Butter croissant with ham and swiss cheese',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1600353068867-5b4de71e3afb?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'spinach-croissant',
        name: 'Spinach Croissant',
        description: 'Flaky croissant with spinach and feta',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=400'
      },
      { 
        id: 'chocolate-croissant',
        name: 'Chocolate Croissant',
        description: 'Butter croissant with dark chocolate',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=400'
      },
    ]
  },
];