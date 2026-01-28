import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Tooltip,
  useTheme,
  Box,
} from '@mui/material';
import { Product } from '../../types/product.types';

interface ProductCardProps {
  product: Product;
  onCompare: (product: Product) => void;
  onOpenCompare: () => void;
  isCompared: boolean;
  comparisonCount: number;
  disableCompare: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCompare,
  onOpenCompare,
  isCompared,
  comparisonCount,
  disableCompare,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (isCompared && comparisonCount >= 2) {
      onOpenCompare();
      return;
    }
    onCompare(product);
  };

  const buttonLabel =
    isCompared && comparisonCount >= 2
      ? 'See comparison'
      : isCompared
      ? 'Added'
      : 'Add to comparison';

  return (
    <Box sx={{ height: '100%' }}>
      <Card
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
      cursor: 'pointer',
    },
  }}
>

        {/* Image */}
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: 220,
            height: 220,
            objectFit: 'contain',
            mx: 'auto',
            mt: 2,
            borderRadius: '8px',
          }}
        />

        {/* Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Tooltip title={product.name.length > 50 ? product.name : ''}>
            <Typography gutterBottom variant="h6">
              {product.name.length > 50
                ? `${product.name.substring(0, 40)}...`
                : product.name}
            </Typography>
          </Tooltip>

          <InfoRow label="Price" value={`₹${product.price.toLocaleString('en-IN')}`} />
          <InfoRow label="Brand" value={product.brand} />
          <InfoRow label="Warranty" value={product.warranty} />
        </CardContent>

        {/* Button pinned to bottom */}
        <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
          <Button
            aria-pressed={isCompared}
  aria-disabled={disableCompare && !isCompared}

  variant={isCompared ? 'contained' : 'outlined'}
  color={isCompared ? 'primary' : 'inherit'}
  disabled={disableCompare && !isCompared}
  sx={{
    m: 2,
    px: 3,
    borderRadius: 999,

    ...(isCompared
      ? {}
      : {
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F3F4F6'
              : '#1F2937',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#E5E7EB'
                : '#374151',
          },
        }),
  }}
  onClick={handleClick}
>
  {buttonLabel}
</Button>

        </CardActions>
      </Card>
    </Box>
  );
};

export default React.memo(ProductCard);

/* Small helper */
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mt: 1,
      px: 1.5,
      py: 0.75,
      borderRadius: 0.2,
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? '#F9FAFB'
          : '#1F2937',
    }}
  >
    <Typography variant="body2" fontWeight={500} color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value}
    </Typography>
  </Box>
);

