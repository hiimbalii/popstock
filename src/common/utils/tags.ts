import {Tag} from '../types/filters';
import {TrackResponse, mapTrackResponse} from '../types/track';

export const getConstantTags = (): Tag[] => [
  {
    id: '_saved',
    displayName: 'Your songs',
    url: 'https://api.spotify.com/v1/me/tracks',
    mapper: (res: unknown) => {
      const data = res as {
        limit: number;
        offset: number;
        items: {track: TrackResponse}[];
      };
      return {
        items: data.items.map(i => i.track).map(mapTrackResponse),
        pageNumber: data.offset / data.limit,
      };
    },
  },
  {
    id: '_recent',
    displayName: 'Recently listened to',
    url: 'https://api.spotify.com/v1/me/player/recently-played',
    mapper: (res: unknown) => {
      const data = res as {
        next: string;
        items: {track: TrackResponse}[];
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, nextPage] = data.next.split('before=');

      return {
        items: data.items.map(i => i.track).map(mapTrackResponse),
        pageNumber: parseInt(nextPage),
      };
    },
  },
  {
    id: '_top',
    displayName: 'Your faves',
    url: 'https://api.spotify.com/v1/me/top/tracks',
    mapper: (res: unknown) => {
      const data = res as {
        limit: number;
        offset: number;
        items: TrackResponse[];
      };
      return {
        items: data.items.map(mapTrackResponse),
        pageNumber: data.offset / data.limit,
      };
    },
  },
  {
    id: 'year:2000-2010',
    displayName: '2000s',
    category: 'year',
  },
  {
    id: 'year:1990-2000',
    displayName: '90s',
    category: 'year',
  },
  {
    id: 'year:2024',
    displayName: 'Newest tracks',
    category: 'year',
  },
  // // in case i get rate limited again
  // {
  //   id: 'genre:alt-rock',
  //   displayName: 'Alt Rock',
  //   category: 'genre',
  // },
];
