import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { STATUS_LABELS } from '../../utils/constants';

function StepStatusBadge({ status, theme }) {
  const label = status === 'pending' ? 'À faire' : STATUS_LABELS[status] || 'À faire';

  return (
    <Box
      component={motion.span}
      sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.375,
        borderRadius: '999px',
        bgcolor: theme?.badge || theme?.light || '#E3F2FD',
        color: theme?.main || '#3B914B',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
      aria-label={`Statut: ${label}`}
    >
      {label}
    </Box>
  );
}

export default memo(StepStatusBadge);
