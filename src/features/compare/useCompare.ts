import { useCallback, useState } from 'react';
import { Product } from '../../types/product.types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { MAX_COMPARE_ITEMS } from './compare.constants';
export function useCompare() {
  const [items, setItems] = useLocalStorage<Product[]>('comparisonItems', []);
  const [isOpen, setIsOpen] = useState(false);

 const add = useCallback((product: Product) => {
  setItems((prev) => {
    if (prev.some((p) => p.id === product.id)) return prev;
    if (prev.length === MAX_COMPARE_ITEMS) return prev;
    return [...prev, product];
  });
}, [setItems]);


  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clear = () => {
    setItems([]);
    setIsOpen(false);
  };

  const open = () => {
  setIsOpen(true);
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
    open,   
    close,  
  };
}

