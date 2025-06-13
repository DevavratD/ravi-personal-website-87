import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const mediaItems = [
  {
    type: 'video',
    title: 'AI in Practice: Real-World Applications',
    description: 'Deep dive into practical AI implementations and their business impact',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    url: 'https://youtube.com/playlist?list=PL0_fxxZ-lFiTl8tXrMhDtUx4jgBq-t0i3'
  },
  {
    type: 'video',
    title: 'Web3 Fundamentals Explained',
    description: 'Comprehensive guide to understanding blockchain and decentralized technologies',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    url: 'https://youtube.com/playlist?list=PL0_fxxZ-lFiTl8tXrMhDtUx4jgBq-t0i3'
  },
  {
    type: 'video',
    title: 'The Future of Decentralized Finance',
    description: 'Analysis of DeFi protocols and their potential to reshape finance',
    thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
    url: 'https://youtube.com/playlist?list=PL0_fxxZ-lFiTl8tXrMhDtUx4jgBq-t0i3'
  },
  {
    type: 'whitepaper',
    title: 'AI Ethics in Enterprise Applications',
    description: 'Comprehensive framework for implementing ethical AI practices in business environments',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    url: '#'
  },
  {
    type: 'whitepaper',
    title: 'Web3 Governance Models: A Comparative Study',
    description: 'Analysis of different governance approaches in decentralized autonomous organizations',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    url: '#'
  },
  {
    type: 'article',
    title: 'Machine Learning for Business Leaders',
    description: 'Practical guide to understanding and implementing ML solutions in enterprise settings',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop',
    url: '#'
  },
  {
    type: 'article',
    title: 'The Intersection of AI and Blockchain',
    description: 'Exploring synergies between artificial intelligence and distributed ledger technologies',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
    url: '#'
  },
  {
    type: 'article',
    title: 'Smart Contracts: Beyond Cryptocurrency',
    description: 'Real-world applications of smart contracts in various industries and use cases',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    url: '#'
  }
];

const ITEMS_PER_PAGE = 6;

const MediaGallery = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = mediaItems.filter(item =>
    filter === 'all' || item.type === filter
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const getIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'whitepaper': return FileText;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  const getSectionTitle = () => {
    switch (filter) {
      case 'video': return 'YouTube Content';
      case 'whitepaper': return 'Thought Leadership';
      case 'article': return 'Tech Learning Articles';
      default: return 'My Thoughts';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            {getSectionTitle()}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Explore my latest insights on AI, Web3, and emerging technologies through videos, research papers, and in-depth articles.
          </p>

          <div className="flex justify-center space-x-2">
            {[
              { key: 'all', label: 'All Content' },
              { key: 'video', label: 'YouTube Videos' },
              { key: 'whitepaper', label: 'Whitepapers' },
              { key: 'article', label: 'Articles' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                onClick={() => setFilter(key)}
                className={`rounded-full ${filter === key
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 h-[800px]">
          {currentItems.map((item, index) => {
            const IconComponent = getIcon(item.type);
            return (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[360px] flex flex-col">
                <div className="relative overflow-hidden h-[180px]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                    <IconComponent className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-slate-800 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors inline-flex items-center"
                    >
                      View {item.type === 'video' ? 'Video' : item.type === 'whitepaper' ? 'Paper' : 'Article'}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {/* Add placeholder cards to maintain grid height */}
          {Array.from({ length: ITEMS_PER_PAGE - currentItems.length }).map((_, index) => (
            <div key={`placeholder-${index}`} className="h-[360px]" />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full px-3 py-1.5 text-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-full w-7 h-7 p-0 text-sm ${currentPage === page
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full px-3 py-1.5 text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;
