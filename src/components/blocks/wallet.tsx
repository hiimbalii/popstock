import {useUser} from '../../common/hooks/useUser';
import {
  selectAuthToken,
  selectShouldShowLogoutReason,
  selectWallet,
} from '../../common/selectors/selectors';
import {startAuth} from '../../common/utils/auth';
import {logout} from '../../core/actions/appActions';
import Button from '../partials/button';
import Tile, {TileTitle} from '../partials/tile';
import {useDispatch, useSelector} from 'react-redux';

export default function Wallet() {
  const wallet = useSelector(selectWallet);
  const auth_token = useSelector(selectAuthToken);
  const {name} = useUser();
  const showLogoutReason = useSelector(selectShouldShowLogoutReason);
  const dispatch = useDispatch();
  return (
    <Tile className='flex flex-col justify-between h-36'>
      <div>
        <TileTitle>Wallet</TileTitle>
        <span className='text-4xl'>{wallet.toString()}</span>
        {showLogoutReason && (
          <p className='text-red-500'>You have been logged out.</p>
        )}
      </div>
      {auth_token ? (
        <div className='flex flex-row justify-between items-center'>
          <span>Logged in as {name}.</span>
          <Button color='secondary' onClick={() => dispatch(logout(false))}>
            Log out
          </Button>
        </div>
      ) : (
        <Button color='primary' onClick={() => startAuth()}>
          {showLogoutReason ? 'Log back in to continue' : 'Log in with Spotify'}
        </Button>
      )}
    </Tile>
  );
}
