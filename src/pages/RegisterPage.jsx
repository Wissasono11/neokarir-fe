import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Start your career journey with AI-powered guidance"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
