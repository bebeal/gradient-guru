
// Convert kebab-case to Title Case
// Example: kebabToTitleCase('hello-world') => 'Hello World'
export const kebabToTitleCase = (str: string) => {
  return str.replace(/(?:^|-)([a-z])/gi, (m, p1) => ` ${p1.toUpperCase()}`).trim()
}

export const toCamelCase = (snakeStr: string): string => {
  const components = snakeStr.split('_');
  return (
    components[0] +
    components
      .slice(1)
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('')
  );
};

export const toSnakeCase = (camelStr: string): string => {
  return camelStr
    .split('')
    .map((c) => (c === c.toUpperCase() ? `_${c.toLowerCase()}` : c))
    .join('')
    .trimStart();
};

// Get initials from name, e.g. John Doe => JD
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');
};
