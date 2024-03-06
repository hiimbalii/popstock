import {Tag} from '../types/filters';
import {TrackResponse, mapTrackResponse} from '../types/track';

export const getConstantTags = (): Tag[] => [
  {
    id: '_saved',
    displayName: 'Your songs',
    url: 'https://api.spotify.com/v1/me/tracks',
    mapper: (data: unknown) =>
      (data as {items: {track: TrackResponse}[]}).items
        .map(i => i.track)
        .map(mapTrackResponse),
  },
  {
    id: '_recent',
    displayName: 'Recently listened to',
    url: 'https://api.spotify.com/v1/me/player/recently-played',
    mapper: (data: unknown) =>
      (data as {items: {track: TrackResponse}[]}).items
        .map(i => i.track)
        .map(mapTrackResponse),
  },
  {
    id: '_top',
    displayName: 'Your faves',
    url: 'https://api.spotify.com/v1/me/top/tracks',
    mapper: (data: unknown) =>
      (data as {items: TrackResponse[]}).items.map(mapTrackResponse),
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
];
