import { memo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FiDollarSign, FiUsers } from 'react-icons/fi';
import { Controller } from 'react-hook-form';

function BudgetSection({ control, errors }) {
  return (
    <Accordion defaultExpanded disableGutters elevation={0} sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="budget-content">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'success.light', display: 'flex' }}>
            <FiDollarSign size={18} color="#10B981" />
          </Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Budget & Effectifs
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="budget"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <TextField
                  {...rest}
                  value={value ?? ''}
                  onChange={(e) => onChange(Number(e.target.value))}
                  label="Budget du projet"
                  type="number"
                  fullWidth
                  error={!!errors.budget}
                  helperText={errors.budget?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiDollarSign size={16} color="#64748B" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">MAD</InputAdornment>,
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="employeesNumber"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <TextField
                  {...rest}
                  value={value ?? ''}
                  onChange={(e) => onChange(Number(e.target.value))}
                  label="Nombre d'employés"
                  type="number"
                  fullWidth
                  error={!!errors.employeesNumber}
                  helperText={errors.employeesNumber?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiUsers size={16} color="#64748B" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default memo(BudgetSection);
