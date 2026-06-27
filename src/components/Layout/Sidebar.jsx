import { memo } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiSettings, FiInfo, FiTrendingUp } from 'react-icons/fi';

const navItems = [
  { path: '/', label: 'Parcours', icon: FiHome },
  { path: '/settings', label: 'Paramètres', icon: FiSettings },
  { path: '/about', label: 'À propos', icon: FiInfo },
];

function Sidebar() {
  const location = useLocation();

  return (
    <Box
      component="nav"
      aria-label="Navigation principale"
      sx={{
        width: 240,
        flexShrink: 0,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'grey.100',
        bgcolor: 'background.paper',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2563EB, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiTrendingUp size={18} color="#fff" />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={800} lineHeight={1.2}>
              Parcours
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Investissement
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 2 }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <ListItemButton
              key={path}
              component={NavLink}
              to={path}
              selected={isActive}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon size={18} />
              </ListItemIcon>
              <ListItemText primary={label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: '0.875rem' }} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default memo(Sidebar);
