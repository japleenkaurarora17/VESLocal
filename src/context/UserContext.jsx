import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCurrentUser } from '../data/mockData';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Try restoring persisted session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('veslocal_user');
      return saved ? JSON.parse(saved) : initialCurrentUser;
    } catch {
      return initialCurrentUser;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('veslocal_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('veslocal_token') || null;
    } catch {
      return null;
    }
  });

  const [connectedStudentIds, setConnectedStudentIds] = useState(() => {
    try {
      const saved = localStorage.getItem('veslocal_connections');
      return saved ? JSON.parse(saved) : ["student-2", "student-3"];
    } catch {
      return ["student-2", "student-3"];
    }
  });

  // Persist session changes
  useEffect(() => {
    try {
      localStorage.setItem('veslocal_auth', String(isLoggedIn));
      if (currentUser) {
        localStorage.setItem('veslocal_user', JSON.stringify(currentUser));
      }
      if (token) {
        localStorage.setItem('veslocal_token', token);
      } else {
        localStorage.removeItem('veslocal_token');
      }
      localStorage.setItem('veslocal_connections', JSON.stringify(connectedStudentIds));
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, [isLoggedIn, currentUser, token, connectedStudentIds]);

  const login = (userData, authToken = null) => {
    setIsLoggedIn(true);
    if (typeof userData === 'string') {
      // Legacy mock email string login
      const email = userData;
      if (email.toLowerCase() === 'japleen.kaur@ves.ac.in') {
        setCurrentUser(initialCurrentUser);
      } else {
        const extractedName = email.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        setCurrentUser({
          id: `student-${Date.now()}`,
          name: extractedName || "VESIT Student",
          email: email,
          department: "Information Technology",
          year: "Third Year",
          skills: ["React", "UI/UX", "JavaScript"],
          bio: "VESIT undergraduate student. Excited to discover local collaborations and build cool projects!",
          connectCount: 5,
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${extractedName || "User"}&backgroundColor=b6e3f4`,
          role: email.includes('admin') ? 'admin' : 'student'
        });
      }
    } else if (typeof userData === 'object' && userData !== null) {
      // Full user object from API response
      setCurrentUser(userData);
      if (authToken) {
        setToken(authToken);
      }
    }
  };

  const register = (registerData, authToken = null) => {
    setIsLoggedIn(true);
    const newProfile = {
      id: registerData.id || `student-${Date.now()}`,
      name: registerData.name,
      email: registerData.email,
      department: registerData.department || "Information Technology",
      year: registerData.year || "First Year",
      skills: registerData.skills || ["React", "Figma"],
      bio: registerData.bio || "Freshly registered student on VESLocal. Let's connect!",
      connectCount: registerData.connectCount || 0,
      avatarUrl: registerData.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${registerData.name}&backgroundColor=ffd5dc`,
      role: registerData.role || 'student'
    };
    setCurrentUser(newProfile);
    if (authToken) {
      setToken(authToken);
    }
    return newProfile;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setCurrentUser(initialCurrentUser);
    setConnectedStudentIds(["student-2", "student-3"]);
    try {
      localStorage.removeItem('veslocal_auth');
      localStorage.removeItem('veslocal_token');
      localStorage.removeItem('veslocal_user');
      localStorage.removeItem('veslocal_connections');
    } catch (e) {
      console.warn("Storage clear failed:", e);
    }
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const handleConnect = (studentId, studentObj = null) => {
    setConnectedStudentIds(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const value = {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    connectedStudentIds,
    login,
    register,
    logout,
    updateProfile,
    handleConnect
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;
