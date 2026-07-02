import LoginPage from '../modules/auth/pages/LoginPage';
import Loginform from '../modules/auth/components/LoginForm';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import CreateNewPasswordForm from '../modules/auth/components/CreateNewPasswordForm';
import SessionExpiredPage from '../modules/auth/pages/SessionExpiredPage';

export const routes = [
  {
    path: '/',
    element: <Loginform />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/create-new-password',
    element: <CreateNewPasswordForm />,
  },
  {
    path: '/session-expired',
    element: <SessionExpiredPage />,
  },
];