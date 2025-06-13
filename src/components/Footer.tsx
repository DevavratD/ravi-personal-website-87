import React from 'react';
import { Mail, Calendar, Send, Linkedin, Twitter, Youtube, MessageCircle } from 'lucide-react';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: {
    href: string;
    text: string;
    icon: React.ReactNode;
  };
}

const socialLinks: SocialLink[] = [
  {
    href: "https://linkedin.com/in/ravikantagrawal",
    icon: <Linkedin className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
    label: "LinkedIn Profile"
  },
  {
    href: "https://twitter.com/ravikantagrawal",
    icon: <Twitter className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
    label: "Twitter Profile"
  },
  {
    href: "https://youtube.com/playlist?list=PL0_fxxZ-lFiTl8tXrMhDtUx4jgBq-t0i3",
    icon: <Youtube className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
    label: "YouTube Channel"
  },
  {
    href: "#",
    icon: <MessageCircle className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />,
    label: "Telegram Channel"
  }
];

const contactCards: ContactCard[] = [
  {
    icon: <Mail className="w-6 h-6 text-blue-400" />,
    title: "Email",
    description: "Get in touch for collaborations and inquiries",
    link: {
      href: "mailto:contact@example.com",
      text: "Send Message",
      icon: <Send className="w-4 h-4 ml-2" />
    }
  },
  {
    icon: <Calendar className="w-6 h-6 text-blue-400" />,
    title: "Schedule Call",
    description: "Book a 30-minute video call to discuss opportunities",
    link: {
      href: "#",
      text: "Book Meeting",
      icon: <Calendar className="w-4 h-4 ml-2" />
    }
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
    title: "Telegram",
    description: "Join our community for real-time updates and discussions",
    link: {
      href: "#",
      text: "Join Channel",
      icon: <MessageCircle className="w-4 h-4 ml-2" />
    }
  }
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-20" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4">
        {/* Contact and Social Section */}
        <div className="text-center mb-16">
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
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{card.title}</h3>
              <p className="text-slate-300 mb-4">{card.description}</p>
              <a
                href={card.link.href}
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
                aria-label={`${card.link.text} for ${card.title}`}
              >
                {card.link.text}
                {card.link.icon}
              </a>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-2xl font-medium text-white mb-8">Follow the Journey</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={link.label}
              >
                <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {link.icon}
                </div>
              </a>
            ))}
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
