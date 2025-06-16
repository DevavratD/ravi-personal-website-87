export interface IContentfulImage {
    fields: {
        file: {
            url: string;
        };
    };
}

export interface IHeroContent {
    title: string;
    subtitle: string;
    backgroundImage?: IContentfulImage;
    buttonText: string;
    buttonLink: string;
}

export interface IContentfulEntry {
    sys: {
        id: string;
    };
    fields: {
        title?: string;
        subtitle?: string;
        description?: string;
        content?: string;
        image?: IContentfulImage;
        backgroundImage?: IContentfulImage;
        ctaButtonText?: string;
        ctaButtonLink?: string;
    };
}

export interface IContentfulResponse {
    items: IContentfulEntry[];
    total: number;
    skip: number;
    limit: number;
}

export interface IAchievement {
    fields: {
        title: string;
        description: string;
        year: string;
        icon: string;
        order: number;
    };
    sys: {
        id: string;
    };
}

export interface IAchievementsContent {
    title: string;
    achievements: IAchievement[];
}

export interface IMediaItem {
    fields: {
        title: string;
        type: 'youtube' | 'linkedin' | 'twitter' | 'document' | 'article';
        url: string;
        embedUrl?: string;
        videoId?: string;
        thumbnail?: IContentfulImage;
        order: number;
    };
    sys: {
        id: string;
    };
}

export interface IFooterContent {
    title: string;
    subtitle: string;
    contactCards: {
        title: string;
        description: string;
        linkText: string;
        linkUrl: string;
        icon: string;
    }[];
    socialLinks: {
        platform: string;
        url: string;
        icon: string;
    }[];
    copyrightText: string;
} 