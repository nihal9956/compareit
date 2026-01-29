import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../types/product.types';

interface ProductListProps {
  products?: Product[];
  comparisonItems: Product[];
  onCompare: (product: Product) => void;
  onRemoveCompare: (id: string) => void;
  onOpenCompare: () => void;
  disableCompare: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  comparisonItems,
  onCompare,
  onRemoveCompare,
  onOpenCompare,
  disableCompare,
}) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Typography
        variant="h4"
        sx={{ m: '10rem auto', whiteSpace: 'nowrap' }}
      >
        😔 No product found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(280px, 1fr))',
          md: 'repeat(3, minmax(280px, 1fr))',
          lg: 'repeat(4, minmax(280px, 1fr))',
        },
        alignItems: 'stretch',
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onCompare={onCompare}
          onRemoveCompare={onRemoveCompare}
          onOpenCompare={onOpenCompare}
          isCompared={comparisonItems.some(
            (item) => item.id === product.id
          )}
          comparisonCount={comparisonItems.length}
          disableCompare={disableCompare}
        />
      ))}
    </Box>
  );
};

export default React.memo(ProductList);
