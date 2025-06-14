import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, BookOpen, ExternalLink, ChevronLeft, ChevronRight, Linkedin, Twitter, X } from 'lucide-react';
import { mediaItems } from '@/data/mediaItems';
import { getThumbnailUrl, getEmbedUrl, extractVideoId } from '@/utils/youtube';

const ITEMS_PER_PAGE = 6;

const MediaGallery = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
      case 'youtube': return Video;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'document': return FileText;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  const getSectionTitle = () => {
    switch (filter) {
      case 'youtube': return 'My Web3 & AI Talks';
      case 'linkedin': return 'My Industry Insights';
      case 'twitter': return 'My Tech Thoughts';
      case 'article': return 'My Publications';
      case 'document': return 'My Research';
      default: return 'My Content';
    }
  };

  const renderEmbed = (item) => {
    switch (item.type) {
      case 'youtube':
        const videoId = item.videoId || extractVideoId(item.url);
        if (!videoId) {
          return (
            <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Invalid YouTube URL</p>
            </div>
          );
        }
        return (
          <div className="relative cursor-pointer" onClick={() => setSelectedVideo({ ...item, videoId })}>
            <iframe
              width="100%"
              height="200"
              src={getEmbedUrl(videoId)}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300" />
          </div>
        );
      case 'linkedin':
        return (
          <div className="linkedin-embed">
            <script src="https://platform.linkedin.com/in.js" type="text/javascript">
              {`api_key: YOUR_API_KEY
                authorize: true`}
            </script>
            <script type="IN/Share" data-url={item.url}></script>
          </div>
        );
      case 'twitter':
        return (
          <div className="twitter-embed">
            <blockquote className="twitter-tweet">
              <a href={item.url}></a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js"></script>
          </div>
        );
      case 'document':
        return (
          <iframe
            src={item.embedUrl}
            width="100%"
            height="200"
            frameBorder="0"
            className="rounded-lg"
          />
        );
      default:
        return (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
          />
        );
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
            Exploring the intersection of AI and Web3, from decentralized identity to agentic economies.
            Join me in shaping the future of technology!
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'all', label: 'All Content' },
              { key: 'youtube', label: 'Talks' },
              { key: 'linkedin', label: 'Insights' },
              { key: 'twitter', label: 'Thoughts' },
              { key: 'article', label: 'Publications' },
              { key: 'document', label: 'Research' }
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item, index) => {
            const IconComponent = getIcon(item.type);
            return (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden h-[200px]">
                  {renderEmbed(item)}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                    <IconComponent className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-slate-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="p-4">
                <h3 className="text-xl font-medium text-slate-800 mb-4">
                  {selectedVideo.title}
                </h3>
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(selectedVideo.videoId)}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
