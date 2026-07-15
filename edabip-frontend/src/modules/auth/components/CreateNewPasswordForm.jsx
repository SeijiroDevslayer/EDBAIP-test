import { useEffect, useState, useMemo } from 'react';
import { useAuthContext } from "../../../context/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImg from "../../../assets/login/background.jpg";
import warningImg from '../../../assets/login/warning.png';
import warningFieldImg from '../../../assets/login/Vectorplaceholder.png';
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import lockIcon from '../../../assets/login/lock.png';
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import './CreateNewPasswordForm.css';


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

const STRENGTH_LEVELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];

function getPasswordStrength(pwd) {
  if (!pwd) return { level: '', score: 0, rules: { minLength: false, uppercase: false, lowercase: false, number: false, special: false } };
  const rules = {
    minLength: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
  const score = Object.values(rules).filter(Boolean).length;
  const level = score <= 2 ? 'Weak' : score === 3 ? 'Fair' : score === 4 ? 'Good' : 'Strong';
  return { level, score, rules };
}

function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#EF4444" />
      <path d="M12 7v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="#fff" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#22C55E" />
      <path d="M7 12l3.5 3.5L17 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#EF4444" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CardLogo() {
  return (
    <div className="cnp-card-logo">
      <img src={logoImgc} alt="" className="cnp-card-logo-icon" />
      <span className="cnp-card-logo-text">EDABIP</span>
    </div>
  );
}

function LockIcon() {
  return (
    <div>
      <img src={lockIcon} alt="" className='cnp-card-lock-icon' />
    </div>
  );
}

function PasswordToggleIcon({ visible }) {
  if (visible) {
    return (
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
    );
  }

  return (
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
  );
}

function CreateNewPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updatePassword } = useAuthContext();

  const resetPassword = location.state?.resetPassword;
