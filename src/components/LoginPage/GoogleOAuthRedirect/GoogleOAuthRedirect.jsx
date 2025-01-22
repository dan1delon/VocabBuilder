import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleOAuthAPI } from '../../../redux/auth/operations';
import Loader from '../../Loader/Loader';

const GoogleOAuthRedirect = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      dispatch(googleOAuthAPI(code)).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          navigate('/dictionary');
        }
      });
    }
  }, [location.search, dispatch, navigate]);

  return <Loader />;
};

export default GoogleOAuthRedirect;
