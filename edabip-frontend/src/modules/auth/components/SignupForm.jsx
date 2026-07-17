import { useState } from 'react';
import backgroundImg from "../../../assets/login/background.jpg";
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import emailicon from '../../../assets/login/line-email.png';
import phoneicon from '../../../assets/login/phone-icon.png';
import lockicon from '../../../assets/login/lock.png';
import usericon from '../../../assets/login/user-icon.png';
import checkIcon from '../../../assets/login/checkcircle.png';
import googleicon from '../../../assets/login/google-icon.png';
import EyeIcon from "../../../assets/login/eye-off.svg";
import SSOButton from './SSOButton.jsx';
import './SignupForm.css';

const FEATURES = [
  {
    src: featureAnalytics,
    alt: 'Real-Time Analytics',
    title: 'Real-Time Analytics',
    desc: 'Track performance, analyze data, and make smarter business decisions in real-time',
  },
  {
    src: featureAi,
    alt: 'AI-Powered Insights',
    title: 'AI-Powered Insights',
    desc: 'Leverage AI to get intelligent recommendations.',
  },
  {
    src: featureSecurity,
    alt: 'Enterprise Security',
    title: 'Enterprise Security',
    desc: 'Bank-grade security to keep your data safe and compliant.',
  },
  {
    src: featureScalable,
    alt: 'Scalable Platform',
    title: 'Scalable Platform',
    desc: 'Built to scale with your business and handle massive data.',
  },
];

function CardLogo() {
  return (
    <div className="su-card-logo">
      <img src={logoImgc} alt="" className="su-card-logo-icon" />
      <span className="su-card-logo-text">EDABIP</span>
    </div>
  );
}

