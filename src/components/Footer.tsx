import React from 'react';
import { Mail, Calendar, Send, Linkedin, Youtube, MessageCircle } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  mail: <Mail className="w-6 h-6 text-blue-400" />,
  calendar: <Calendar className="w-6 h-6 text-blue-400" />,
  message: <MessageCircle className="w-6 h-6 text-blue-400" />,
  linkedin: <Linkedin className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
  twitter: (
    <svg
      className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <path
        d="M17.53 2H21.5L14.36 10.39L22.75 22H15.92L10.89 15.3L5.18 22H1.19L8.75 13.08L0.75 2H7.74L12.3 8.13L17.53 2ZM16.32 20H18.34L7.06 3.97H4.92L16.32 20Z"
        fill="currentColor"
      />
    </svg>
  ),
  youtube: <Youtube className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
  linktree: (
    <svg
      className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <path d="m13.73635 5.85251 4.00467 -4.11665 2.3248 2.3808 -4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766 -2.3248 2.3338L12.0005 12.099l-5.74052 5.76852 -2.3248 -2.3248 4.22864 -4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248 -2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z"
        fill="currentColor"
      />
    </svg>
  )
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
              href="mailto:ravidilse@gmail.com"
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

            <a
              href="https://linktr.ee/ravikantagrawal"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Linktree Profile"
            >
              <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {iconMap.linktree}
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
