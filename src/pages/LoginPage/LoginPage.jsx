import { useSelector } from 'react-redux';
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import WelcomeBanner from '../../components/RegisterPage/WelcomeBanner/WelcomeBanner';
import css from './LoginPage.module.css';
import { selectLoading } from '../../redux/auth/selectors';
import Loader from '../../components/Loader/Loader';

const LoginPage = () => {
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.wrapper}>
      {isLoading && <Loader />}
      <WelcomeBanner />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
