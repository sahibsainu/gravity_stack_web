import { User } from '../types';

// Simulated authentication for demo purposes
// In a real application, this would interact with a backend API

const STORAGE_KEY = 'gravitystack_user';

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(STORAGE_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user from localStorage', error);
    return null;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo login - in real app, this would validate against a backend
      if (email && password.length >= 6) {
        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          firstName: 'Demo',
          lastName: 'User',
          createdAt: new Date(),
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800); // Simulate network delay
  });
};

export const register = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email is already registered (in a real app)
      if (email && password.length >= 6) {
        const user: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          createdAt: new Date(),
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid registration data'));
      }
    }, 800);
  });
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};
