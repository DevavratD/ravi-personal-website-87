import client from '@/lib/contentful';
import { IContentfulResponse, IContentfulEntry, IHeroContent, IAboutContent, IJourneyPoint, IAchievement, IMediaItem } from '@/types/contentful';

export const getHeroContent = async () => {
    try {
        const response = await client.getEntries({
            content_type: 'hero',
            limit: 1
        });
        return response.items[0];
    } catch (error) {
        console.error('Error fetching hero content:', error);
        return null;
    }
};

export const getAboutContent = async () => {
    try {
        const response = await client.getEntries({
            content_type: 'about',
            limit: 1,
            include: 2 // This will include linked assets
        });
        return response.items[0];
    } catch (error) {
        console.error('Error fetching about content:', error);
        return null;
    }
};

export const getJourneyPoints = async (): Promise<IJourneyPoint[]> => {
    try {
        const response = await client.getEntries({
            content_type: 'journeyPoint',
            order: 'fields.order',
            include: 2,
        });

        return response.items as unknown as IJourneyPoint[];
    } catch (error) {
        console.error('Error fetching journey points:', error);
        return [];
    }
};

export const getAchievements = async (): Promise<IAchievement[]> => {
    try {
        const response = await client.getEntries({
            content_type: 'achievements',
            order: 'fields.order',
            limit: 50
        });

        return response.items as unknown as IAchievement[];
    } catch (error) {
        console.error('Error fetching achievements:', error);
        return [];
    }
};

export const getMediaItems = async (): Promise<IMediaItem[]> => {
    try {
        const response = await client.getEntries({
            content_type: 'mediaItem',
            order: 'fields.order',
            limit: 50,
            include: 2 // Include linked assets
        });
        return response.items as unknown as IMediaItem[];
    } catch (error) {
        console.error('Error fetching media items:', error);
        return [];
    }
};

export const getFooterContent = async () => {
    try {
        const response = await client.getEntries({
            content_type: 'footer',
            limit: 1
        });
        return response.items[0];
    } catch (error) {
        console.error('Error fetching footer content:', error);
        return null;
    }
}; 