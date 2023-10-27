import {
  selectLoadingState,
  selectSearchTerm,
  selectTracks,
} from '../../common/selectors/selectors';
import {TracksAction, fetchTracks} from '../actions/tracksActions';
import {AppState} from '../store/store';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

const getTracks = (
  auth_token: string,
  searchString: string | null,
): Promise<RecommendationsResponse> => {
  if (!searchString)
    return fetch(
      'https://api.spotify.com/v1/recommendations?seed_genres=alternative',
      {headers: {Authorization: `Bearer ${auth_token}`}},
    ).then(res => res.json() as unknown as RecommendationsResponse);

  throw new Error('search not yet implemented');
};
