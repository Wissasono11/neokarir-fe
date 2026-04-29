import React from 'react';
import LandingLayout from '../layouts/LandingLayout';
import HeroSection from '../features/landing/components/HeroSection';
import TrustBar from '../features/landing/components/TrustBar';
import HowItWorksSection from '../features/landing/components/HowItWorksSection';
import ProblemSection from '../features/landing/components/ProblemSection';
import FeaturesSection from '../features/landing/components/FeaturesSection';
import TestimonialSection from '../features/landing/components/TestimonialSection';
import CTASection from '../features/landing/components/CTASection';

const LandingPage = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <ProblemSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
    </LandingLayout>
  );
};

export default LandingPage;
