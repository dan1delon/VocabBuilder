import css from './GoogleOAuthButton.module.css';
import { instance } from '../../../redux/auth/operations';
import { useLocation } from 'react-router-dom';
import Icon from '../../../shared/Icon/Icon';

const GoogleOAuthButton = () => {
  const location = useLocation();

  const handleLogin = async () => {
    const { data } = await instance.get('/users/get-oauth-url');
    console.log(data.data.url);

    window.location.href = data.data.url;
  };

  return (
    <button type="button" className={css.button} onClick={handleLogin}>
      <Icon iconId="icon-google" className={css.icon} />
      {(location.pathname === '/login' && 'Login with Google') ||
        'Register with Google'}
    </button>
  );
};

export default GoogleOAuthButton;
