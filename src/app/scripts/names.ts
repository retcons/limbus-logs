// Simple function for converting snake_case to Title Case for Sinners
export const idToName = (id: string) => {
  return id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

// And the reverse 
export const nameToId = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');
};