const validateFullName = (v) => v.trim().length >= 2;
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validateMobileNumber = (v) => {
  const c = v.replace(/[\s\-]/g, '');
  return /^(\+91|91)?[6-9]\d{9}$/.test(c);
};
const validatePassword = (v) => v.length >= 8;
const validateConfirmPassword = (p, c) => c.length > 0 && p === c;
const validateTerms = (v) => v === true;

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [showCreateErrorNotice, setShowCreateErrorNotice] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const getErrors = (data) => {
    const e = {};

    e.fullName = !data.fullName.trim() || !validateFullName(data.fullName)
      ? 'Please enter a valid full name'
      : '';

    e.email = !data.email.trim() || !validateEmail(data.email)
      ? 'Please enter a valid email address'
      : '';

    if (!data.mobileNumber.trim()) {
      e.mobileNumber = 'Mobile number is required';
    } else if (!validateMobileNumber(data.mobileNumber)) {
      const digits = data.mobileNumber.replace(/[\s\-+]/g, '').replace(/^91/, '');
      e.mobileNumber = digits.length !== 10
        ? 'Mobile number must be 10 digits'
        : 'Please enter a valid mobile number (+91 format)';
    } else {
      e.mobileNumber = '';
    }

    e.password = !data.password || !validatePassword(data.password)
      ? 'Password must be at least 8 characters'
      : '';

    e.confirmPassword = !data.confirmPassword || !validateConfirmPassword(data.password, data.confirmPassword)
      ? 'Passwords do not match'
      : '';

    e.agreeToTerms = !validateTerms(data.agreeToTerms)
      ? 'You must agree to Terms & Conditions'
      : '';

    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = getErrors(formData);
    setErrors(newErrors);
    if (Object.values(newErrors).some((m) => m !== '')) {
      setShowCreateErrorNotice(true); return;
    }

    // Hide notification when the form is valid
    setShowCreateErrorNotice(false);

    console.log('Signup form submitted:', {
      fullName: formData.fullName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      password: formData.password,
      agreeToTerms: formData.agreeToTerms,
    });
  };

  const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12.5C2.73 8.11 7 5 12 5s9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.89 1 12.5z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const EyeClosed = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.58 10.58A2 2 0 0012 15a2 2 0 001.41-.59" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a11.6 11.6 0 01-2.12 3.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.12 6.12A11.6 11.6 0 001 12.5C2.73 16.89 7 20 12 20a10.94 10.94 0 003.12-.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="su-container">
      <div className="su-background">
        <img src={backgroundImg} alt="" className="su-background-image" />
      </div>

      {/* Negative-state notification shown only when signup validation fails */}
      {showCreateErrorNotice && (
        <div className="su-error-notification" role="alert">
          <div className="su-error-icon">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3L22 20H2L12 3Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M12 9V13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17" r="1" fill="white" />
            </svg>
          </div>

          <div className="su-error-message">
            <h4>Unable to create account</h4>
            <p>Please fix the errors below and try again</p>
          </div>

          <button
            type="button"
            className="su-error-close"
            onClick={() => setShowCreateErrorNotice(false)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      <div className="su-content">
        {/* Left Info Section */}
        <div className="su-left">
          <img src={logoImg} alt="EDABIP" className="su-brand-logo" />

          <h1 className="su-heading">Create your Account</h1>
          <p className="su-subheading">
            Start your analytics journey<br />with <strong>EDABIP</strong>
          </p>

          <div className="su-features">
            {FEATURES.map((f) => (
              <div key={f.alt} className="su-feature-item">
                <img src={f.src} alt={f.alt} className="su-feature-icon" />
                <div className="su-feature-text">
                  <span className="su-feature-title">{f.title}</span>
                  <span className="su-feature-desc">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card Section */}
        <div className="su-right">
          <div className="su-card">


            <h2 className="su-card-title">Create your Account</h2>
            <p className="su-card-subtitle">
              Start your analytics journey with <strong>EDABIP</strong>
            </p>

            <form onSubmit={handleSubmit} className="su-form" noValidate>

              <div className="su-form-group">
                <label htmlFor="su-fullName">Full Name</label>
                <div className="su-input-wrapper">
                  <img
                    src={usericon}
                    alt="user"
                    className="su-input-icon"
                  />
                  <input
                    type="text"
                    id="su-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    maxLength={80}
                  />
                  {errors.mobileNumber && (
                    <img
                      src={checkIcon}
                      alt="error"
                      className="su-check-icon"
                    />
                  )}
                </div>
                <span className="su-field-error">{errors.fullName}</span>
              </div>

              <div className="su-form-group">
                <label htmlFor="su-email">Email ID</label>
                <div className="su-input-wrapper">
                  <img
                    src={emailicon}
                    alt="email"
                    className="su-input-icon"
                  />
                  <input
                    type="email"
                    id="su-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <img
                      src={checkIcon}
                      alt="error"
                      className="su-check-icon"
                    />
                  )}
                </div>
                <span className="su-field-error">{errors.email}</span>
              </div>

              <div className="su-form-group">
                <label htmlFor="su-mobileNumber">Mobile Number</label>
                <div className="su-input-wrapper">
                  <img
                    src={phoneicon}
                    alt="phone"
                    className="su-input-icon"
                  />
                  <input
                    type="tel"
                    id="su-mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    maxLength={15}
                  />
                  {errors.mobileNumber && (
                    <img
                      src={checkIcon}
                      alt="error"
                      className="su-check-icon"
                    />
                  )}
                </div>
                <span className="su-field-error">{errors.mobileNumber}</span>
              </div>

              <div className="su-form-group">
                <label htmlFor="su-password">Password</label>
                <div className="su-input-wrapper">
                  <img
                    src={lockicon}
                    alt="password"
                    className="su-input-icon"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="su-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <img
                      src={checkIcon}
                      alt="error"
                      className="su-check-icon"
                    />
                  )}
                  <button
                    type="button"
                    className={`su-pw-toggle ${errors.password ? 'su-pw-toggle-error' : ''}`}
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ?<EyeOpen />:<img src={EyeIcon} alt="Hide password" width="18" height="18" />
                     }
                  </button>
                  
                </div>
                <span className="su-field-error">{errors.password}</span>
              </div>

              <div className="su-form-group">
                <label htmlFor="su-confirmPassword">Confirm Password</label>
                <div className="su-input-wrapper">
                  <img
                    src={lockicon}
                    alt="password"
                    className="su-input-icon"
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="su-confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <img
                      src={checkIcon}
                      alt="error"
                      className="su-check-icon"
                    />
                  )}
                  <button
                    type="button"
                    className={`su-pw-toggle ${errors.confirmPassword ? 'su-pw-toggle-error' : ''}`}
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOpen />:<img src={EyeIcon} alt="Hide password" width="18" height="18" />
                    }
                  </button>

                </div>
                <span className="su-field-error">{errors.confirmPassword}</span>
              </div>

              <div className="su-form-group su-terms-group">
                <label className="su-terms-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="su-terms-checkbox"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#" className="su-terms-link">Terms &amp; Conditions</a>
                  </span>
                </label>
                <span className="su-field-error">{errors.agreeToTerms}</span>
              </div>

              <button type="submit" className="su-submit-btn">Create Account</button>
            </form>

            <div className="su-divider">
              <span>OR</span>
            </div>

            <SSOButton
              provider="google"
              className="su-sso-btn"
              icon={<img
                src={googleicon}
                alt=""
                className="su-sso-icon"
              />}
            />

            <p className="su-signin-text">
              Already have an account?{' '}
              <a href="/login" className="su-signin-link">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
