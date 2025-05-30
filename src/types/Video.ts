export interface Video {
    id: number;
    giffUrl: string;
    word: {
        id: number;
        word: string;
        letter: {
            id: number;
            letter: string;
        }
    }
}