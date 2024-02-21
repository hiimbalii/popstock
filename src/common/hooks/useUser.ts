import {selectAuthToken, selectName} from '../selectors/selectors';
import {AppAction, loadData} from '../../core/actions/appActions';
import {PopstockState} from '../../core/store/store';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

export const useUser = () => {
  const authToken = useSelector(selectAuthToken);
  const name = useSelector(selectName);
  const dispatch =
    useDispatch<ThunkDispatch<PopstockState, unknown, AppAction>>();
  useEffect(() => {
    if (!name) dispatch(loadData());
  }, [authToken, name]);
  return {name};
};
