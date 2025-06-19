import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { getHeroContent } from '@/utils/contentful';
import { IHeroContent } from '@/types/contentful';

const Hero = () => {
  const [heroContent, setHeroContent] = useState<IHeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const content = await getHeroContent();
        if (content) {
          setHeroContent(content.fields as IHeroContent);
        }
      } catch (err) {
        console.error('Error fetching hero content:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroContent();
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToConnect = () => {
    document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="text-slate-600">Loading...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1
            className="text-5xl md:text-7xl font-light text-slate-800 tracking-tight"
            dangerouslySetInnerHTML={{
              __html: heroContent?.title || "Hi, I'm <span class='text-blue-600 font-medium'>Ravikant</span> 👋"
            }}
          />
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {heroContent?.subtitle || "AI & Web3 Growth Strategy Leader\nBuilding the future of decentralized identity and AI-driven ecosystems"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            {heroContent?.buttonText || "Learn about my journey"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToConnect}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-full transition-all duration-300"
          >
            Let's connect
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