const destination = location.state?.destination;
const method = location.state?.method;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [toast, setToast] = useState({
      show: false,
      title: "",
      message: "",
    });


  const showToastMessage = (title, message) => {
    setToast({
      show: true,
      title,
      message,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  // useEffect(() => {
  //   if (!location.state?.otpVerified) {
  //     navigate('/forgot-password', { replace: true });
  //   }
  // }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    // Weak password
    if (strength.level !== "Strong") {
      // setPasswordError(
      //   "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
      // );

      showToastMessage(
        "Weak Password",
        "Your password is too weak. Please follow the password requirements shown above."
      );

      hasError = true;
    } else {
      // setPasswordError("");
    }

    // Password mismatch
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");

      showToastMessage(
        "Password Mismatch",
        "Please enter the same password in both fields."
      );

      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) return;

    // Save new password
    updatePassword(password);

    // Go to success page
     navigate("/password-reset-success", {
     replace: true,
   });
  };

  const strengthColors = { Weak: '#EF4444', Fair: '#F97316', Good: '#EAB308', Strong: '#22C55E' };
  const strengthColor = strengthColors[strength.level] || '#E5E7EB';

  return (
    <div className="cnp-container">
      {toast.show && (
        <div className="cnp-toast">
          <div className="cnp-toast-icon">
            <img src={warningImg} alt="warning" style={{ width: 45, height: 45 }} />
          </div>
          <div className="cnp-toast-body">
            <p className="cnp-toast-title">{toast.title}</p>
            <p className="cnp-toast-message">{toast.message}</p>
          </div>
          <button className="cnp-toast-close" onClick={() => setToast((prev) => ({ ...prev, show: false }))}>×</button>
        </div>
      )}

      <div className="cnp-background">
        <img
          src={backgroundImg}
          alt=""
          className="cnp-background-image"
        />
      </div>

      <div className="cnp-content">
        <div className="cnp-left-section">
          <img
            src={logoImg}
            alt="EDABIP"
            className="cnp-brand-logo"
          />
          <div className='cnp-heading-group'>

          <h1 className="cnp-welcome-heading">
            Welcome to your Analytics Dashboard
          </h1>

          <p className="cnp-welcome-description">
            Track performance, analyze data, and make smarter business decisions in real-time.
          </p>
          </div>

          <div className="cnp-features-container">
            {FEATURES.map((feature) => (
              <div
                key={feature.alt}
                className="cnp-feature-item"
              >
                <img
                  src={feature.src}
                  alt={feature.alt}
                  className="cnp-feature-badge"
                />
                <span className="cnp-feature-label">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="cnp-right-section">
          <div className={`cnp-card${password ? ' cnp-card--filled' : ' cnp-card--empty'}`}>
            <CardLogo />

            <h2 className="cnp-title">
              Create Your New Password
            </h2>

            <p className="cnp-subtitle">
              Enter a new password to secure your account
            </p>

            <form
              onSubmit={handleSubmit}
              className="cnp-form"
            >
              <div className="cnp-form-group">
                <label htmlFor="cnp-password">
                  New Password
                </label>

                <div className="cnp-input-wrapper">
                  <span className="cnp-input-icon">
                    <LockIcon />
                  </span>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="cnp-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // if (passwordError) setPasswordError('');
                    }}
                    placeholder="Enter your password"
                    // aria-invalid={Boolean(passwordError)}
                    autoFocus
                    required
                  />

                  <button
                    type="button"
                    className={`cnp-password-toggle${password && strength.level !== 'Strong' ? ' cnp-password-toggle--has-warning' : ''}`}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <PasswordToggleIcon visible={showPassword} />
                  </button>
                  {password && strength.level !== 'Strong' && (
                    <span className="cnp-warning-icon">
                      <img src={warningFieldImg} alt="weak password" style={{ width: 15, height: 15 }} />
                    </span>
                  )}
                </div>

                <div className="cnp-password-meta" style={{ visibility: password ? 'visible' : 'hidden' }}>
                    <div className="cnp-strength-row">
                      <div className="cnp-strength-bar">
                        {[1, 2, 3, 4, 5].map((seg) => (
                          <div
                            key={seg}
                            className="cnp-strength-segment"
                            style={{ background: seg <= strength.score ? strengthColor : 'rgba(255,255,255,0.12)' }}
                          />
                        ))}
                      </div>
                      {strength.level && (
                        <span className="cnp-strength-label" style={{ color: strengthColor }}>
                          {strength.level}
                        </span>
                      )}
                    </div>

                    <div className="cnp-requirements">
                      {[
                        { key: 'minLength', label: '8+ Characters' },
                        { key: 'number',    label: 'Numbers' },
                        { key: 'uppercase', label: 'Uppercase Letter' },
                        { key: 'special',   label: 'Special character' },
                        { key: 'lowercase', label: 'Lowercase Letter' },
                      ].map(({ key, label }) => (
                        <div key={key} className="cnp-requirement-item">
                          {strength.rules[key] ? <CheckIcon /> : <CrossIcon />}
                          <span className={strength.rules[key] ? 'cnp-req-met' : 'cnp-req-unmet'}>{label}</span>
                        </div>
                      ))}
                    </div>
                </div>

                {/* {passwordError && (
                  <p className="cnp-field-error">
                    {passwordError}
                  </p>
                )} */}
              </div>

              <div className="cnp-form-group">
                <label htmlFor="cnp-confirm-password">
                  Confirm Password
                </label>

                <div className="cnp-input-wrapper cnp-input-wrapper--confirm">
                  <span className="cnp-input-icon">
                    <LockIcon />
                  </span>

                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="cnp-confirm-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError('');
                    }}
                    placeholder="Confirm your password"
                    aria-invalid={Boolean(confirmPasswordError)}
                    required
                  />

                  <button
                    type="button"
                    className="cnp-password-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    <PasswordToggleIcon visible={showConfirmPassword} />
                  </button>
                </div>

                {confirmPasswordError && (
                  <p className="cnp-field-error">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="cnp-submit-btn"
              >
                Submit
              </button>
            </form>

            <div className='cnp-support-group'>
            <p className="cnp-support-text">
              Need help?{' '}
              <span className="cnp-support-link">
                Contact Support
              </span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPasswordForm;