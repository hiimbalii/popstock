import {Tag} from '../types/filters';

export const getConstantTags = (): Tag[] => [
  {
    id: '_saved',
    displayName: 'Your songs',
    url: 'https://api.spotify.com/v1/me/tracks',
  },
  {
    id: '_recent',
    displayName: 'Recently listened to',
    url: 'https://api.spotify.com/v1/me/player/recently-played',
  },
  {
    id: '_top',
    displayName: 'Your faves',
    url: 'https://api.spotify.com/v1/me/top/tracks',
  },
  // {
  //   id: 'tag:hipster',
  //   displayName: 'Niche',
  // },
  // {
  //   id: 'tag:new',
  //   displayName: 'Newest tracks',
  // },
];
