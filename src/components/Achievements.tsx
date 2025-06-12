
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Book, Star } from 'lucide-react';

const achievements = [
  {
    icon: Award,
    title: "Leadership Recognition",
    description: "Led a team of 12 people through a challenging project that changed how we work together.",
    date: "2024"
  },
  {
    icon: Book,
    title: "Completed Marathon",
    description: "Ran my first marathon after 8 months of training. Learned more about persistence than I ever imagined.",
    date: "2023"
  },
  {
    icon: Star,
    title: "Community Impact",
    description: "Started a local initiative that helped 50+ families during difficult times. Small actions, big hearts.",
    date: "2023"
  },
  {
    icon: Book,
    title: "Published Article",
    description: "Wrote about finding balance in a fast-paced world. It resonated with more people than I expected.",
    date: "2022"
  }
];

const Achievements = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Things I'm proud of
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Every milestone tells a story. Here are some moments that shaped who I am today.
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
