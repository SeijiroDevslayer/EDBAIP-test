import { createElement } from 'react';
import LandingPage from '../modules/landing-page/Landing-Page.jsx';
import LoginForm from '../modules/auth/components/LoginForm.jsx';
import SignupForm from '../modules/auth/components/SignupForm.jsx';
import ForgotPasswordForm from '../modules/auth/components/ForgotPasswordForm.jsx';
import CreateNewPasswordForm from '../modules/auth/components/CreateNewPasswordForm.jsx';
import PasswordResetSuccess from '../modules/auth/components/PasswordResetSuccess.jsx';
import SessionExpiredForm from '../modules/auth/components/SessionExpiredForm.jsx';
import DashboardPage from '../modules/dashboard/pages/DashboardPage.jsx';
import AccountLockedForm from '../modules/auth/components/AccountLockedForm.jsx';
import ContactSupportForm from '../modules/auth/components/ContactSupportForm.jsx';

export const routes = [
  {
    path: '/',
    element: createElement(LandingPage),
    protected: false,
  },
  {
    path: '/landing-page',
    element: createElement(LandingPage),
    protected: false,
  },
  {
    path: '/login',
    element: createElement(LoginForm),
    protected: false,
  },
  {
    path: '/signup',
    element: createElement(SignupForm),
    protected: false,
  },
  {
    path: '/forgot-password',
    element: createElement(ForgotPasswordForm),
    protected: false,
  },
  {
    path: '/create-new-password',
    element: createElement(CreateNewPasswordForm),
    protected: false,
  },
  {
    path: '/password-reset-success',
    element: createElement(PasswordResetSuccess),
    protected: false,
  },
  {
    path: '/session-expired',
    element: createElement(SessionExpiredForm),
    protected: false,
  },
  {
    path: '/dashboard',
    element: createElement(DashboardPage),
    protected: true,
  },
  {
    path: '/account-locked',
    element: createElement(AccountLockedForm),
    protected: false,
  },
  {
    path: '/contact-support',
    element: createElement(ContactSupportForm),
    protected: false,
  },
];
