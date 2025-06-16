import React, { useEffect, useState } from 'react';
import { getAboutContent } from '@/utils/contentful';
import { IAboutContent } from '@/types/contentful';

const About = () => {
  const [aboutContent, setAboutContent] = useState<IAboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const content = await getAboutContent();
        if (content) {
          setAboutContent(content.fields as IAboutContent);
        }
      } catch (err) {
        console.error('Error fetching about content:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutContent();
  }, []);

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-slate-600">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-light text-slate-800">
              {aboutContent?.title || "Get to Know Me"}
            </h2>
            <div
              className="space-y-4 text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: aboutContent?.content || `
                  <p>
                    I'm Ravi, a Growth Strategy Leader at Privado ID, where I focus on driving innovation
                    in AI-driven digital identity solutions. My passion lies at the intersection of AI and
                    Web3 technologies, where I explore how these transformative fields can reshape our
                    digital landscape.
                  </p>
                  <p>
                    My professional journey has been marked by significant milestones - from co-founding
                    blockchain startups to leading strategic initiatives at Polygon Labs. I've had the
                    privilege of collaborating with industry leaders including AWS, GCP, and Salesforce,
                    working together to advance the frontiers of decentralized technology.
                  </p>
                  <p>
                    Beyond my role in technology leadership, I'm committed to knowledge sharing through
                    thought leadership. I regularly contribute through whitepapers, video content, and
                    strategic insights, always aiming to make complex technological concepts accessible
                    and actionable for professionals at all levels.
                  </p>
                  <p>
                    I'm always interested in connecting with fellow professionals who share a vision for
                    the future of technology. Whether you're looking to collaborate, learn, or simply
                    exchange ideas about the evolving landscape of AI and Web3, I'd welcome the opportunity
                    to connect.
                  </p>
                `
              }}
            />
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-3xl p-8 transform rotate-2 transition-transform hover:rotate-0 duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img
                  src={aboutContent?.profileImage?.fields?.file?.url || "3m2VcJAh_400x400.jpg"}
                  alt="Ravikant Agrawal"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
