
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-light">
            Let's stay connected
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I love hearing from people who are on their own journey of growth. 
            Whether you want to share your story, collaborate on something meaningful, 
            or just say hello - I'd love to hear from you.
          </p>
          
          <div className="flex justify-center space-x-6 text-slate-400">
            <a href="mailto:hello@example.com" className="hover:text-white transition-colors">
              hello@example.com
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-700 mt-12">
          <p className="text-slate-400 text-sm">
            Made with care • Updated regularly with new stories
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
