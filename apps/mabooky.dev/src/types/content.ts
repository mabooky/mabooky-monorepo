export type Content = {
    type: 'work' | 'writing';
    id: string;
    title: string;
    description: string;
    tags: string[];
    date: string;
    image?: string;
};
