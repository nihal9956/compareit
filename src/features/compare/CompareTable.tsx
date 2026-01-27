import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { Product } from './compare.types';

interface Field {
  key: keyof Product;
  label: string;
}

interface CompareTableProps {
  items: Product[];
  currentItem: Product;
  fields: Field[];
}

export function CompareTable({
  items,
  currentItem,
  fields,
}: CompareTableProps) {
  const commonValues = useMemo<Record<keyof Product, unknown>>(() => {
    const result = {} as Record<keyof Product, unknown>;

    fields.forEach(({ key }) => {
      const frequency: Record<string, number> = {};

      items.forEach((item) => {
        const value = String(item[key]);
        frequency[value] = (frequency[value] || 0) + 1;
      });

      const mostCommon = Object.entries(frequency).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0];

      result[key] = mostCommon;
    });

    return result;
  }, [items, fields]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {fields.map(({ key, label }) => {
        const isDifferent = currentItem[key] !== commonValues[key];

        return (
          <Box
            key={String(key)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor: isDifferent ? 'warning.light' : 'transparent',
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              color={isDifferent ? 'warning.dark' : 'text.primary'}
            >
              {label}
            </Typography>

            <Typography
              variant="body2"
              color={isDifferent ? 'warning.dark' : 'text.secondary'}
              textAlign="right"
            >
              {String(currentItem[key])}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
