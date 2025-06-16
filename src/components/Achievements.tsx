import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { getAchievements } from '@/utils/contentful';
import { IAchievement } from '@/types/contentful';

const Milestones = () => {
    const [achievements, setAchievements] = useState<IAchievement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const data = await getAchievements();
                setAchievements(data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <p className="text-slate-600">Loading achievements...</p>
                    </div>
                </div>
            </section>
        );
    }

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
                    {achievements.map((achievement) => (
                        <Card key={achievement.sys.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-2xl">
                                    {achievement.fields.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-medium text-slate-800">
                                            {achievement.fields.title}
                                        </h3>
                                        <span className="text-sm text-blue-600 font-medium">
                                            {achievement.fields.year}
                                        </span>
                                    </div>
                                    <p className="text-slate-600">
                                        {achievement.fields.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones; 