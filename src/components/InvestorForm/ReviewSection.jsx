import { memo } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { INVESTOR_TYPES, COMPANY_TYPES, PROJECT_TYPES, SECTORS, REGIONS } from '../../utils/constants';

function ReviewSection({ values }) {
  const getLabel = (list, val) => list.find((i) => i.value === val)?.label || val;

  const activeCharacteristics = Object.entries(values)
    .filter(([key, val]) => typeof val === 'boolean' && val && !['needLand', 'needConstruction'].includes(key))
    .length;

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.100' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <FiCheckCircle size={16} color="#10B981" />
        <Typography variant="subtitle2" fontWeight={700}>
          Récapitulatif
        </Typography>
      </Box>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {getLabel(INVESTOR_TYPES, values.investorType)} · {getLabel(COMPANY_TYPES, values.companyType)} · {getLabel(PROJECT_TYPES, values.projectType)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getLabel(SECTORS, values.sector)} · {getLabel(REGIONS, values.region)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={formatCurrency(values.budget)} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
          <Chip label={`${formatNumber(values.employeesNumber)} employés`} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
          <Chip label={`${activeCharacteristics} caractéristiques`} size="small" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
        </Box>
      </Stack>
    </Box>
  );
}

export default memo(ReviewSection);
