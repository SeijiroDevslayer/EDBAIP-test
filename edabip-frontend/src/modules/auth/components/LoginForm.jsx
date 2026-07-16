import { useState } from 'react';
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
import './LoginForm.css';

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
const [errors, setErrors] = useState({
  email: '',
  password: '',
});

const [showLoginFailed, setShowLoginFailed] = useState(false);
const [attemptsRemaining, setAttemptsRemaining] = useState(null);
const [isLocked, setIsLocked] = useState(false);

//  Account Locked logic
const [loginError, setLoginError] = useState('');
const [failedAttempts, setFailedAttempts] = useState(0);
const { login } = useAuthContext();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    try {
      const result = await login({ email, password });

      if (result.success) {
        setFailedAttempts(0);
        setLoginError('');
        navigate('/dashboard');
        return;
      }
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
    } catch (error) {
      // only for genuine network/unexpected errors now
      setErrors({ email: '', password: '' });
      setIsLocked(false);
      setAttemptsRemaining(null);
      setShowLoginFailed(true);
      setTimeout(() => setShowLoginFailed(false), 5000);
    }
  };

  const closeLoginFailed = () => {
    setShowLoginFailed(false);
  };

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
                  // 👁 OPEN EYE (password is visible)

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
                  // 🚫 EYE-OFF (password is hidden)

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3l18 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M10.58 10.58A2 2 0 0012 15a2 2 0 001.41-.59"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a11.6 11.6 0 01-2.12 3.17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M6.12 6.12A11.6 11.6 0 001 12.5C2.73 16.89 7 20 12 20a10.94 10.94 0 003.12-.46"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
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
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a
                  href="/forgot-password"
                  className="forgot-password"
                >
                  Forgot Password?
                </a>
              </div>
              {loginError && (
                <div className="login-error">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="login-btn"
              >
                Sign In
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="sso-btn google-btn"
            >
              <svg
                className="btn-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Sign in with Google
            </button>

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
    </div>
  );
}

export default LoginForm;