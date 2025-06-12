
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-light">
            Let's connect and build the future together
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to discuss AI, Web3, and emerging technologies. 
            Whether you want to collaborate on research, explore new ideas, or 
            just have a meaningful conversation about tech - let's connect.
          </p>
          
          <div className="flex justify-center space-x-6 text-slate-400">
            <a 
              href="https://x.com/ravikantagrawal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter
            </a>
            <span>•</span>
            <a 
              href="https://www.linkedin.com/in/ravikantagrawal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a 
              href="https://youtube.com/playlist?list=PL0_fxxZ-lFiTl8tXrMhDtUx4jgBq-t0i3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-700 mt-12">
          <p className="text-slate-400 text-sm">
            Exploring AI & Web3 • Sharing insights on emerging tech
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
