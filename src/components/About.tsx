
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-light text-slate-800">
              A bit about my journey
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I believe in the power of authentic connections and genuine growth. 
                Over the years, I've learned that the most meaningful achievements come 
                from staying curious and being willing to step outside my comfort zone.
              </p>
              <p>
                Whether it's through professional projects, personal challenges, or 
                simple everyday moments, I'm always looking for ways to make a positive 
                impact and learn something new.
              </p>
              <p>
                This space is my way of sharing that journey with you - the wins, 
                the lessons, and everything in between.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-3xl p-8 transform rotate-2 transition-transform hover:rotate-0 duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face"
                  alt="Personal photo"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
