
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Book, Star, Cpu, Globe, Users } from 'lucide-react';

const achievements = [
  {
    icon: Cpu,
    title: "AI Research & Implementation",
    description: "Leading multiple AI transformation projects, developing practical applications of machine learning in business contexts.",
    date: "2024"
  },
  {
    icon: Globe,
    title: "Web3 Thought Leadership",
    description: "Published comprehensive analysis on blockchain adoption, DeFi protocols, and the future of decentralized web.",
    date: "2023"
  },
  {
    icon: Book,
    title: "Technical Content Creator",
    description: "Created extensive video series on AI and Web3, reaching thousands of technology enthusiasts and professionals.",
    date: "2023"
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Built engaged communities around emerging technologies, fostering discussions on AI ethics and Web3 governance.",
    date: "2022"
  },
  {
    icon: Star,
    title: "Innovation in EdTech",
    description: "Developed learning frameworks that make complex AI and blockchain concepts accessible to broader audiences.",
    date: "2022"
  },
  {
    icon: Award,
    title: "Digital Transformation Leader",
    description: "Successfully guided organizations through digital transformation initiatives incorporating AI and blockchain technologies.",
    date: "2021"
  }
];

const Achievements = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Key milestones & achievements
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Highlights from my journey in AI, Web3, and technology leadership over the past 5 years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <achievement.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-slate-800">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {achievement.date}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
