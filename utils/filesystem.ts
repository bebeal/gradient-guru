
export const fileType = ['zipped', 'file', 'directory', 'unknown'] as const;
export type FileType = typeof fileType[number];

export const sizeFormats = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const;
export type SizeFormat = typeof sizeFormats[number];

// Format file size to be in a specified unit (default TB) with a specified base (default 1024)
export const formatSize = (size: number, unit: SizeFormat = 'TB', base: number = 1024): number => {
  const index = sizeFormats.indexOf(unit);
  const unitFactor = Math.pow(base, index);
  return (size / unitFactor);
};

// Infer unit for file size, defaults to base 1000 (e.g. 1 KB = 1000 B)
export const inferSizeFormat = (size: number, base=1000): SizeFormat => {
  const units: SizeFormat[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = Math.floor(Math.log(size) / Math.log(base));
  return units[index];
};

// Get file size in a human readable format with a specified precision (default 2) and unit (default inferred from size)
export const getFormattedSize = (size: number, unit: SizeFormat = inferSizeFormat(size), precision = 2): string => {
  const formattedSize = formatSize(size, unit);
  return `${formattedSize.toFixed(precision)} ${unit}`;
};
