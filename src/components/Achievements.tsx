import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Lightbulb, Video, Users, GraduationCap, Rocket } from 'lucide-react';

const milestones = [
    {
        icon: Brain,
        title: "AI Research & Implementation",
        description: "I'm currently leading multiple AI transformation projects, where I get to develop practical applications of machine learning in real business contexts. It's exciting to see AI making a real impact!",
        year: "2024"
    },
    {
        icon: Lightbulb,
        title: "Web3 Thought Leadership",
        description: "Last year, I dove deep into blockchain adoption and DeFi protocols, sharing my insights on the future of the decentralized web. It's been amazing to contribute to this evolving space.",
        year: "2023"
    },
    {
        icon: Video,
        title: "Technical Content Creator",
        description: "I started creating video series on AI and Web3, and I'm thrilled to have reached thousands of tech enthusiasts and professionals. It's been incredible connecting with so many like-minded individuals!",
        year: "2023"
    },
    {
        icon: Users,
        title: "Community Building",
        description: "One of my proudest achievements has been building engaged communities around emerging technologies. I love facilitating discussions on AI ethics and Web3 governance with passionate individuals.",
        year: "2022"
    },
    {
        icon: GraduationCap,
        title: "Innovation in EdTech",
        description: "I developed learning frameworks to make complex AI and blockchain concepts more accessible. Seeing people grasp these technologies has been incredibly rewarding.",
        year: "2022"
    },
    {
        icon: Rocket,
        title: "Digital Transformation Leader",
        description: "I guided organizations through their digital transformation journey, incorporating AI and blockchain technologies. It's been fulfilling to help companies embrace the future of tech.",
        year: "2021"
    }
];

const Milestones = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-light text-slate-800 mb-4">
                        My Milestones
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Here's my journey through the exciting world of AI and Web3. Each milestone represents a step in my mission to make technology more accessible and impactful.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {milestones.map((milestone, index) => {
                        const Icon = milestone.icon;
                        return (
                            <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-medium text-slate-800">
                                                {milestone.title}
                                            </h3>
                                            <span className="text-sm text-blue-600 font-medium">
                                                {milestone.year}
                                            </span>
                                        </div>
                                        <p className="text-slate-600">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Milestones; 