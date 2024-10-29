import { Kitchen, Beach, Garden, Office, School } from 'lucide-react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  words: string[];
  background: string;
  icon: string;
}

export const themes: Theme[] = [
  {
    id: 'kitchen',
    name: 'In the Kitchen',
    description: 'Find cooking utensils and appliances',
    words: ['SPOON', 'FORK', 'KNIFE', 'PLATE', 'BOWL', 'CUP', 'PAN', 'POT', 'OVEN', 'SINK'],
    background: 'from-amber-900 via-orange-800 to-red-900',
    icon: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'beach',
    name: 'Beach Day',
    description: 'Discover items found at the beach',
    words: ['SAND', 'WAVE', 'SHELL', 'SURF', 'TOWEL', 'SWIM', 'SUN', 'BOAT', 'FISH', 'CRAB'],
    background: 'from-blue-900 via-cyan-800 to-teal-900',
    icon: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'garden',
    name: 'Garden Paradise',
    description: 'Find plants and garden tools',
    words: ['ROSE', 'TREE', 'SEED', 'SOIL', 'RAKE', 'HOSE', 'LEAF', 'WEED', 'TOOL', 'PLANT'],
    background: 'from-green-900 via-emerald-800 to-teal-900',
    icon: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'office',
    name: 'Office Space',
    description: 'Locate office supplies and equipment',
    words: ['DESK', 'CHAIR', 'PHONE', 'FILE', 'PAPER', 'PEN', 'CLIP', 'TAPE', 'LAMP', 'BOOK'],
    background: 'from-slate-900 via-gray-800 to-zinc-900',
    icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'school',
    name: 'Back to School',
    description: 'Find school supplies and items',
    words: ['PENCIL', 'RULER', 'BOOK', 'DESK', 'CHALK', 'MAP', 'GLOBE', 'BAG', 'LUNCH', 'TEST'],
    background: 'from-indigo-900 via-purple-800 to-violet-900',
    icon: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=100&h=100&q=80'
  }
];