import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  userType: string;
}

interface UserContextType {
  user: User | null;
  registerUser: (userData: User) => Promise<void>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const registerUser = async (userData: User): Promise<void> => {
    try {
      // Simulate API call to register user
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      // Set user in context
      setUser(userData);
      
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
  const logoutUser = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, registerUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};