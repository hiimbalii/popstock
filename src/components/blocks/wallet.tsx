import {useUser} from '../../common/hooks/useUser';
import {selectAuthToken, selectWallet} from '../../common/selectors/selectors';
import {startAuth} from '../../common/utils/auth';
import Button from '../partials/button';
import Tile, {TileTitle} from '../partials/tile';
import {useSelector} from 'react-redux';

export default function Wallet() {
  const wallet = useSelector(selectWallet);
  const auth_token = useSelector(selectAuthToken);
  const {name} = useUser();
  return (
    <Tile className='flex flex-col justify-between h-32'>
      <div>
        <TileTitle>Wallet</TileTitle>
        <span className='text-4xl'>{wallet.toString()}</span>
      </div>
      {/* <span>Not logged in</span> */}
      {auth_token ? (
        <>
          <span>Logged in as {name}</span>
        </>
      ) : (
        <Button color='primary' onClick={() => startAuth()}>
          Log in with Spotify
        </Button>
      )}
    </Tile>
  );
}
