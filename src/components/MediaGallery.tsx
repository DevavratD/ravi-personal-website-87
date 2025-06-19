import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, BookOpen, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
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

const MediaGallery = () => {
  const [items, setItems] = useState<IMediaItem[]>([]);
  const [filter, setFilter] = useState<string>('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getMediaItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching media items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'featured') return item.fields.isFeatured;
    return item.fields.type === filter;
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getSectionTitle = () => {
    switch (filter) {
      case 'talks': return 'My Talks & Presentations';
      case 'articles': return 'My Articles & Blog Posts';
      case 'thought-leadership': return 'Thought Leadership';
      case 'still-building': return 'Still Building and Winning';
      case 'featured': return 'Featured Content';
      default: return 'My Content';
    }
  };

  const renderEmbed = (item: IMediaItem) => {
    switch (item.fields.type) {
      case 'talks':
        const videoId = item.fields.videoId || (item.fields.url ? extractVideoId(item.fields.url) : null);
        if (!videoId) {
          return (
            <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Invalid Video URL</p>
            </div>
          );
        }
        return (
          <div className="relative cursor-pointer" onClick={() => setSelectedVideo({ videoId, title: item.fields.title })}>
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
      case 'articles':
      case 'thought-leadership':
        // Handle LinkedIn content
        if (item.fields.url?.includes('linkedin.com')) {
          return <LinkedInEmbed url={item.fields.embedUrl || item.fields.url} />;
        }
        // Handle Twitter content
        if (item.fields.url?.includes('twitter.com') || item.fields.url?.includes('x.com')) {
          return <XEmbed url={item.fields.url} />;
        }
        // Handle embedded content (like documents or articles)
        if (item.fields.embedUrl) {
          return (
            <iframe
              src={item.fields.embedUrl}
              width="100%"
              height="200"
              frameBorder="0"
              className="rounded-lg"
            />
          );
        }
        // Fallback to thumbnail image
        return (
          <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={item.fields.thumbnail?.fields?.file?.url}
              alt={item.fields.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      default:
        return (
          <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={item.fields.thumbnail?.fields?.file?.url}
              alt={item.fields.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-slate-600">Loading content...</p>
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
              { key: 'featured', label: 'Featured' },
              { key: 'all', label: 'All Content' },
              { key: 'talks', label: 'Talks' },
              { key: 'articles', label: 'Articles' },
              { key: 'thought-leadership', label: 'Thought Leadership' },
              { key: 'still-building', label: 'Still Building and Winning' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                onClick={() => {
                  setFilter(key);
                  setCurrentPage(1);
                }}
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
          {currentItems.map((item) => (
            <Card key={item.sys.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden h-[200px]">
                {renderEmbed(item)}
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-slate-800 mb-2 line-clamp-2">
                      {item.fields.title}
                    </h3>
                    {item.fields.description && (
                      <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                        {item.fields.description}
                      </p>
                    )}
                    {item.fields.date && (
                      <p className="text-xs text-slate-500">
                        {new Date(item.fields.date).toLocaleDateString()}
                      </p>
                    )}
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
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-xl font-medium text-slate-800 pr-4">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-slate-500 hover:text-slate-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getEmbedUrl(selectedVideo.videoId)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;
