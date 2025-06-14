/**
 * Extracts video ID from various YouTube URL formats
 */
export function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/, // Standard and shortened URLs
        /youtube\.com\/embed\/([^&\n?#]+)/, // Embed URLs
        /youtube\.com\/v\/([^&\n?#]+)/, // Old format URLs
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

/**
 * Gets YouTube thumbnail URL for a video ID
 * Quality options: maxresdefault, hqdefault, mqdefault, default
 */
export function getThumbnailUrl(videoId: string, quality: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'default' = 'maxresdefault'): string {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Gets YouTube embed URL for a video ID
 */
export function getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Gets YouTube watch URL for a video ID
 */
export function getWatchUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

// Example usage:
// const videoId = extractVideoId('https://www.youtube.com/watch?v=4OkySZO-G2Q');
// const thumbnail = getThumbnailUrl(videoId);
// const embedUrl = getEmbedUrl(videoId); 