
import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import MediaGallery from '@/components/MediaGallery';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Achievements />
      <MediaGallery />
      <Footer />
    </div>
  );
};

export default Index;
