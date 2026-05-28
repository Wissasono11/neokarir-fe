import React, { lazy } from 'react';

// Lazy loaded page
const OnboardingPage = lazy(() => import('../pages/OnboardingPage'));

export const onboardingRoutes = [
  { path: '/onboarding', element: <OnboardingPage /> },
];
