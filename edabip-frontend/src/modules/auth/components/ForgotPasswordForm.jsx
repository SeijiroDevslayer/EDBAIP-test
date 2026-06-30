import { useState } from 'react';
import backgroundImg from '../../../assets/login/background.png';
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import './ForgotPasswordForm.css';

// NOTE: Figma has two competing designs for this step —
//   (A) this one: single email field -> "Send Reset Link"
//   (B) Email/Mobile tabs -> "Send OTP"
// Building (A) since it's the only one with a complete, consistent flow
// (matching screen + "Email Sent Successfully" confirmation screen).
// Swap this out if the design team confirms (B) instead.

const FEATURES = [
  { src: featureAnalytics, alt: 'Real-Time Analytics', label: 'Real-Time Analytics' },
  { src: featureAi, alt: 'AI-Powered Insights', label: 'AI-Powered Insights' },
  { src: featureSecurity, alt: 'Enterprise Security', label: 'Enterprise Security' },
  { src: featureScalable, alt: 'Scalable Platform', label: 'Scalable Platform' },
];

function CardLogo() {
  return (
    <div className="card-logo">
      <img src={logoImgc} alt="" className="card-logo-icon" />
      <span className="card-logo-text">EDABIP</span>
    </div>
  );
}

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitting(true);

    // TODO: wire to real endpoint, e.g.
    // api.post('/auth/forgot-password', { email })
    //   .then(() => navigate('/email-sent', { state: { email } }))
    //   .finally(() => setSubmitting(false));
    console.log('Reset link requested for:', email);
    setSubmitting(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-background">
        <img src={backgroundImg} alt="" className="background-image" />
      </div>

      <div className="forgot-password-content">
        <div className="left-section">
          <img src={logoImg} alt="EDABIP" className="brand-logo" />

          <h1 className="welcome-heading">
            Welcome to your Analytics Dashboard
          </h1>

          <p className="welcome-description">
            Track performance, analyze data, and make smarter business decisions in real-time.
          </p>

          <div className="features-container">
            {FEATURES.map((feature) => (
              <div key={feature.alt} className="feature-item">
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
          <div className="forgot-password-card">
            <CardLogo />

            <h2 className="card-welcome">Reset Your Password</h2>

            <p className="card-subtitle">
              Enter your registered email address and we&apos;ll send you a link to reset your
              password.
            </p>

            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 6l10 7 10-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                {error && <p className="field-error">{error}</p>}
              </div>

              <button type="submit" className="reset-btn" disabled={submitting}>
                <svg
                  className="btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {submitting ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="sso-btn google-btn">
              <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Reset with Google
            </button>

            <p className="signin-text">
              Remember your password?{' '}
              <a href="/login" className="signin-link">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;