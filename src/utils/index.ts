export function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Simple logging wrapper
export const log = (...args: any[]) => {
  // Check if logging is enabled via environment variable
  if (import.meta.env.VITE_ENABLE_LOGGING === 'true') {
    console.log(...args);
  }
};

export const logError = (...args: any[]) => {
   // Check if logging is enabled via environment variable
   if (import.meta.env.VITE_ENABLE_LOGGING === 'true') {
    console.error(...args);
  }
};

// Utility to extract the base project name (remove -randomsuffix)
export const getBaseProjectName = (fullProjectName: string): string => {
  const match = fullProjectName.match(/^(.*?)-[a-z0-9]{6}$/); // Matches name-randomstring (6 chars)
  if (match && match[1]) {
    return match[1]; // Return the part before the last hyphen and 6 chars
  }
  return fullProjectName; // Return original name if suffix pattern not found
};
