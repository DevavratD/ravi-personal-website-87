import React from 'react';
import { Mail, Calendar, Send, Linkedin, Twitter, Youtube, MessageCircle } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  mail: <Mail className="w-6 h-6 text-blue-400" />,
  calendar: <Calendar className="w-6 h-6 text-blue-400" />,
  message: <MessageCircle className="w-6 h-6 text-blue-400" />,
  linkedin: <Linkedin className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
  twitter: <Twitter className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
  youtube: <Youtube className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-20" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4">
        {/* Contact and Social Section */}
        <div id="connect" className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Ready to explore partnerships, share insights, or discuss the future of technology?
            Let's start a conversation.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              {iconMap.mail}
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Email</h3>
            <p className="text-slate-300 mb-4">Get in touch for collaborations and inquiries</p>
            <a
              href="mailto:ravikant.agrawal@gmail.com"
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
              aria-label="Send Message for Email"
            >
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              {iconMap.calendar}
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Schedule Call</h3>
            <p className="text-slate-300 mb-4">Book a 30-minute video call to discuss opportunities</p>
            <a
              href="https://calendly.com/ravidilse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
              aria-label="Book Meeting for Schedule Call"
            >
              Book Meeting
              <Calendar className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              {iconMap.message}
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Telegram</h3>
            <p className="text-slate-300 mb-4">Connect with me directly on Telegram for quick conversations</p>
            <a
              href="https://t.me/ravidilse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
              aria-label="Message on Telegram"
            >
              Message Me
              <MessageCircle className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-2xl font-medium text-white mb-8">Follow the Journey</h3>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/ravikantagrawal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="LinkedIn Profile"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {iconMap.linkedin}
              </div>
            </a>

            <a
              href="https://x.com/ravikantagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Twitter Profile"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {iconMap.twitter}
              </div>
            </a>

            <a
              href="https://youtube.com/playlist?list=PL0_fxxZ-lFiTl8tXrMhDtUx4jgBq-t0i3"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="YouTube Channel"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {iconMap.youtube}
              </div>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Ravi Agrawal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
