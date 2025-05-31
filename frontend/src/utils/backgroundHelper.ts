// Helper function to determine the background class based on verse tone
export const getBackgroundClass = (tone: string): string => {
  switch (tone) {
    case 'encouragement':
      return 'bg-gradient-to-r from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/30';
    case 'hopeful':
      return 'bg-gradient-to-r from-blue-100 to-sky-50 dark:from-blue-900/40 dark:to-sky-900/30';
    case 'command':
      return 'bg-gradient-to-r from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/30';
    case 'glad_tidings':
      return 'bg-gradient-to-r from-indigo-100 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/30';
    case 'warning':
      return 'bg-gradient-to-r from-red-100 to-rose-50 dark:from-red-900/40 dark:to-rose-900/30';
    default:
      return 'bg-gradient-to-r from-gray-100 to-slate-50 dark:from-gray-900/40 dark:to-slate-900/30';
  }
};