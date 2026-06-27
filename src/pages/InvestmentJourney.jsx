import { memo } from 'react';
import { Box, Grid } from '@mui/material';
import { InvestorFormPanel } from '../components/InvestorForm';
import ParcoursWorkflow from '../components/Workflow/ParcoursWorkflow';
import { useInvestment } from '../contexts/InvestmentContext';

function InvestmentJourney() {
  const { workflow, selectedStepId, selectStep } = useInvestment();

  return (
    <Box sx={{ p: { xs: 1.5, md: 2 }, maxWidth: 1920, mx: 'auto' }}>
      <Grid container spacing={{ xs: 2, md: 2.5 }}>
        {/* Left — Form */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <InvestorFormPanel />
        </Grid>

        {/* Right — Workflow (circle above card, 3 per row) */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: 2,
              border: '1px solid #E0E0E0',
              p: { xs: 1.5, md: 2 },
              minHeight: { lg: 'calc(100vh - 96px)' },
            }}
          >
            <ParcoursWorkflow
              steps={workflow.steps}
              selectedStepId={selectedStepId}
              onSelectStep={selectStep}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(InvestmentJourney);
