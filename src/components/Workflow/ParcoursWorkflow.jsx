import { memo } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import InvestmentStep from './InvestmentStep';
import StepDetailCard from './StepDetailCard';
import WorkflowCarousel from './WorkflowCarousel';
import { HorizontalConnector } from './WorkflowConnector';
import { STEPS_PER_ROW } from './workflowUtils';

function StepColumn({ step, isSelected, onSelect, index }) {
  return (
    <Box
      component={motion.div}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flex: `0 0 calc(100% / ${STEPS_PER_ROW})`,
        minWidth: { xs: '85%', sm: '50%', md: `calc(100% / ${STEPS_PER_ROW})` },
        maxWidth: `calc(100% / ${STEPS_PER_ROW})`,
        px: 1,
        scrollSnapAlign: 'start',
      }}
    >
      {index > 0 && (
        <Box sx={{ pt: 3.5, flexShrink: 0, mx: -0.5, display: { xs: 'none', sm: 'block' } }}>
          <HorizontalConnector />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <InvestmentStep
          step={step}
          isSelected={isSelected}
          onSelect={onSelect}
          index={index}
        />

        <Box
          sx={{
            width: 1.5,
            height: 24,
            background: `linear-gradient(180deg, #CBD5E1 0%, ${step.theme.main}40 100%)`,
            borderRadius: 1,
            my: 0.75,
          }}
          aria-hidden="true"
        />

        <Box sx={{ width: '100%', flex: 1 }}>
          <StepDetailCard step={step} isSelected={isSelected} index={index} />
        </Box>
      </Box>
    </Box>
  );
}

function ParcoursWorkflow({ steps, selectedStepId, onSelectStep }) {
  const visibleSteps = steps.filter((s) => s.visible !== false);
  const canScroll = visibleSteps.length > STEPS_PER_ROW;

  const columns = visibleSteps.map((step, i) => (
    <StepColumn
      key={step.id}
      step={step}
      isSelected={selectedStepId === step.id}
      onSelect={onSelectStep}
      index={i}
    />
  ));

  if (canScroll) {
    return (
      <Box sx={{ width: '100%' }} role="list" aria-label="Étapes du parcours">
        <WorkflowCarousel steps={visibleSteps}>{columns}</WorkflowCarousel>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }} role="list" aria-label="Étapes du parcours">
      <Box sx={{ display: 'flex' }}>{columns}</Box>
    </Box>
  );
}

export default memo(ParcoursWorkflow);
