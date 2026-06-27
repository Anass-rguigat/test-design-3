export const formatCurrency = (amount, currency = 'MAD') => {
  if (amount == null || Number.isNaN(amount)) return '—';
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDuration = (days) => {
  if (!days) return '—';
  if (days < 7) return `${days} jour${days > 1 ? 's' : ''}`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return `${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }
  const months = Math.round(days / 30);
  return `${months} mois`;
};

export const formatNumber = (num) => {
  if (num == null) return '—';
  return new Intl.NumberFormat('fr-MA').format(num);
};

export const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
