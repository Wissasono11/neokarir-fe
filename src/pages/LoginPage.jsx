import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue your career journey"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
