import { useState } from 'react';
import { Product } from './compare.types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
export function useCompare() {
  const [items, setItems] = useLocalStorage<Product[]>('comparisonItems', []);
  const [isOpen, setIsOpen] = useState(false);

  const add = (product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length === 3) return prev;
      return [...prev, product];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clear = () => {
    setItems([]);
    setIsOpen(false);
  };

  const open = () => {
    if (items.length >= 2) {
      setIsOpen(true);
    }
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    items,
    add,
    remove,
    clear,
    isOpen,
    open,   // ✅ important
    close,  // ✅ important
  };
}

