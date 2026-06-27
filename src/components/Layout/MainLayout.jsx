import { memo } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { MICEPP } from '../../theme/brandColors';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiTrendingUp, FiHome, FiSettings, FiInfo } from 'react-icons/fi';

const navItems = [
  { path: '/', label: 'Parcours', icon: FiHome },
  { path: '/settings', label: 'Paramètres', icon: FiSettings },
  { path: '/about', label: 'À propos', icon: FiInfo },
];

function MainLayout() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'grey.100',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: MICEPP.gradientPrimary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiTrendingUp size={16} color="#fff" />
            </Box>
            <Typography variant="h6" fontWeight={800} sx={{ display: { xs: 'none', sm: 'block' } }}>
              Parcours Investissement
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {navItems.map(({ path, icon: Icon }) => (
              <IconButton
                key={path}
                component={NavLink}
                to={path}
                end={path === '/'}
                color={location.pathname === path ? 'primary' : 'default'}
              >
                <Icon size={20} />
              </IconButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, minWidth: 0, bgcolor: MICEPP.background }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default memo(MainLayout);
