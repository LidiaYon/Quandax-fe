import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ToastProvider } from './components/common/Toaster';

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {

  return (
    <>
      <Router>
      <AppRoutes />
    </Router>
    <ToastProvider />
    </>
  )
}

export default App
