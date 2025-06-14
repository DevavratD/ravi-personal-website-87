import { getYouTubeVideoDetails } from '../utils/youtube';
import fs from 'fs';
import path from 'path';

async function updateMediaItems() {
    try {
        // Read existing media items
        const mediaItemsPath = path.join(process.cwd(), 'src/data/mediaItems.ts');
        const content = fs.readFileSync(mediaItemsPath, 'utf-8');

        // Extract YouTube video IDs
        const videoIdRegex = /videoId:\s*'([^']+)'/g;
        const videoIds = [...content.matchAll(videoIdRegex)].map(match => match[1]);

        // Fetch details for each video
        const updatedItems = await Promise.all(
            videoIds.map(async (videoId) => {
                const details = await getYouTubeVideoDetails(videoId);
                return {
                    type: 'youtube',
                    platform: 'youtube',
                    ...details,
                    category: 'System Design' // You might want to extract this from the video tags or description
                };
            })
        );

        // Update the mediaItems.ts file
        const newContent = `export const mediaItems = ${JSON.stringify(updatedItems, null, 2)};`;
        fs.writeFileSync(mediaItemsPath, newContent);

        console.log('Media items updated successfully!');
    } catch (error) {
        console.error('Error updating media items:', error);
    }
}

updateMediaItems(); 