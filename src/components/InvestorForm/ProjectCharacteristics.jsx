import { memo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { MICEPP } from '../../theme/brandColors';
import { ExpandMore } from '@mui/icons-material';
import { FiSettings } from 'react-icons/fi';
import { Controller } from 'react-hook-form';

const CHARACTERISTICS = [
  { name: 'needLand', label: 'Besoin de terrain' },
  { name: 'needConstruction', label: 'Besoin de construction' },
  { name: 'environmentalImpact', label: 'Impact environnemental' },
  { name: 'importActivity', label: 'Activité import' },
  { name: 'exportActivity', label: 'Activité export' },
  { name: 'industrialZone', label: 'Zone industrielle' },
  { name: 'tourismProject', label: 'Projet tourisme' },
  { name: 'agriculturalProject', label: 'Projet agricole' },
  { name: 'foodActivity', label: 'Activité alimentaire' },
  { name: 'medicalActivity', label: 'Activité médicale' },
  { name: 'energyProject', label: 'Projet énergie' },
  { name: 'needWater', label: 'Besoin eau' },
  { name: 'needElectricity', label: 'Besoin électricité' },
  { name: 'needGas', label: 'Besoin gaz' },
  { name: 'nearPort', label: 'Proximité port' },
  { name: 'nearAirport', label: 'Proximité aéroport' },
  { name: 'innovationProject', label: 'Projet innovation' },
  { name: 'digitalProject', label: 'Projet digital' },
  { name: 'researchProject', label: 'Projet recherche' },
  { name: 'womenEntrepreneurship', label: 'Entrepreneuriat féminin' },
  { name: 'youthEntrepreneurship', label: 'Entrepreneuriat jeunes' },
  { name: 'foreignInvestment', label: 'Investissement étranger' },
  { name: 'publicPrivatePartnership', label: 'Partenariat public-privé' },
  { name: 'specialEconomicZone', label: 'Zone économique spéciale' },
  { name: 'greenProject', label: 'Projet vert' },
];

function ProjectCharacteristics({ control }) {
  return (
    <Accordion defaultExpanded disableGutters elevation={0} sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="characteristics-content">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.light', display: 'flex' }}>
            <FiSettings size={18} color={MICEPP.primaryDark} />
          </Box>
          <Typography variant="subtitle1" fontWeight={700}>
            Caractéristiques du projet
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {CHARACTERISTICS.map(({ name, label }) => (
            <Grid key={name} size={{ xs: 12, sm: 6 }}>
              <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, ...rest } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...rest}
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        {label}
                      </Typography>
                    }
                    sx={{
                      m: 0,
                      p: 1.25,
                      width: '100%',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: value ? 'primary.light' : 'grey.100',
                      bgcolor: value ? 'primary.light' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  />
                )}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default memo(ProjectCharacteristics);
