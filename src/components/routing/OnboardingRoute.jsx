import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const OnboardingRoute = () => {
  const { isAuthenticated, isNewUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage={true} label="Memeriksa status pengguna..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isNewUser) {
    // If authenticated and NOT a new user, they shouldn't see onboarding again
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default OnboardingRoute;
