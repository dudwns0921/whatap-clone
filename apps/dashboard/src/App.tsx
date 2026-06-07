import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Storybook from './pages/Storybook';

export default function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/storybook" element={<Storybook />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
