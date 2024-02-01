import './App.css';
import Portfolio from './components/blocks/portfolio';
import Marketplace from './components/blocks/markteplace';
import {store} from './core/store/store';
import Wallet from './components/blocks/wallet';
import {AppAction, tryParseTokenFromUrl} from './core/actions/appActions';
import {AppState} from './core/store/appReducer';
import {Provider, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, AppAction>>();
  dispatch(tryParseTokenFromUrl());
  return (
    <Provider store={store}>
      <div className='bg-gray-600 w-full h-screen flex px-20'>
        <div className='w-96 m-4 flex flex-col gap-2'>
          <Portfolio />
          <Wallet />
        </div>
        <div className='flex-grow m-4 h-full'>
          <Marketplace />
        </div>
      </div>
    </Provider>
  );
}

export default App;
