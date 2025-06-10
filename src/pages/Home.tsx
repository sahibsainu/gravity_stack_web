import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PricingSection from '../components/home/PricingSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CtaSection from '../components/home/CtaSection';

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <CtaSection />
    </MainLayout>
  );
};

export default Home;
