import { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Product } from '../../types/product.types';

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
  const theme = useTheme();

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
    <Box display="flex" flexDirection="column" gap={0.75}>
      {fields.map(({ key, label }) => {
        const isDifferent = currentItem[key] !== commonValues[key];

        return (
          <Box
            key={String(key)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0.6,
              px: 0.25,
              borderBottom: `1px solid ${theme.palette.divider}`,

              ...(isDifferent && {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 114, 76, 0.08)' // coral tint (light)
                    : 'rgba(70, 240, 210, 0.14)', // teal tint (dark)
              }),
            }}
          >
           <Typography
  variant="body2"
  fontWeight={600}
  sx={{
    color: isDifferent
      ? theme.palette.mode === 'light'
        ? theme.palette.text.primary   // 👈 dark text in light mode
        : theme.palette.primary.main   // 👈 teal in dark mode
      : theme.palette.text.primary,
  }}
>
  {label}
</Typography>

<Typography
  variant="body2"
  sx={{
    color: isDifferent
      ? theme.palette.mode === 'light'
        ? theme.palette.text.secondary // 👈 darker neutral
        : theme.palette.primary.main
      : theme.palette.text.secondary,
    textAlign: 'right',
  }}
>
  {String(currentItem[key])}
</Typography>

          </Box>
        );
      })}
    </Box>
  );
}
