import React from 'react';
import { Box, Skeleton } from '@mui/material';

interface SkeletonGridProps {
  count?: number;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 8 }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
        width: '100%',
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 2,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Image */}
          <Skeleton
            variant="rectangular"
            height={220}
            sx={{ borderRadius: 2, mb: 2 }}
          />

          {/* Title */}
          <Skeleton height={28} width="90%" />

          {/* Info rows */}
          <Skeleton height={20} width="70%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="50%" />

          {/* Button */}
          <Skeleton
            height={40}
            width="70%"
            sx={{ mt: 3, mx: 'auto', borderRadius: 2 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(SkeletonGrid);
