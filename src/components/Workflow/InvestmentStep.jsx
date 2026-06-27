import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import StepStatusBadge from './StepStatus';

function InvestmentStep({ step, isSelected, onSelect, index }) {
  const Icon = step.icon;
  const theme = step.theme;

  return (
    <Box
      component={motion.button}
      type="button"
      onClick={() => onSelect(step.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      aria-label={`Étape ${step.id}: ${step.title}`}
      aria-pressed={isSelected}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        minWidth: 0,
        width: '100%',
        maxWidth: '100%',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        p: 0.5,
        flex: '1 1 0',
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: theme.main,
          outlineOffset: 4,
          borderRadius: 2,
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          color: theme.main,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        }}
      >
        {String(step.id).padStart(2, '0')}
      </Typography>

      <Box
        component={motion.div}
        whileHover={{ scale: 1.05 }}
        sx={{
          width: { xs: 52, md: 60 },
          height: { xs: 52, md: 60 },
          borderRadius: '50%',
          bgcolor: theme.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isSelected
            ? `0 0 0 4px ${theme.light}, 0 4px 16px ${theme.main}40`
            : `0 2px 8px ${theme.main}30`,
          transition: 'box-shadow 0.25s ease',
        }}
      >
        <Icon sx={{ color: '#fff', fontSize: { xs: 24, md: 28 } }} />
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: '#1a1a2e',
          fontSize: { xs: '0.75rem', md: '0.8125rem' },
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {step.title}
      </Typography>

      <StepStatusBadge status={step.status} theme={theme} />
    </Box>
  );
}

export default memo(InvestmentStep);
