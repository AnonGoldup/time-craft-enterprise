
// Utility functions
export const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

export const formatDate = (date: Date | string, format = 'yyyy-MM-dd') => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  
  if (format === 'MMM dd, yyyy') {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[d.getMonth()]} ${day}, ${year}`;
  }
  return `${year}-${month}-${day}`;
};
