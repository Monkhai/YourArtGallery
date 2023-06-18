import { HiPhotograph, HiMenuAlt1, HiBookOpen } from 'react-icons/hi';

export interface Item {
  name: string;
  id: number;
  icon: React.ComponentType;
}

export const explorePopOver: Item[] = [
  { name: 'Gallery', id: 1, icon: HiPhotograph },
  { name: 'Blog', id: 2, icon: HiMenuAlt1 },
  { name: 'Magazines', id: 3, icon: HiBookOpen },
];
