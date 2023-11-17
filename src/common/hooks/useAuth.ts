import {AuthContext} from '../../core/providers/authProvider';
import {useContext} from 'react';

const useAuth = () => useContext(AuthContext);
export default useAuth;
