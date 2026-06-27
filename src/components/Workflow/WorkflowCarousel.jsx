import { memo } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { ChevronLeft, ChevronRight, SwipeOutlined } from '@mui/icons-material';
import { useWorkflowCarousel } from '../../hooks/useWorkflowCarousel';
import { STEPS_PER_ROW } from './workflowUtils';

function CarouselNav({ canGoPrev, canGoNext, goPrev, goNext, page, totalPages, totalSteps }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          icon={<SwipeOutlined sx={{ fontSize: '16px !important' }} />}
          label={`${totalSteps} étapes · Faites défiler`}
          size="small"
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '0.75rem',
            borderColor: 'primary.light',
            color: 'primary.main',
            bgcolor: 'primary.light',
            '& .MuiChip-icon': { color: 'primary.main' },
          }}
        />
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Page {page + 1} / {totalPages}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <IconButton
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Étapes précédentes"
          size="small"
          sx={{
            bgcolor: canGoPrev ? 'primary.main' : 'grey.100',
            color: canGoPrev ? '#fff' : 'grey.400',
            width: 36,
            height: 36,
            boxShadow: canGoPrev ? '0 2px 8px rgba(59, 145, 75, 0.35)' : 'none',
            '&:hover': { bgcolor: canGoPrev ? 'primary.dark' : 'grey.100' },
            transition: 'all 0.2s',
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Étapes suivantes"
          size="small"
          sx={{
            bgcolor: canGoNext ? 'primary.main' : 'grey.100',
            color: canGoNext ? '#fff' : 'grey.400',
            width: 36,
            height: 36,
            boxShadow: canGoNext ? '0 2px 8px rgba(59, 145, 75, 0.35)' : 'none',
            '&:hover': { bgcolor: canGoNext ? 'primary.dark' : 'grey.100' },
            transition: 'all 0.2s',
          }}
        >
          <ChevronRight />
        </IconButton>
      </Stack>
    </Box>
  );
}

function PageDots({ totalPages, page, onSelect }) {
  if (totalPages <= 1) return null;

  return (
    <Stack direction="row" spacing={0.75} justifyContent="center" sx={{ mt: 2 }}>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Box
          key={i}
          component="button"
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Aller à la page ${i + 1}`}
          aria-current={page === i ? 'true' : undefined}
          sx={{
            width: page === i ? 24 : 8,
            height: 8,
            borderRadius: 4,
            border: 'none',
            bgcolor: page === i ? 'primary.main' : 'grey.300',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            p: 0,
          }}
        />
      ))}
    </Stack>
  );
}

function WorkflowCarousel({ steps, children, itemsPerPage = STEPS_PER_ROW }) {
  const {
    scrollRef,
    page,
    totalPages,
    canScroll,
    canGoPrev,
    canGoNext,
    goNext,
    goPrev,
    scrollToPage,
  } = useWorkflowCarousel(steps.length, itemsPerPage);

  return (
    <Box sx={{ position: 'relative' }}>
      {canScroll && (
        <CarouselNav
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          goPrev={goPrev}
          goNext={goNext}
          page={page}
          totalPages={totalPages}
          totalSteps={steps.length}
        />
      )}

      <Box sx={{ position: 'relative' }}>
        {canScroll && canGoPrev && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 48,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        )}
        {canScroll && canGoNext && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 48,
              background: 'linear-gradient(270deg, rgba(255,255,255,0.95) 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        )}

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: canScroll ? 'auto' : 'visible',
            scrollSnapType: canScroll ? 'x mandatory' : 'none',
            scrollBehavior: 'smooth',
            pb: canScroll ? 0.5 : 0,
            mx: canScroll ? -0.5 : 0,
            '&::-webkit-scrollbar': { height: 0, display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </Box>
      </Box>

      {canScroll && (
        <PageDots totalPages={totalPages} page={page} onSelect={scrollToPage} />
      )}
    </Box>
  );
}

export default memo(WorkflowCarousel);
