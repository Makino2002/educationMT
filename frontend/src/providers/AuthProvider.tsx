'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthStart, setAuthSuccess, setInitDone } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      dispatch(setAuthStart());
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const user = await authService.restoreSession(token);
          if (user) {
            dispatch(setAuthSuccess({ user, token }));
            return;
          }
        } catch (error) {
          console.error("Failed to restore session", error);
        }
      }
      
      dispatch(setInitDone());
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
}
