import { memo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        p: 4,
      }}
    >
      <FiAlertCircle size={48} color="#94A3B8" />
      <Typography variant="h3" fontWeight={800} sx={{ mt: 2, mb: 1 }}>
        404
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        La page que vous recherchez n&apos;existe pas.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ borderRadius: 2 }}>
        Retour au parcours
      </Button>
    </Box>
  );
}

export default memo(NotFound);
