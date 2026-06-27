import { memo } from 'react';
import { Box, Typography, Link, Divider, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  AccessTimeOutlined,
  AccountBalanceWalletOutlined,
  BusinessOutlined,
  GpsFixedOutlined,
  FolderOpenOutlined,
  DescriptionOutlined,
  AutorenewOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
  LanguageOutlined,
  ApartmentOutlined,
  AccountBalanceOutlined,
  ConstructionOutlined,
  AdminPanelSettingsOutlined,
  ExpandMoreOutlined,
} from '@mui/icons-material';

const ENTITY_ICONS = {
  building: ApartmentOutlined,
  bank: AccountBalanceOutlined,
  construction: ConstructionOutlined,
  admin: AdminPanelSettingsOutlined,
};

function MetricPill({ icon: Icon, label, value, color }) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        p: 1.25,
        borderRadius: 2,
        bgcolor: `${color}08`,
        border: `1px solid ${color}20`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
        <Icon sx={{ fontSize: 14, color }} />
        <Typography variant="caption" color="text.secondary" fontSize="0.625rem" fontWeight={600} noWrap>
          {label}
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight={700} fontSize="0.75rem" color="text.primary" noWrap>
        {value}
      </Typography>
    </Box>
  );
}

function SectionBlock({ icon: Icon, title, children, color, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 1.25 }}>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          border: 'none',
          bgcolor: 'transparent',
          cursor: 'pointer',
          p: 0,
          mb: open ? 0.75 : 0,
        }}
        aria-expanded={open}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ p: 0.5, borderRadius: 1.5, bgcolor: `${color}12`, display: 'flex' }}>
            <Icon sx={{ fontSize: 14, color }} />
          </Box>
          <Typography variant="caption" fontWeight={700} fontSize="0.6875rem" color="text.primary">
            {title}
          </Typography>
        </Box>
        <ExpandMoreOutlined
          sx={{
            fontSize: 16,
            color: 'text.secondary',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
      </Box>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
}

function ContactBox({ contact, theme }) {
  return (
    <Box
      sx={{
        p: 1.5,
        mb: 1.5,
        borderRadius: 2.5,
        background: `linear-gradient(135deg, ${theme.light} 0%, #fff 100%)`,
        border: `1px solid ${theme.main}18`,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.25, mb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: theme.main,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 4px 12px ${theme.main}40`,
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.6rem', lineHeight: 1 }}>
            {contact.logoText}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={700} fontSize="0.8125rem" sx={{ pt: 0.5 }}>
          {contact.name}
        </Typography>
      </Box>
      {[
        { Icon: LocationOnOutlined, text: contact.address },
        { Icon: PhoneOutlined, text: contact.phone },
        { Icon: EmailOutlined, text: contact.email },
      ].map(({ Icon, text }) => (
        <Box key={text} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, mb: 0.5 }}>
          <Icon sx={{ fontSize: 13, color: theme.main, mt: 0.15 }} />
          <Typography variant="caption" color="text.secondary" lineHeight={1.4}>
            {text}
          </Typography>
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <LanguageOutlined sx={{ fontSize: 13, color: theme.main }} />
        <Link href={`https://${contact.website}`} variant="caption" underline="hover" sx={{ color: theme.main, fontWeight: 600 }}>
          {contact.website}
        </Link>
      </Box>
    </Box>
  );
}

function EntityBox({ description, entityIcon, theme }) {
  const EntityIcon = ENTITY_ICONS[entityIcon] || BusinessOutlined;
  return (
    <Box
      sx={{
        p: 1.5,
        mb: 1.5,
        borderRadius: 2.5,
        background: `linear-gradient(135deg, ${theme.light} 0%, #fff 100%)`,
        border: `1px solid ${theme.main}18`,
        display: 'flex',
        gap: 1.25,
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: theme.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <EntityIcon sx={{ fontSize: 20, color: '#fff' }} />
      </Box>
      <Typography variant="caption" color="text.secondary" lineHeight={1.5}>
        {description}
      </Typography>
    </Box>
  );
}

function BulletList({ items, color }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
      {items.map((item) => (
        <Box
          key={item}
          component="li"
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0.75,
            mb: 0.5,
            pl: 0.5,
          }}
        >
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              bgcolor: color,
              mt: 0.6,
              flexShrink: 0,
            }}
          />
          <Typography variant="caption" color="text.secondary" lineHeight={1.45} fontSize="0.6875rem">
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function StepDetailCard({ step, isSelected, index }) {
  const theme = step.theme;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      sx={{
        width: '100%',
        bgcolor: '#fff',
        borderRadius: 3,
        border: '1px solid',
        borderColor: isSelected ? `${theme.main}50` : '#E8ECF0',
        overflow: 'hidden',
        boxShadow: isSelected
          ? `0 8px 32px ${theme.main}18, 0 0 0 1px ${theme.main}30`
          : '0 2px 12px rgba(15, 23, 42, 0.04)',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="article"
      aria-label={`Détails étape ${step.id}: ${step.title}`}
    >
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${theme.main}, ${theme.main}88)`,
        }}
      />

      <Box sx={{ p: 2, flex: 1, overflow: 'auto', maxHeight: 420 }}>
        <Typography
          variant="overline"
          sx={{ color: theme.main, fontWeight: 700, fontSize: '0.625rem', letterSpacing: '0.08em' }}
        >
          Étape {String(step.id).padStart(2, '0')}
        </Typography>
        <Typography variant="subtitle1" fontWeight={800} fontSize="0.9375rem" sx={{ lineHeight: 1.25, mb: 0.25 }}>
          {step.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
          {step.subtitle}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
          <MetricPill icon={AccessTimeOutlined} label="Durée" value={step.durationLabel} color={theme.main} />
          <MetricPill icon={AccountBalanceWalletOutlined} label="Coût" value={step.costLabel} color={theme.main} />
        </Box>
        <MetricPill icon={BusinessOutlined} label="Organisme" value={step.organism} color={theme.main} />

        <Divider sx={{ my: 1.5, borderColor: '#F1F5F9' }} />

        {step.contact ? (
          <ContactBox contact={step.contact} theme={theme} />
        ) : (
          <EntityBox description={step.entityDescription} entityIcon={step.entityIcon} theme={theme} />
        )}

        <SectionBlock icon={GpsFixedOutlined} title="Objectif" color={theme.main}>
          <Typography variant="caption" color="text.secondary" lineHeight={1.55} fontSize="0.6875rem">
            {step.objective}
          </Typography>
        </SectionBlock>

        <SectionBlock icon={FolderOpenOutlined} title="Documents requis" color={theme.main}>
          <BulletList items={step.requiredDocuments} color={theme.main} />
        </SectionBlock>

        <SectionBlock icon={DescriptionOutlined} title="Documents générés" color={theme.main} defaultOpen={false}>
          <BulletList items={step.generatedDocuments} color={theme.main} />
        </SectionBlock>

        <SectionBlock icon={AutorenewOutlined} title="Utilisation ultérieure" color={theme.main} defaultOpen={false}>
          <BulletList items={step.futureUse} color={theme.main} />
        </SectionBlock>
      </Box>
    </Box>
  );
}

export default memo(StepDetailCard);
