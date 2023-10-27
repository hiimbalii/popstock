import Tile, {TileTitle} from '../../common/components/tile';
import {selectWallet} from '../../common/selectors/selectors';
import {useSelector} from 'react-redux';

export default function Wallet() {
  const wallet = useSelector(selectWallet);
  return (
    <Tile className='flex flex-col justify-between h-32'>
      <div>
        <TileTitle>Wallet</TileTitle>
        <span className='text-4xl'>{wallet.toString()}</span>
      </div>
      {/* <span>Not logged in</span> */}
    </Tile>
  );
}
