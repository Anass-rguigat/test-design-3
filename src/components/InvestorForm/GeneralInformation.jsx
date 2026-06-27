import { memo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Autocomplete,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { MICEPP } from '../../theme/brandColors';
import { ExpandMore } from '@mui/icons-material';
import { FiUser } from 'react-icons/fi';
import { Controller } from 'react-hook-form';
import {
  INVESTOR_TYPES,
  COMPANY_TYPES,
  PROJECT_TYPES,
  REGIONS,
  PROVINCES,
  SECTORS,
  NATIONALITIES,
} from '../../utils/constants';

function GeneralInformation({ control, watch, errors }) {
  const selectedRegion = watch('region');
  const provinces = PROVINCES[selectedRegion] || [];

  return (
    <Accordion defaultExpanded disableGutters elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="general-info-content">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.light', display: 'flex' }}>
            <FiUser size={18} color={MICEPP.primary} />
          </Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Informations générales
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="investorType"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Type d'investisseur" fullWidth error={!!errors.investorType} helperText={errors.investorType?.message}>
                  {INVESTOR_TYPES.map((o) => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="nationality"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={NATIONALITIES}
                  getOptionLabel={(o) => o.label}
                  value={NATIONALITIES.find((n) => n.value === value) || null}
                  onChange={(_, v) => onChange(v?.value || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Nationalité" error={!!errors.nationality} helperText={errors.nationality?.message} />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="companyType"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Type de société" fullWidth error={!!errors.companyType} helperText={errors.companyType?.message}>
                  {COMPANY_TYPES.map((o) => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="projectType"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Type de projet" fullWidth error={!!errors.projectType} helperText={errors.projectType?.message}>
                  {PROJECT_TYPES.map((o) => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="region"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={REGIONS}
                  getOptionLabel={(o) => o.label}
                  value={REGIONS.find((r) => r.value === value) || null}
                  onChange={(_, v) => onChange(v?.value || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Région" error={!!errors.region} helperText={errors.region?.message} />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="province"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={provinces}
                  getOptionLabel={(o) => o.label}
                  value={provinces.find((p) => p.value === value) || null}
                  onChange={(_, v) => onChange(v?.value || '')}
                  disabled={!selectedRegion}
                  renderInput={(params) => (
                    <TextField {...params} label="Province" error={!!errors.province} helperText={errors.province?.message} />
                  )}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="sector"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={SECTORS}
                  getOptionLabel={(o) => o.label}
                  value={SECTORS.find((s) => s.value === value) || null}
                  onChange={(_, v) => onChange(v?.value || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Secteur d'activité" error={!!errors.sector} helperText={errors.sector?.message} />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default memo(GeneralInformation);
