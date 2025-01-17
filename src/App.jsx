import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader.jsx';
import Layout from './components/Layout/Layout.jsx';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserAPI } from './redux/auth/operations.js';
import { selectIsRefreshing } from './redux/auth/selectors.js';

const RegisterPage = lazy(() =>
  import('./pages/RegisterPage/RegisterPage.jsx')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const DictionaryPage = lazy(() =>
  import('./pages/DictionaryPage/DictionaryPage.jsx')
);
const RecommendPage = lazy(() =>
  import('./pages/RecommendPage/RecommendPage.jsx')
);
const TrainingPage = lazy(() =>
  import('./pages/TrainingPage/TrainingPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserAPI());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dictionary" replace />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/dictionary"
            element={
              <PrivateRoute>
                <DictionaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommend"
            element={
              <PrivateRoute>
                <RecommendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/training"
            element={
              <PrivateRoute>
                <TrainingPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
