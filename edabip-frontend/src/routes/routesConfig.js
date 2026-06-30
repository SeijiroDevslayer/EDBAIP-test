import LoginPage from '../modules/auth/pages/LoginPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';

export const routes = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
];