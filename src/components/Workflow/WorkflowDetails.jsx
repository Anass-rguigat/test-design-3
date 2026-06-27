import { memo } from 'react';
import { Box, Typography, Grid, Chip, Stack, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFileText,
  FiClock,
  FiDollarSign,
  FiAlertTriangle,
  FiDownload,
  FiCheckCircle,
  FiArrowRight,
  FiInfo,
  FiShield,
} from 'react-icons/fi';
import StepStatus from './StepStatus';
import { formatCurrency, formatDuration } from '../../utils/formatters';
import { getNextStep } from '../../utils/workflowEngine';

function DetailSection({ icon: Icon, title, children, color = '#2563EB' }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box sx={{ p: 0.75, borderRadius: 2, bgcolor: `${color}15`, display: 'flex' }}>
          <Icon size={16} color={color} aria-hidden="true" />
        </Box>
        <Typography variant="subtitle2" fontWeight={700} color="grey.900">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function WorkflowDetails({ step, allSteps }) {
  if (!step) return null;

  const nextStep = getNextStep(allSteps, step.id);

  return (
    <AnimatePresence mode="wait">
      <Box
        component={motion.div}
        key={step.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        sx={{
          mt: 4,
          p: { xs: 2.5, md: 3.5 },
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.06)',
        }}
        role="region"
        aria-label={`Détails de l'étape ${step.title}`}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="overline" color="primary.main" fontWeight={700} letterSpacing="0.1em">
              Étape {step.id}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
              {step.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560 }}>
              {step.description}
            </Typography>
          </Box>
          <StepStatus status={step.status} size="medium" />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DetailSection icon={FiFileText} title="Documents requis">
              <List dense disablePadding>
                {step.requiredDocuments.map((doc) => (
                  <ListItem key={doc} disableGutters sx={{ py: 0.375 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <FiCheckCircle size={14} color="#2563EB" />
                    </ListItemIcon>
                    <ListItemText primary={doc} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </DetailSection>

            <DetailSection icon={FiShield} title="Administration responsable" color="#6366F1">
              <Typography variant="body2" color="text.secondary">
                {step.administration}
              </Typography>
            </DetailSection>

            {step.warnings.length > 0 && (
              <DetailSection icon={FiAlertTriangle} title="Avertissements" color="#F59E0B">
                <Stack spacing={1}>
                  {step.warnings.map((w) => (
                    <Chip key={w} label={w} size="small" color="warning" variant="outlined" sx={{ borderRadius: 2, height: 'auto', py: 0.5, '& .MuiChip-label': { whiteSpace: 'normal' } }} />
                  ))}
                </Stack>
              </DetailSection>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={6}>
                <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.100' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                    <FiClock size={14} color="#64748B" />
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Durée estimée
                    </Typography>
                  </Box>
                  <Typography variant="h6">{formatDuration(step.duration)}</Typography>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.100' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                    <FiDollarSign size={14} color="#64748B" />
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Coût estimé
                    </Typography>
                  </Box>
                  <Typography variant="h6">{formatCurrency(step.cost)}</Typography>
                </Box>
              </Grid>
            </Grid>

            <DetailSection icon={FiInfo} title="Conseils" color="#10B981">
              <Stack spacing={0.75}>
                {step.tips.map((tip) => (
                  <Typography key={tip} variant="body2" color="text.secondary" sx={{ pl: 1, borderLeft: '2px solid #10B981' }}>
                    {tip}
                  </Typography>
                ))}
              </Stack>
            </DetailSection>

            <DetailSection icon={FiCheckCircle} title="Checklist">
              <List dense disablePadding>
                {step.checklist.map((item) => (
                  <ListItem key={item} disableGutters sx={{ py: 0.375 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Box sx={{ width: 16, height: 16, borderRadius: 1, border: '2px solid #CBD5E1' }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </DetailSection>

            {step.downloads?.length > 0 && (
              <DetailSection icon={FiDownload} title="Téléchargements" color="#6366F1">
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {step.downloads.map((dl) => (
                    <Button key={dl.label} size="small" variant="outlined" startIcon={<FiDownload size={14} />} sx={{ borderRadius: 2 }}>
                      {dl.label}
                    </Button>
                  ))}
                </Stack>
              </DetailSection>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing="0.05em">
              Prochaine action
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ mt: 0.25 }}>
              {step.nextAction}
            </Typography>
          </Box>
          {nextStep && (
            <Chip
              icon={<FiArrowRight size={14} />}
              label={`Suivant: ${nextStep.title}`}
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 3, fontWeight: 600 }}
            />
          )}
        </Box>
      </Box>
    </AnimatePresence>
  );
}

export default memo(WorkflowDetails);
