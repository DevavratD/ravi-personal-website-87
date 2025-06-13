import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MyJourney from '@/components/MyJourney';
import MediaGallery from '@/components/MediaGallery';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <MyJourney />
      <MediaGallery />
      <Footer />
    </div>
  );
};

export default Index;
