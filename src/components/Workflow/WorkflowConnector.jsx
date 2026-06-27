import { memo } from 'react';
import { Box } from '@mui/material';

function HorizontalConnector() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
        width: { xs: 12, md: 16 },
        pt: 3.5,
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="10" viewBox="0 0 32 10" fill="none" preserveAspectRatio="none">
        <line x1="0" y1="5" x2="24" y2="5" stroke="#BDBDBD" strokeWidth="1.5" />
        <polygon points="24,1 32,5 24,9" fill="#BDBDBD" />
      </svg>
    </Box>
  );
}

function CurvedRowConnector() {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 40, md: 52 },
        display: 'flex',
        justifyContent: 'flex-end',
        pr: { xs: '8%', md: '5%' },
        my: 0.5,
      }}
      aria-hidden="true"
    >
      <svg width="80" height="52" viewBox="0 0 100 64" fill="none">
        <path
          d="M 50 0 L 50 24 Q 50 36 100 36 L 100 64"
          stroke="#BDBDBD"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <polygon points="96,58 100,66 104,58" fill="#BDBDBD" />
      </svg>
    </Box>
  );
}

export { HorizontalConnector, CurvedRowConnector };
export default memo(HorizontalConnector);
