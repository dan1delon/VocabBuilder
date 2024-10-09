import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import WelcomeBanner from '../../components/RegisterPage/WelcomeBanner/WelcomeBanner';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.wrapper}>
      <WelcomeBanner />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
