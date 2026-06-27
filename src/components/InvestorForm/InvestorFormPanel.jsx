import { memo, useEffect } from 'react';
import { Box, Typography, LinearProgress, Button, CircularProgress } from '@mui/material';
import { MICEPP } from '../../theme/brandColors';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInvestment } from '../../contexts/InvestmentContext';
import { investorSchema, getFormProgress } from '../../utils/validationSchema';
import { submitInvestorData } from '../../services/workflowService';
import GeneralInformation from './GeneralInformation';
import ProjectCharacteristics from './ProjectCharacteristics';
import BudgetSection from './BudgetSection';
import ReviewSection from './ReviewSection';

function InvestorFormPanel() {
  const { investorData, updateInvestorData, setLoading, setSubmitted, isLoading, isSubmitted } = useInvestment();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: investorData,
    resolver: zodResolver(investorSchema),
    mode: 'onChange',
  });

  const watchedValues = useWatch({ control });
  const { progress } = getFormProgress(watchedValues, errors);

  useEffect(() => {
    const subscription = watch((values) => {
      updateInvestorData(values);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateInvestorData]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitInvestorData(data);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        height: { md: 'calc(100vh - 64px)' },
        display: 'flex',
        flexDirection: 'column',
        position: { md: 'sticky' },
        top: { md: 64 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2.5, md: 3 },
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.06)',
        }}
      >
        <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
          Votre Projet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Renseignez les informations pour générer votre parcours
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Complétion du formulaire
            </Typography>
            <Typography variant="caption" color="primary.main" fontWeight={700}>
              {progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.100',
              '& .MuiLinearProgress-bar': { borderRadius: 3 },
            }}
            aria-label={`Complétion: ${progress}%`}
          />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} id="investor-form">
          <GeneralInformation control={control} watch={watch} errors={errors} />
          <ProjectCharacteristics control={control} />
          <BudgetSection control={control} errors={errors} />
          <ReviewSection values={watchedValues} />
        </form>
      </Box>

      <Box
        sx={{
          pt: 2,
          pb: { xs: 2, md: 0 },
          position: 'sticky',
          bottom: 0,
          bgcolor: 'background.default',
        }}
      >
        <Button
          type="submit"
          form="investor-form"
          variant="contained"
          size="large"
          fullWidth
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <FiSend size={18} />}
          sx={{
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            background: MICEPP.gradientPrimary,
            boxShadow: '0 8px 24px rgba(59, 145, 75, 0.35)',
            '&:hover': {
              background: 'linear-gradient(135deg, #007038 0%, #255A2F 100%)',
              boxShadow: '0 12px 32px rgba(59, 145, 75, 0.4)',
            },
          }}
        >
          {isLoading ? 'Génération en cours...' : isSubmitted ? 'Parcours généré ✓' : 'Générer le parcours'}
        </Button>
      </Box>
    </Box>
  );
}

export default memo(InvestorFormPanel);
