import { lazy, Suspense, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from "../../../assets/login/background.jpg";
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import lockIcon from '../../../assets/login/lock.png';
import mailIcon from "../../../assets/login/line-email.png";
import EyeIcon from "../../../assets/login/eye-off.svg";
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import { useAuthContext } from '../../../context/AuthContext.jsx';
import { AUTH_STATUS } from '../utils/authConfig.js';
import { getSafeAuthErrorMessage } from '../utils/authErrors.js';
import { MOCK_LOGIN_MFA_OTP_LENGTH } from '../services/loginMfaService.js';
import './LoginForm.css';
import SSOButton from "./SSOButton";
import MicrosoftSSOButton from "./MicrosoftSSOButton";
import MfaVerificationModal from "./MfaVerificationModal";

const MfaVerificationSuccess = lazy(() => import("./MfaVerificationSuccess"));

const FEATURES = [
  {
    src: featureAnalytics,
    alt: 'Real-Time Analytics',
    label: 'Real-Time Analytics',
  },
  {
    src: featureAi,
    alt: 'AI-Powered Insights',
    label: 'AI-Powered Insights',
  },
  {
    src: featureSecurity,
    alt: 'Enterprise Security',
    label: 'Enterprise Security',
  },
  {
    src: featureScalable,
    alt: 'Scalable Platform',
    label: 'Scalable Platform',
  },
];

const LOGIN_FLOW = {
  IDLE: 'idle',
  SUBMITTING_CREDENTIALS: 'submittingCredentials',
  CREDENTIALS_REJECTED: 'credentialsRejected',
  MFA_REQUIRED: 'mfaRequired',
  VERIFYING_MFA: 'verifyingMfa',
  MFA_REJECTED: 'mfaRejected',
  MFA_VERIFIED: 'mfaVerified',
  AUTHENTICATED: 'authenticated',
};

const initialLoginFlowState = {
  status: LOGIN_FLOW.IDLE,
  mfaError: '',
  isResendingMfa: false,
};

function loginFlowReducer(state, action) {
  switch (action.type) {
    case 'SUBMIT_CREDENTIALS':
      return {
        ...state,
        status: LOGIN_FLOW.SUBMITTING_CREDENTIALS,
        mfaError: '',
      };
    case 'CREDENTIALS_REJECTED':
      return {
        ...state,
        status: LOGIN_FLOW.CREDENTIALS_REJECTED,
        mfaError: '',
      };
    case 'MFA_REQUIRED':
      return {
        ...state,
        status: LOGIN_FLOW.MFA_REQUIRED,
        mfaError: '',
        isResendingMfa: false,
      };
    case 'VERIFYING_MFA':
      return {
        ...state,
        status: LOGIN_FLOW.VERIFYING_MFA,
        mfaError: '',
      };
    case 'MFA_REJECTED':
      return {
        ...state,
        status: LOGIN_FLOW.MFA_REJECTED,
        mfaError: action.error || 'The verification code is incorrect.',
      };
    case 'RESENDING_MFA':
      return {
        ...state,
        isResendingMfa: true,
      };
    case 'RESEND_DONE':
      return {
        ...state,
        isResendingMfa: false,
        mfaError: action.error || '',
        status: action.error ? LOGIN_FLOW.MFA_REJECTED : LOGIN_FLOW.MFA_REQUIRED,
      };
    case 'MFA_VERIFIED':
      return {
        ...state,
        status: LOGIN_FLOW.MFA_VERIFIED,
        mfaError: '',
        isResendingMfa: false,
      };
    case 'AUTHENTICATED':
      return {
        ...state,
        status: LOGIN_FLOW.AUTHENTICATED,
        mfaError: '',
        isResendingMfa: false,
      };
    case 'RESET_MFA':
      return {
        ...initialLoginFlowState,
      };
    default:
      return state;
  }
}

function CardLogo() {
  return (
    <div className="card-logo">
      <img src={logoImgc} alt="" className="card-logo-icon" />
      <span className="card-logo-text">EDABIP</span>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showLoginFailed, setShowLoginFailed] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [flow, dispatchFlow] = useReducer(loginFlowReducer, initialLoginFlowState);

  const submitButtonRef = useRef(null);
  const {
    login,
    verifyMfa,
    resendMfa,
    clearPendingAuthentication,
    pendingChallenge,
    authStatus,
  } = useAuthContext();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isMfaOpen =
    Boolean(pendingChallenge) &&
    (authStatus === AUTH_STATUS.MFA_PENDING ||
      flow.status === LOGIN_FLOW.MFA_REQUIRED ||
      flow.status === LOGIN_FLOW.VERIFYING_MFA ||
      flow.status === LOGIN_FLOW.MFA_REJECTED);

  useEffect(() => {
    if (authStatus === AUTH_STATUS.MFA_PENDING && pendingChallenge) {
      dispatchFlow({ type: 'MFA_REQUIRED' });
    }
  }, [authStatus, pendingChallenge]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailError = '';
    let passwordError = '';

    if (!email || !emailRegex.test(email)) {
      emailError = 'Please enter a valid email address';
    }

    if (!password) {
      passwordError = 'Incorrect password';
    }

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    dispatchFlow({ type: 'SUBMIT_CREDENTIALS' });

    try {
      const result = await login({ email, password }, rememberMe);

      if (result.mfaRequired) {
        dispatchFlow({ type: 'MFA_REQUIRED' });
        return;
      }

      if (result.success) {
        setFailedAttempts(0);
        setLoginError('');
        dispatchFlow({ type: 'AUTHENTICATED' });
        navigate('/dashboard');
        return;
      }

      dispatchFlow({ type: 'CREDENTIALS_REJECTED' });

      const updatedAttempts = failedAttempts + 1;
      setFailedAttempts(updatedAttempts);

      if (updatedAttempts >= 5 || result.locked) {
        navigate('/account-locked');
        return;
      }

      setLoginError(`Invalid credentials. Attempt ${updatedAttempts} of 5`);
      setIsLocked(!!result.locked);
      setAttemptsRemaining(result.attemptsRemaining ?? null);
      setErrors({ email: '', password: '' });
      setEmail('');
      setPassword('');
      setShowLoginFailed(true);
      setTimeout(() => setShowLoginFailed(false), 5000);
    } catch {
      dispatchFlow({ type: 'CREDENTIALS_REJECTED' });
      setErrors({ email: '', password: '' });
      setIsLocked(false);
      setAttemptsRemaining(null);
      setShowLoginFailed(true);
      setTimeout(() => setShowLoginFailed(false), 5000);
    }
  };

  const handleVerifyMfa = async (code) => {
    dispatchFlow({ type: 'VERIFYING_MFA' });

    const result = await verifyMfa(code);

    if (result.success) {
      dispatchFlow({ type: 'MFA_VERIFIED' });
      return;
    }

    dispatchFlow({
      type: 'MFA_REJECTED',
      error: getSafeAuthErrorMessage(result.code, result.message),
    });
  };

  const handleMfaSuccessRedirect = useCallback(() => {
    dispatchFlow({ type: 'AUTHENTICATED' });
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  const handleResendMfa = async () => {
    dispatchFlow({ type: 'RESENDING_MFA' });
    const result = await resendMfa();

    if (!result.success) {
      dispatchFlow({
        type: 'RESEND_DONE',
        error: getSafeAuthErrorMessage(result.code, result.message),
      });
      return {
        resendAvailableInSeconds: result.resendAvailableInSeconds,
      };
    }

    dispatchFlow({ type: 'RESEND_DONE' });
    return {
      resendAvailableInSeconds: result.resendAvailableInSeconds ?? 120,
    };
  };

  const handleCloseMfa = async () => {
    await clearPendingAuthentication();
    dispatchFlow({ type: 'RESET_MFA' });
  };

  const closeLoginFailed = () => {
    setShowLoginFailed(false);
  };

  const resendAvailableInSeconds = pendingChallenge?.resendAvailableAt
    ? Math.max(
        0,
        Math.ceil((pendingChallenge.resendAvailableAt - Date.now()) / 1000)
      )
    : 120;

  const expiresInSeconds = pendingChallenge?.expiresAt
    ? Math.max(0, Math.ceil((pendingChallenge.expiresAt - Date.now()) / 1000))
    : 300;

  return (
    <div className="login-container">
      {showLoginFailed && (
        <div className="login-failed-notification">
          <div className="notification-content">
            <div className="notification-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="notification-text">
              <span className="notification-title">{isLocked ? 'Account Locked' : 'Login Failed'}</span>
              <span className="notification-message">{isLocked ? 'Too many failed attempts. Please try again later.' : 'Please check your credentials and try again'}</span>
              {!isLocked && attemptsRemaining !== null && (
                <span className="notification-detail">
                  <strong>
                    You have {attemptsRemaining} more attempt{attemptsRemaining !== 1 ? 's' : ''} left.
                  </strong>
                </span>
              )}
              {!isLocked && (
                <span className="notification-detail">
                  After 5 failed login attempts, your account will be <strong>temporarily locked.</strong>
                </span>
              )}

            </div>

            <button
              className="notification-close"
              onClick={closeLoginFailed}
              aria-label="Close notification"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="login-background">
        <img
          src={backgroundImg}
          alt=""
          className="background-image"
        />
      </div>

      <div className="login-content">
        <div className="left-section">
          <img
            src={logoImg}
            alt="EDABIP"
            className="brand-logo"
          />

          <h1 className="welcome-heading">
            Welcome to your Analytics Dashboard
          </h1>

          <p className="welcome-description">
            Track performance, analyze data, and make smarter business decisions in real-time.
          </p>

          <div className="features-container">
            {FEATURES.map((feature) => (
              <div
                key={feature.alt}
                className="feature-item"
              >
                <img
                  src={feature.src}
                  alt={feature.alt}
                  className="feature-badge"
                />

                <span className="feature-label">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="right-section">
          <div className="login-card">
            <div className="card-content">
              <CardLogo />

            <h2 className="card-welcome">
              Welcome{' '}
              <span className="card-welcome-accent">
                Back !
              </span>
            </h2>

            <p className="card-subtitle">
              Glad to see you again! Please login to continue your analytics journey.
            </p>

            <form
              onSubmit={handleSubmit}
              className="login-form"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="email" className='emailclass'>
                  Email ID
                </label>

                <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                  <div>
                    <img src={mailIcon} alt="" className="input-icon mail-icon" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder="Enter your email address"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={flow.status === LOGIN_FLOW.SUBMITTING_CREDENTIALS}
                  />

                  {errors.email && (
                    <div className="error-icon-circle">
                      <span className="error-exclamation">!</span>
                    </div>
                  )}
                </div>

                <span
                  className={`error-message ${errors.email ? 'show' : ''}`}
                  id="email-error"
                  role="alert"
                >
                  {errors.email || '\u00A0'}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>

                    <img src={lockIcon} alt="" className="input-icon lock-icon" />


                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: '' }));
                      }
                    }}
                    placeholder="Enter your password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    disabled={flow.status === LOGIN_FLOW.SUBMITTING_CREDENTIALS}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >

                    {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 12.5C2.73 8.11 7 5 12 5s9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.89 1 12.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12.5"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                ) : (
                  <img src={EyeIcon} alt="Hide password" width="18" height="18" />
                )}
                  </button>

                  {errors.password && (
                    <div className="error-icon-circle">
                      <span className="error-exclamation">!</span>
                    </div>
                  )}
                </div>

                <span
                  className={`error-message ${errors.password ? 'show' : ''}`}
                  id="password-error"
                  role="alert"
                >
                  {errors.password || '\u00A0'}
                </span>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="/forgot-password"
                  className="forgot-password"
                >
                  Forgot Password?
                </a>
              </div>


              <button
                ref={submitButtonRef}
                type="submit"
                className="login-btn"
                disabled={flow.status === LOGIN_FLOW.SUBMITTING_CREDENTIALS}
                aria-busy={flow.status === LOGIN_FLOW.SUBMITTING_CREDENTIALS}
              >
                {flow.status === LOGIN_FLOW.SUBMITTING_CREDENTIALS
                  ? 'Signing in...'
                  : 'Sign In'}
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="sso-stack">
              <SSOButton provider="google" />
              <MicrosoftSSOButton />
            </div>

            <p className="signup-text">
              Don&apos;t have an account?{' '}
              <a
                href="/signup"
                className="signup-link"
              >
                Sign up
              </a>
            </p>
            </div>
          </div>
        </div>
      </div>

      <MfaVerificationModal
        open={isMfaOpen}
        title="Verify Your Email"
        method={pendingChallenge?.method || 'EMAIL_OTP'}
        maskedDestination={pendingChallenge?.maskedDestination || ''}
        expiresInSeconds={expiresInSeconds}
        resendAvailableInSeconds={resendAvailableInSeconds || 120}
        otpLength={MOCK_LOGIN_MFA_OTP_LENGTH}
        isSubmitting={flow.status === LOGIN_FLOW.VERIFYING_MFA}
        isResending={flow.isResendingMfa}
        error={flow.mfaError}
        onVerify={handleVerifyMfa}
        onResend={handleResendMfa}
        onClose={handleCloseMfa}
        returnFocusRef={submitButtonRef}
      />

      {flow.status === LOGIN_FLOW.MFA_VERIFIED ? (
        <Suspense fallback={null}>
          <MfaVerificationSuccess
            open
            onRedirect={handleMfaSuccessRedirect}
          />
        </Suspense>
      ) : null}

      {/* Keep loginError referenced for lockout messaging parity */}
      <span className="visually-hidden" aria-hidden="true">
        {loginError}
      </span>
    </div>
  );
}

export default LoginForm;
