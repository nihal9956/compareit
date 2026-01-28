import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '../../types/product.types';
import { CompareTable } from './CompareTable';
import { MIN_COMPARE_ITEMS } from './compare.constants';

interface ComparePanelProps {
  items: Product[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  onRemoveItem: (id: string) => void;
}

const FIELDS_TO_COMPARE: { key: keyof Product; label: string }[] = [
  { key: 'price', label: 'Price' },
  { key: 'brand', label: 'Brand' },
  { key: 'warranty', label: 'Warranty' },
  { key: 'batteryLife', label: 'Battery Life' },
  { key: 'screenSize', label: 'Screen Size' },
  { key: 'countryOfOrigin', label: 'Country of Origin' },
];

export const ComparePanel: React.FC<ComparePanelProps> = ({
  items,
  isOpen,
  onClose,
  onClear,
  onRemoveItem,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (items.length < MIN_COMPARE_ITEMS) return null;

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{
          height: isMobile ? '90vh' : 600,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
        }}
        role="region"
        aria-label="Product comparison panel"
      >
        {/* Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            px: 4,
            py: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            fontSize={isMobile ? '1.25rem' : '1.5rem'}
          >
            Compare Products
          </Typography>

          <Button
            variant="outlined"
            color="error"
            size={isMobile ? 'small' : 'medium'}
            onClick={onClear}
          >
            Clear comparison
          </Button>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 4,
            py: 3,
          }}
        >
          {/* Responsive grid */}
          <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, minmax(280px, 1fr))',
      md: 'repeat(3, minmax(280px, 1fr))',
    },
    gap: 3,
    justifyContent: 'center',
    maxWidth: '1200px',
    mx: 'auto',
  }}
>

            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 3,
                  position: 'relative',
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <IconButton
                  aria-label={`Remove ${item.name} from comparison`}
                  onClick={() => onRemoveItem(item.id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 140,
                    height: 140,
                    objectFit: 'contain',
                    mx: 'auto',
                    mb: 2,
                    display: 'block',
                  }}
                />

                <Typography fontWeight={600} textAlign="center" mb={2}>
                  {item.name}
                </Typography>

                <CompareTable
                  items={items}
                  currentItem={item}
                  fields={FIELDS_TO_COMPARE}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
