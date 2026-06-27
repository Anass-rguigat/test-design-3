import { memo } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { MICEPP } from '../theme/brandColors';

import { FiInfo, FiShield, FiUsers } from 'react-icons/fi';

const features = [
  { icon: FiShield, title: 'Conformité réglementaire', desc: 'Parcours aligné sur les exigences administratives marocaines.' },
  { icon: FiUsers, title: 'Accompagnement personnalisé', desc: 'Recommandations adaptées à votre profil d\'investisseur.' },
  { icon: FiInfo, title: 'Transparence totale', desc: 'Durées, coûts et documents requis pour chaque étape.' },
];

function About() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 960, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        À propos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Parcours Investissement est une plateforme digitale alignée sur l&apos;identité visuelle du{' '}
        <Box component="a" href="https://micepp.gov.ma/" target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Ministère de l&apos;Investissement (MICEPP)
        </Box>
        , pour accompagner les investisseurs dans toutes les étapes de leur projet au Maroc.
      </Typography>
      <Grid container spacing={3}>
        {features.map(({ icon: Icon, title, desc }) => (
          <Grid key={title} size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', border: '1px solid', borderColor: 'grey.100' }} elevation={0}>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'primary.light', display: 'inline-flex', mb: 2 }}>
                <Icon size={20} color={MICEPP.primary} />
              </Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default memo(About);
