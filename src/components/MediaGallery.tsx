
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Image, Link } from 'lucide-react';

const mediaItems = [
  {
    type: 'video',
    title: 'My Journey So Far',
    description: 'A short video about lessons learned in the past year',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    url: '#'
  },
  {
    type: 'image',
    title: 'Team Building Retreat',
    description: 'Amazing weekend with the people who make work feel like play',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    url: '#'
  },
  {
    type: 'link',
    title: 'Article: Finding Balance',
    description: 'My thoughts on work-life harmony in a digital world',
    thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    url: '#'
  }
];

const MediaGallery = () => {
  const [filter, setFilter] = useState('all');

  const filteredItems = mediaItems.filter(item => 
    filter === 'all' || item.type === filter
  );

  const getIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Image;
      case 'link': return Link;
      default: return Image;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Stories in different forms
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Sometimes a picture says it all, sometimes it's a video, and sometimes it's just a good conversation starter.
          </p>
          
          <div className="flex justify-center space-x-2">
            {['all', 'video', 'image', 'link'].map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                onClick={() => setFilter(type)}
                className={`capitalize rounded-full ${
                  filter === type 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {type === 'all' ? 'All' : type}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const IconComponent = getIcon(item.type);
            return (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <IconComponent className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
