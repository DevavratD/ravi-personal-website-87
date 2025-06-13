
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-light text-slate-800 tracking-tight">
            Hey, I'm <span className="text-blue-600 font-medium">Ravikant</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI & Web3 enthusiast building the future of technology.
            Sharing insights on emerging tech, leadership, and digital transformation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Explore my journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-full transition-all duration-300"
          >
            View my content
          </Button>
        </div>

        <div className="pt-12">
          <Button
            variant="ghost"
            onClick={scrollToAbout}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
