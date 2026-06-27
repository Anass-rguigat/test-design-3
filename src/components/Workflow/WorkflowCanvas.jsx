import { memo } from 'react';
import { Box } from '@mui/material';
import InvestmentStep from './InvestmentStep';
import { HorizontalConnector, CurvedRowConnector } from './WorkflowConnector';

function WorkflowCanvas({ steps, selectedStepId, onSelectStep }) {
  const visibleSteps = steps.filter((s) => s.visible !== false);
  const row1 = visibleSteps.filter((s) => s.id <= 4);
  const row2 = visibleSteps.filter((s) => s.id >= 5);

  const renderRow = (rowSteps, startIndex) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
        gap: { xs: 1, md: 0 },
      }}
    >
      {rowSteps.map((step, i) => (
        <Box key={step.id} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <InvestmentStep
            step={step}
            isSelected={selectedStepId === step.id}
            onSelect={onSelectStep}
            index={startIndex + i}
          />
          {i < rowSteps.length - 1 && <HorizontalConnector />}
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: '0 4px 24px rgba(15, 23, 42, 0.04)',
        overflow: 'auto',
      }}
      role="list"
      aria-label="Parcours d'investissement en 8 étapes"
    >
      {renderRow(row1, 0)}
      {row1.length > 0 && row2.length > 0 && <CurvedRowConnector />}
      {renderRow(row2, 4)}
    </Box>
  );
}

export default memo(WorkflowCanvas);
