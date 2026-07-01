import LoginPage from '../modules/auth/pages/LoginPage';
import Loginform from '../modules/auth/components/LoginForm';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import CreateNewPasswordForm from '../modules/auth/components/CreateNewPasswordForm';

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
];