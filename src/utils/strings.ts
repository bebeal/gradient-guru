
// Convert kebab-case to Title Case
// Example: kebabToTitleCase('hello-world') => 'Hello World'
export const kebabToTitleCase = (str: string) => {
  return str.replace(/(?:^|-)([a-z])/gi, (_m, p1) => ` ${p1.toUpperCase()}`).trim()
}

export const camelToSnakeCase = (str: string): string => {
  return str
    // Insert a hyphen before each uppercase letter, considering consecutive capitals as a single word
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    // Insert a hyphen before each single uppercase letter followed by lowercase letters
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    // Replace any sequence of digits with a hyphen prefix
    .replace(/(\d+)/g, '-$1')
    // Convert the entire string to lowercase
    .toLowerCase();
};

export const snakeToCamelCase = (snakeStr: string): string => {
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
