import { createElement } from 'react';
import LandingPage from '../modules/landing-page/Landing-Page.jsx';
import LoginPage from '../modules/auth/pages/LoginPage.jsx';
import SignupPage from '../modules/auth/pages/SignupPage.jsx';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage.jsx';
import CreateNewPasswordPage from '../modules/auth/pages/CreateNewPasswordPage.jsx';
import PasswordResetSuccessPage from '../modules/auth/pages/PasswordResetSuccessPage.jsx';
import SessionExpiredPage from '../modules/auth/pages/SessionExpiredPage.jsx';
import DashboardPage from '../modules/dashboard/pages/DashboardPage.jsx';
import AccountLockedPage from '../modules/auth/pages/AccountLockedPage.jsx';
import ContactSupportPage from '../modules/auth/pages/ContactSupportPage.jsx';

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
    element: createElement(LoginPage),
    protected: false,
  },
  {
    path: '/signup',
    element: createElement(SignupPage),
    protected: false,
  },
  {
    path: '/forgot-password',
    element: createElement(ForgotPasswordPage),
    protected: false,
  },
  {
    path: '/create-new-password',
    element: createElement(CreateNewPasswordPage),
    protected: false,
  },
  {
    path: '/password-reset-success',
    element: createElement(PasswordResetSuccessPage),
    protected: false,
  },
  {
    path: '/session-expired',
    element: createElement(SessionExpiredPage),
    protected: false,
  },
  {
    path: '/dashboard',
    element: createElement(DashboardPage),
    protected: true,
  },
  {
    path: '/account-locked',
    element: createElement(AccountLockedPage),
    protected: false,
  },
  {
    path: '/contact-support',
    element: createElement(ContactSupportPage),
    protected: false,
  },
];
