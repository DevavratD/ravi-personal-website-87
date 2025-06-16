import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, BookOpen, ExternalLink, ChevronLeft, ChevronRight, Linkedin, Twitter, X } from 'lucide-react';
import { getMediaItems } from '@/utils/contentful';
import { IMediaItem } from '@/types/contentful';
import { getThumbnailUrl, getEmbedUrl, extractVideoId } from '@/utils/youtube';

const ITEMS_PER_PAGE = 6;

// LinkedIn Embed Component
const LinkedInEmbed = ({ url }: { url: string }) => {
  // Extract the URL from the iframe src if it's a full iframe code
  const embedUrl = url.includes('src="')
    ? url.match(/src="([^"]+)"/)?.[1]
    : url;

  return (
    <div className="flex justify-center w-full h-[200px]">
      <iframe
        src={embedUrl}
        height="609"
        width="504"
        frameBorder="0"
        allowFullScreen
        title="Embedded post"
        className="rounded-lg"
        style={{ maxWidth: '100%', height: '200px' }}
      />
    </div>
  );
};

// Add Twitter window type
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element: HTMLElement) => void;
      };
    };
  }
}

// X (Twitter) Embed Component
const XEmbed = ({ url }: { url: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any existing Twitter script
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and append new script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [url]);

  if (!url) {
    return (
      <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No X post URL provided</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div ref={containerRef} className="max-w-[550px] w-full">
        <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
          <a href={url}></a>
        </blockquote>
      </div>
    </div>
  );
};

// Add LinkedIn script to window
declare global {
  interface Window {
    IN: any;
  }
}

const MediaGallery = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mediaItems, setMediaItems] = useState<IMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const items = await getMediaItems();
        setMediaItems(items);
      } catch (error) {
        console.error('Error fetching media items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaItems();
  }, []);

  useEffect(() => {
    // Add LinkedIn script
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/in.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const filteredItems = mediaItems.filter(item =>
    filter === 'all' || item.fields.type === filter
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

  const getIcon = (type: string) => {
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

  const renderEmbed = (item: IMediaItem) => {
    switch (item.fields.type) {
      case 'youtube':
        const videoId = item.fields.videoId || extractVideoId(item.fields.url);
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
              title={item.fields.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300" />
          </div>
        );
      case 'linkedin':
        return <LinkedInEmbed url={item.fields.embedUrl || item.fields.url} />;
      case 'twitter':
        return <XEmbed url={item.fields.url} />;
      case 'document':
        return (
          <iframe
            src={item.fields.embedUrl}
            width="100%"
            height="200"
            frameBorder="0"
            className="rounded-lg"
          />
        );
      default:
        return (
          <img
            src={item.fields.thumbnail?.fields?.file?.url}
            alt={item.fields.title}
            className="w-full h-full object-cover rounded-lg"
          />
        );
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-slate-600">Loading media items...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {currentItems.map((item) => {
            const IconComponent = getIcon(item.fields.type);
            return (
              <Card key={item.sys.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                        {item.fields.title}
                      </h3>
                    </div>
                    <a
                      href={item.fields.url}
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
            <div className="bg-gray-100 rounded-xl w-full max-w-4xl relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-4 -right-4 bg-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                  {selectedVideo.fields.title}
                </h3>
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(selectedVideo.videoId)}
                    title={selectedVideo.fields.title}
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
