
// Format the given date (uses current one if not provided) to YYYY-MM-DD
export const formatDate = (date?: Date | number): string => {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return (date || new Date()).toISOString().slice(0, 10) || '';
};

// Format the given date (uses current one if not provided) to YYYY-MM-DD HH:MM:SS
export const formatTime = (date?: Date | number): string => {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return (date || new Date()).toISOString().slice(0, 19).replace('T', ' ') || '';
};