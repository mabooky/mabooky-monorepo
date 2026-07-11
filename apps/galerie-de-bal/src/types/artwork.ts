export type ArtworkMetadata = {
    width: number;
    height: number;
    fileSize: string;
};

export type ArtworkArtist = {
    name: string;
    birthYear: number;
};

export type CanvasFormat = 'portrait' | 'paysage' | 'carre' | 'marine';

export type Artwork = {
    id: string;
    title: string;
    titleEng: string;
    artist: ArtworkArtist;
    creationYear: number;
    medium: string;
    metadata: ArtworkMetadata;
    format: CanvasFormat;
    docent: string;
    docentAudioUrl: string | null;
    imageUrl: string;
};