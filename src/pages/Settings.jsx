import { memo } from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Divider } from '@mui/material';
import { FiSettings } from 'react-icons/fi';
import { MICEPP } from '../theme/brandColors';

function Settings() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 720, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <FiSettings size={24} color={MICEPP.primary} />
        <Typography variant="h4" fontWeight={700}>
          Paramètres
        </Typography>
      </Box>
      <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.100' }} elevation={0}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          Préférences d&apos;affichage
        </Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Animations activées" />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel control={<Switch defaultChecked />} label="Notifications par email" />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel control={<Switch />} label="Mode compact" />
      </Paper>
    </Box>
  );
}

export default memo(Settings);
