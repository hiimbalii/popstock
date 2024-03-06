import './App.css';
import Portfolio from './components/blocks/portfolio';
import Marketplace from './components/blocks/markteplace';
import {store} from './core/store/store';
import Wallet from './components/blocks/wallet';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className='bg-gray-600 w-full h-screen flex px-20'>
        <div className='w-4/12 m-4 flex flex-col gap-2'>
          <Portfolio />
          <Wallet />
        </div>
        <div className='w-8/12 m-4 h-full'>
          <Marketplace />
        </div>
      </div>
    </Provider>
  );
}

export default App;
