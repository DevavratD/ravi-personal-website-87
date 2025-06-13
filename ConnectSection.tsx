
import React, { useState } from 'react';
import { ArrowRight, Mail, Calendar, Linkedin, Twitter, Youtube } from 'lucide-react';

const ConnectSection = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle subscription logic here
  };

  return (
    <div className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to explore partnerships, share insights, or discuss the future of technology? 
              Let's start a conversation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Newsletter Signup */}
            <div className="glass rounded-3xl p-8 reveal hover-lift">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Stay Updated</h3>
                  <p className="text-muted-foreground">
                    Get insights on AI, blockchain, and growth strategies delivered to your inbox.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 border border-border rounded-full bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                    <div className={`absolute right-2 top-2 transition-all ${
                      isValidEmail ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!isValidEmail}
                    className={`w-full py-4 rounded-full font-medium transition-all magnetic-btn ${
                      isValidEmail
                        ? 'bg-primary text-primary-foreground hover:shadow-lg'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Subscribe to Updates
                  </button>
                </form>
              </div>
            </div>
            
            {/* Schedule Call */}
            <div className="glass rounded-3xl p-8 reveal hover-lift">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Schedule a Call</h3>
                  <p className="text-muted-foreground">
                    Let's discuss partnerships, mentoring opportunities, or speaking engagements.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-xl">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-xl">
                      <span className="text-sm text-muted-foreground">Format</span>
                      <span className="font-medium">Video call</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-xl">
                      <span className="text-sm text-muted-foreground">Response</span>
                      <span className="font-medium">Within 24h</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-accent text-accent-foreground rounded-full font-medium hover:shadow-lg transition-all magnetic-btn">
                    Book a Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="reveal">
            <h3 className="text-2xl font-bold mb-8">Follow the Journey</h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="group">
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-primary/10 transition-all hover-lift">
                  <Linkedin className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-primary/10 transition-all hover-lift">
                  <Twitter className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-primary/10 transition-all hover-lift">
                  <Youtube className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;
