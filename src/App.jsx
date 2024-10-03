import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader.jsx';
import Layout from './components/Layout/Layout.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
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
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
