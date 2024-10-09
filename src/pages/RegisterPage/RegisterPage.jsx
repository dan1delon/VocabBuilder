import RegistrationForm from '../../components/RegisterPage/RegistrationForm/RegistrationForm';
import WelcomeBanner from '../../components/RegisterPage/WelcomeBanner/WelcomeBanner';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.wrapper}>
      <WelcomeBanner />
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
