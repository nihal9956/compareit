import React, { useMemo, useState } from 'react';
import { Grid } from '@mui/material';

import Header from '../components/Header';
import ProductList from '../features/products/ProductList';
import { ComparePanel } from '../features/compare/ComparePanel';
import { useCompare } from '../features/compare/useCompare';
import { products } from '../data/products.mock';
import { Product } from '../features/compare/compare.types';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

const ProductComparePage: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState('Mobiles');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const {
    items: comparisonItems,
    add,
    remove,
    clear,
    isOpen,
    close,
    open,
  } = useCompare();

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const currentCategoryData = useMemo<Product[]>(() => {
    return products.filter((product) => {
      const matchesCategory =
        product.category === currentCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(debouncedSearchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, debouncedSearchQuery]);

  return (
    <>
      <Header
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        onSearch={handleSearch}
      />

      <Grid container sx={{ px: 5, mt: 2 }}>
        <ProductList
          products={currentCategoryData}
          comparisonItems={comparisonItems}
          onCompare={add}
          onOpenCompare={open}
          disableCompare={comparisonItems.length >= 3}
        />
      </Grid>

      <ComparePanel
        items={comparisonItems}
        isOpen={isOpen}
        onClose={close}
        onClear={clear}
        onRemoveItem={remove}
      />
    </>
  );
};

export default ProductComparePage;
