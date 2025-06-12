
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-light text-slate-800">
              Building tomorrow's tech today
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I'm passionate about the intersection of AI and Web3 technologies, 
                constantly exploring how these emerging fields can reshape our digital world. 
                Through research, content creation, and hands-on experimentation, I share 
                insights that matter.
              </p>
              <p>
                My work spans across thought leadership in AI applications, Web3 infrastructure, 
                and the practical implications of decentralized technologies. I believe in 
                making complex concepts accessible and actionable for everyone.
              </p>
              <p>
                Whether it's through detailed whitepapers, engaging video content, or 
                strategic insights, I'm committed to advancing our collective understanding 
                of these transformative technologies.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-3xl p-8 transform rotate-2 transition-transform hover:rotate-0 duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Ravikant Agrawal"
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
