import { memo } from 'react';
import { Box, Typography, LinearProgress, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { formatCurrency, formatDuration } from '../../utils/formatters';

function WorkflowHeader({ workflow }) {
  const { progress, totalDuration, totalCost, recommendations, globalWarnings } = workflow;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{ mb: 4 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 0.5, color: 'grey.900' }}>
            Parcours d&apos;Investissement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visualisez et suivez chaque étape de votre projet
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Chip
            icon={<FiClock size={14} />}
            label={formatDuration(totalDuration)}
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 500 }}
          />
          <Chip
            icon={<FiDollarSign size={14} />}
            label={formatCurrency(totalCost)}
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 500 }}
          />
          <Chip
            icon={<FiTrendingUp size={14} />}
            label={`${progress}% complété`}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 600 }}
          />
        </Stack>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Progression globale
          </Typography>
          <Typography variant="caption" color="primary.main" fontWeight={600}>
            {progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'grey.100',
            '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #2563EB, #6366F1)' },
          }}
          aria-label={`Progression: ${progress}%`}
        />
      </Box>

      {(recommendations.length > 0 || globalWarnings.length > 0) && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {recommendations.map((rec) => (
            <Chip key={rec} label={rec} size="small" color="primary" variant="outlined" sx={{ borderRadius: 2, maxWidth: 360 }} />
          ))}
          {globalWarnings.map((warn) => (
            <Chip key={warn} label={warn} size="small" color="warning" variant="outlined" sx={{ borderRadius: 2, maxWidth: 360 }} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default memo(WorkflowHeader);
