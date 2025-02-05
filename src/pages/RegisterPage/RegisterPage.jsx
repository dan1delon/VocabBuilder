import { useSelector } from 'react-redux';
import RegistrationForm from '../../components/RegisterPage/RegistrationForm/RegistrationForm';
import WelcomeBanner from '../../components/RegisterPage/WelcomeBanner/WelcomeBanner';
import { selectLoading } from '../../redux/auth/selectors';
import css from './RegisterPage.module.css';
import Loader from '../../components/Loader/Loader';

const RegisterPage = () => {
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.wrapper}>
      {isLoading && <Loader />}
      <WelcomeBanner />
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
