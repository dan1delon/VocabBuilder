import css from './GoogleOAuthButton.module.css';
import { instance } from '../../../redux/auth/operations';

const GoogleOAuthButton = () => {
  const handleLogin = async () => {
    const { data } = await instance.get('/users/get-oauth-url');
    console.log(data.data.url);

    window.location.href = data.data.url;
  };

  return (
    <button type="button" className={css.button} onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleOAuthButton;
