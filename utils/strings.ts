
// Convert kebab-case to Title Case
// Example: kebabToTitleCase('hello-world') => 'Hello World'
export const kebabToTitleCase = (str: string) => {
  return str.replace(/(?:^|-)([a-z])/gi, (m, p1) => ` ${p1.toUpperCase()}`).trim()
}
