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
import { Product } from '../compare/compare.types';

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
          borderRadius: '1rem',
          border: isCompared
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.divider}`,
          backgroundColor: isCompared
            ? theme.palette.action.selected
            : theme.palette.background.paper,
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
            variant="contained"
            color="primary"
            disabled={disableCompare && !isCompared}
            aria-pressed={isCompared}
            sx={{ m: 2, px: 3 }}
            onClick={handleClick}
          >
            {buttonLabel}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;

/* Small helper */
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
    <Typography fontWeight={600}>{label}:</Typography>
    <Typography>{value}</Typography>
  </Box>
);
