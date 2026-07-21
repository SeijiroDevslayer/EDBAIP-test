import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../../assets/login/background.jpg';
import logoImg from '../../../assets/login/logo.png';
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
import EyeIcon from '../../../assets/login/eye-off.svg';
import VerifiedIcon from '../../../assets/login/tick.png';
import MailVerificationIcon from '../../../assets/login/mail-verify.svg';
import PhoneVerificationIcon from '../../../assets/login/phone-verify.svg';
import SSOButton from './SSOButton.jsx';
import { useAuthContext } from '../../../context/AuthContext.jsx';
import './SignupForm.css';


const readBooleanEnv = (value) =>
  String(value ?? '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .toLowerCase() === 'true';

    
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

// Single OTP endpoint shape shared by email + mobile, distinguished by "channel".
const SEND_OTP_ENDPOINT =
  import.meta.env.VITE_SEND_OTP_ENDPOINT ?? '/api/auth/signup/send-otp';

const VERIFY_OTP_ENDPOINT =
  import.meta.env.VITE_VERIFY_OTP_ENDPOINT ?? '/api/auth/signup/verify-otp';

const MOCK_OTP = '1234';

// const IS_MOCK_VERIFICATION_ENABLED =
//   String(
//     import.meta.env.VITE_ENABLE_MOCK_SIGNUP_OTP ??
//       import.meta.env.VITE_ENABLE_MOCK_EMAIL_VERIFICATION ??
//       'true',
//   ).toLowerCase() === 'true';
const CURRENT_HOSTNAME =
  typeof window !== 'undefined' ? window.location.hostname : '';

const IS_TEST_DEPLOYMENT =
  CURRENT_HOSTNAME === 'localhost' ||
  CURRENT_HOSTNAME === '127.0.0.1' ||
  CURRENT_HOSTNAME.endsWith('.vercel.app');

const IS_MOCK_VERIFICATION_ENABLED =
  readBooleanEnv(import.meta.env.VITE_ENABLE_MOCK_SIGNUP_OTP) ||
  readBooleanEnv(import.meta.env.VITE_ENABLE_MOCK_EMAIL_VERIFICATION) ||
  IS_TEST_DEPLOYMENT;

const RESEND_COOLDOWN_SECONDS = 120;
const OTP_LENGTH = 4;

const formatOtpTimer = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const formatOtpDestination = (channel, destination) => {
  if (channel === 'email') return destination;

  const compactDestination = destination.replace(/[\s-]/g, '');

  if (compactDestination.startsWith('+91')) {
    return `+91 ${compactDestination.slice(3)}`;
  }

  if (compactDestination.startsWith('91') && compactDestination.length > 10) {
    return `+91 ${compactDestination.slice(2)}`;
  }

  return `+91 ${compactDestination}`;
};

const validateFullName = (value) => value.trim().length >= 2;
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validateMobileNumber = (value) => {
  const compactValue = value.replace(/[\s-]/g, '');
  return /^(\+91|91)?[6-9]\d{9}$/.test(compactValue);
};
const validatePassword = (value) => value.length >= 8;
const validateConfirmPassword = (password, confirmation) =>
  confirmation.length > 0 && password === confirmation;

const createIdleVerification = () => ({
  status: 'idle', // idle | sending | code-sent | verifying | verified | error
  verifiedValue: '',
  message: '',
});

function OtpSecurityIllustration({ channel }) {
  const isEmail = channel === 'email';

  return (
    <div className="su-otp-illustration" aria-hidden="true">
      <img
        src={isEmail ? MailVerificationIcon : PhoneVerificationIcon}
        alt=""
        className="su-otp-illustration-image"
      />
    </div>
  );
}

function OtpModal({
  channel,
  destination,
  otp,
  sendStatus,
  verifyStatus,
  errorMessage,
  resendSeconds,
  onDigitChange,
  onDigitKeyDown,
  onDigitPaste,
  onVerify,
  onResend,
  onClose,
  inputRefs,
}) {
  const isVerifying = verifyStatus === 'verifying';
  const canVerify = otp.every((digit) => digit !== '') && !isVerifying;
  const formattedDestination = formatOtpDestination(channel, destination);

  const handleOverlayClick = (event) => {
    if (!isVerifying && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="su-modal-overlay" role="presentation" onClick={handleOverlayClick}>
      <div
  className="su-otp-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="su-otp-modal-title"
  onClick={(event) => event.stopPropagation()}
>
  <button
    type="button"
    className="su-otp-modal-close"
    onClick={onClose}
    disabled={isVerifying}
    aria-label="Close verification dialog"
  >
    <svg
      className="su-otp-modal-close-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </button>

  <div className="su-otp-modal-content">
    <OtpSecurityIllustration channel={channel} />

    <div className="su-otp-copy">
      <h2 id="su-otp-modal-title" className="su-otp-modal-title">
        {channel === 'email'
          ? 'Verify Your Email'
          : 'Verify Your Mobile Number'}
      </h2>

      <p className="su-otp-modal-message">
        We have sent {OTP_LENGTH}-digit verification code
      </p>

      <p className="su-otp-modal-destination">
        <span>to </span>
        <strong>{formattedDestination}</strong>
      </p>
    </div>

    <div className="su-otp-input-section">
      <div className="su-otp-boxes" onPaste={onDigitPaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            readOnly={isVerifying}
            onChange={(event) =>
              onDigitChange(index, event.target.value)
            }
            onKeyDown={(event) => {
              onDigitKeyDown(index, event);

              if (
                event.key === 'Enter' &&
                index === OTP_LENGTH - 1 &&
                canVerify
              ) {
                event.preventDefault();
                onVerify();
              }
            }}
            className={`su-otp-box ${
              digit ? 'su-otp-box--filled' : ''
            } ${errorMessage ? 'su-otp-box-error' : ''}`}
            aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
            aria-invalid={Boolean(errorMessage)}
          />
        ))}
      </div>

      <p
        className="su-otp-error"
        role={errorMessage ? 'alert' : undefined}
        aria-live="polite"
      >
        {errorMessage || '\u00A0'}
      </p>

      <div className="su-otp-meta-row">
        <span className="su-otp-resend-label">Resend OTP</span>

        <span className="su-otp-timer">
          <svg
            className="su-otp-timer-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M21 12A9 9 0 1 1 18.36 5.64"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M18 2.75V6H21.25"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="su-otp-timer-value">
            {formatOtpTimer(resendSeconds)}
          </span>
        </span>
      </div>
    </div>

    <div className="su-otp-actions">
      <button
        type="button"
        className="su-otp-verify-btn"
        onClick={onVerify}
        disabled={!canVerify}
      >
        {isVerifying ? 'Verifying...' : 'Verify & Continue'}
      </button>

      <button
        type="button"
        className="su-otp-resend-btn"
        onClick={onResend}
        disabled={
          resendSeconds > 0 ||
          sendStatus === 'sending'
        }
      >
        {sendStatus === 'sending'
          ? 'Sending...'
          : 'Resend OTP'}
      </button>
    </div>
  </div>
</div>
    </div>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();

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

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCreateErrorNotice, setShowCreateErrorNotice] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState(
    'Please fix the errors below and try again',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Per-channel verification state — same shape reused for email + mobile.
  const [emailVerification, setEmailVerification] = useState(createIdleVerification);
  const [mobileVerification, setMobileVerification] = useState(createIdleVerification);

  // OTP modal state — one modal, reused for whichever channel is active.
  const [activeOtpChannel, setActiveOtpChannel] = useState(null); // 'email' | 'mobile' | null
  const [otpDestination, setOtpDestination] = useState('');
  const [otpDigits, setOtpDigits] = useState(() => Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [otpVerifyStatus, setOtpVerifyStatus] = useState('idle'); // idle | verifying
  const [resendSeconds, setResendSeconds] = useState(0);
  const otpInputRefs = useRef([]);

  const normalizedEmail = useMemo(
    () => formData.email.trim().toLowerCase(),
    [formData.email],
  );
  const normalizedMobile = useMemo(
    () => formData.mobileNumber.trim(),
    [formData.mobileNumber],
  );

  const isEmailVerified =
    emailVerification.status === 'verified' &&
    emailVerification.verifiedValue === normalizedEmail;
  const isMobileVerified =
    mobileVerification.status === 'verified' &&
    mobileVerification.verifiedValue === normalizedMobile;

  const canCreateAccount =
    isEmailVerified && isMobileVerified && formData.agreeToTerms && !isSubmitting;

  const resetVerification = useCallback((channel) => {
    if (channel === 'email') {
      setEmailVerification(createIdleVerification());
    } else {
      setMobileVerification(createIdleVerification());
    }
  }, []);

  // Countdown for the resend button inside the OTP modal.
  useEffect(() => {
    if (resendSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    if (
      name === 'email' &&
      emailVerification.status === 'verified' &&
      value.trim().toLowerCase() !== emailVerification.verifiedValue
    ) {
      resetVerification('email');
    }
    if (
      name === 'mobileNumber' &&
      mobileVerification.status === 'verified' &&
      value.trim() !== mobileVerification.verifiedValue
    ) {
      resetVerification('mobile');
    }

    setFormData((previous) => ({ ...previous, [name]: nextValue }));

    if (submitted) {
      setErrors((previous) => ({ ...previous, [name]: '' }));
    }

    setShowCreateErrorNotice(false);
  };

  const getErrors = (data) => {
    const nextErrors = {};

    nextErrors.fullName =
      !data.fullName.trim() || !validateFullName(data.fullName)
        ? 'Please enter a valid full name'
        : '';

    nextErrors.email =
      !data.email.trim() || !validateEmail(data.email)
        ? 'Please enter a valid email address'
        : !isEmailVerified
          ? 'Verify this email address before creating your account'
          : '';

    if (!data.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobileNumber(data.mobileNumber)) {
      const digits = data.mobileNumber
        .replace(/[\s\-+]/g, '')
        .replace(/^91/, '');

      nextErrors.mobileNumber =
        digits.length !== 10
          ? 'Mobile number must be 10 digits'
          : 'Please enter a valid Indian mobile number';
    } else if (!isMobileVerified) {
      nextErrors.mobileNumber = 'Verify this mobile number before creating your account';
    } else {
      nextErrors.mobileNumber = '';
    }

    nextErrors.password =
      !data.password || !validatePassword(data.password)
        ? 'Password must be at least 8 characters'
        : '';

    nextErrors.confirmPassword =
      !data.confirmPassword ||
      !validateConfirmPassword(data.password, data.confirmPassword)
        ? 'Passwords do not match'
        : '';

    nextErrors.agreeToTerms = data.agreeToTerms
      ? ''
      : 'You must agree to Terms & Conditions';

    return nextErrors;
  };

  // ---- OTP send / verify -----------------------------------------------

  const destinationFor = useCallback(
    (channel) => (channel === 'email' ? normalizedEmail : normalizedMobile),
    [normalizedEmail, normalizedMobile],
  );

  const isChannelValid = useCallback(
    (channel) =>
      channel === 'email' ? validateEmail(normalizedEmail) : validateMobileNumber(normalizedMobile),
    [normalizedEmail, normalizedMobile],
  );

  const setVerification = useCallback((channel, updater) => {
    const setter = channel === 'email' ? setEmailVerification : setMobileVerification;
    setter((previous) => ({ ...previous, ...updater }));
  }, []);

  const requestOtp = useCallback(
    async (channel) => {
      if (!isChannelValid(channel)) {
        setErrors((previous) => ({
          ...previous,
          [channel === 'email' ? 'email' : 'mobileNumber']:
            channel === 'email'
              ? 'Enter a valid email address before requesting a code'
              : 'Enter a valid mobile number before requesting a code',
        }));
        return;
      }

      const destination = destinationFor(channel);

      setErrors((previous) => ({
        ...previous,
        [channel === 'email' ? 'email' : 'mobileNumber']: '',
      }));
      setVerification(channel, { status: 'sending', message: '' });
      setOtpError('');

      try {
        if (IS_MOCK_VERIFICATION_ENABLED) {
            // Simulate the delay of a real send-OTP API request.
            await new Promise((resolve) => window.setTimeout(resolve, 600));
            console.info(
              `[Mock signup OTP] ${channel} verification code for ${destination}: ${MOCK_OTP}`,
            );
          } else {
          const response = await fetch(SEND_OTP_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ channel, destination }),
          });

          const result = await response.json().catch(() => ({}));

          if (!response.ok) {
            throw new Error(result.message ?? 'Unable to send the verification code.');
          }
        }

        setVerification(channel, { status: 'code-sent', message: '' });
        setResendSeconds(RESEND_COOLDOWN_SECONDS);
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        setOtpDestination(destination);
        setActiveOtpChannel(channel);
        window.requestAnimationFrame(() => {
          otpInputRefs.current[0]?.focus();
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to send the verification code.';

        setVerification(channel, {
          status: 'error',
          message,
        });

        if (activeOtpChannel === channel) {
          setOtpError(message);
        } else {
          setErrors((previous) => ({
            ...previous,
            [channel === 'email' ? 'email' : 'mobileNumber']: message,
          }));
        }
      }
    },
    [activeOtpChannel, destinationFor, isChannelValid, setVerification],
  );

  const closeOtpModal = useCallback(() => {
    setActiveOtpChannel(null);
    setOtpDestination('');
    setOtpError('');
    setOtpVerifyStatus('idle');
  }, []);

  useEffect(() => {
    if (!activeOtpChannel) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => {
      otpInputRefs.current[0]?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeOtpChannel]);

  useEffect(() => {
    if (!activeOtpChannel) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && otpVerifyStatus !== 'verifying') {
        closeOtpModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOtpChannel, closeOtpModal, otpVerifyStatus]);

  const handleOtpDigitChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, '').slice(-1);

    setOtpDigits((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
    setOtpError('');

    if (value && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpDigitKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    event.preventDefault();
    setOtpError('');
    setOtpDigits(() => {
      const next = Array(OTP_LENGTH).fill('');
      pasted.split('').forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });

    const nextFocusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpInputRefs.current[nextFocusIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const channel = activeOtpChannel;
    if (!channel) return;

    const code = otpDigits.join('');
    const destination = otpDestination || destinationFor(channel);
    if (code.length !== OTP_LENGTH) {
      setOtpError(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }

    setOtpVerifyStatus('verifying');
    setOtpError('');

    try {
      if (IS_MOCK_VERIFICATION_ENABLED) {
          // Simulate the delay of a real verify-OTP API request.
          await new Promise((resolve) => window.setTimeout(resolve, 500));

          if (code !== MOCK_OTP) {
            throw new Error(
              `The verification code is incorrect. Use ${MOCK_OTP} in mock mode.`,
            );
          }
        } else {
        const response = await fetch(VERIFY_OTP_ENDPOINT, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            channel,
            destination,
            code,
          }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.verified !== true) {
          throw new Error(result.message ?? 'That code didn\u2019t match. Try again.');
        }
      }

      setVerification(channel, {
        status: 'verified',
        verifiedValue: destination,
        message: '',
      });
      setOtpVerifyStatus('idle');
      closeOtpModal();
    } catch (error) {
      setOtpVerifyStatus('idle');
      setOtpError(
        error instanceof Error ? error.message : 'That code didn\u2019t match. Try again.',
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    const newErrors = getErrors(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setCreateErrorMessage(
        !isEmailVerified || !isMobileVerified
          ? 'Verify your email and mobile number before creating the account.'
          : 'Please fix the errors below and try again.',
      );
      setShowCreateErrorNotice(true);
      return;
    }

    setShowCreateErrorNotice(false);
    setIsSubmitting(true);

    try {
      const result = await signup({
        fullName: formData.fullName.trim(),
        email: normalizedEmail,
        mobileNumber: formData.mobileNumber.trim(),
        password: formData.password,
      });

      if (!result.success) {
        if (result.error?.field === 'email') {
          setErrors((previous) => ({
            ...previous,
            email: result.error.message,
          }));
        }

        setCreateErrorMessage(
          result.error?.message ?? 'Unable to create your account. Please try again.',
        );
        setShowCreateErrorNotice(true);
        return;
      }

      navigate('/login', {
        replace: true,
        state: {
          signupSuccess: true,
          email: result.data.user.email,
        },
      });
    } catch {
      setCreateErrorMessage('Unable to create your account. Please try again.');
      setShowCreateErrorNotice(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1 12.5C2.73 8.11 7 5 12 5s9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.89 1 12.5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const renderVerifyButton = (channel, isVerified) => {
    const verification = channel === 'email' ? emailVerification : mobileVerification;

    if (isVerified) {
      return (
        <span className="su-verified-pill">
          <img src={VerifiedIcon} alt="" className="su-verified-pill-icon" />
          Verified
        </span>
      );
    }

    return (
      <button
        type="button"
        className="su-verify-btn"
        onClick={() => requestOtp(channel)}
        disabled={verification.status === 'sending'}
      >
        {verification.status === 'sending' ? 'Sending...' : 'Verify'}
      </button>
    );
  };

  return (
    <div className="su-container">
      <div className="su-background" aria-hidden="true">
        <img src={backgroundImg} alt="" className="su-background-image" />
      </div>

      {showCreateErrorNotice && (
        <div className="su-error-notification" role="alert">
          <div className="su-error-icon" aria-hidden="true">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L22 20H2L12 3Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 9V13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1" fill="white" />
            </svg>
          </div>

          <div className="su-error-message">
            <h4>Unable to create account</h4>
            <p>{createErrorMessage}</p>
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

      <main className="su-content">
        <section className="su-left" aria-label="EDABIP benefits">
          <img src={logoImg} alt="EDABIP" className="su-brand-logo" />

          <h1 className="su-heading">Create your Account</h1>
          <p className="su-subheading">
            Start your analytics journey
            <br />
            with <strong>EDABIP</strong>
          </p>

          <div className="su-features">
            {FEATURES.map((feature) => (
              <div key={feature.alt} className="su-feature-item">
                <img src={feature.src} alt="" className="su-feature-icon" aria-hidden="true" />
                <div className="su-feature-text">
                  <span className="su-feature-title">{feature.title}</span>
                  <span className="su-feature-desc">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="su-right">
          <div className="su-card">
            <h2 className="su-card-title">Create your Account</h2>
            <p className="su-card-subtitle">
              Start your analytics journey with <strong>EDABIP</strong>
            </p>

            <form onSubmit={handleSubmit} className="su-form" noValidate>
              <div className="su-form-group">
                <label htmlFor="su-fullName">Full Name</label>
                <div className="su-input-wrapper">
                  <img src={usericon} alt="" className="su-input-icon" />
                  <input
                    type="text"
                    id="su-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    maxLength={80}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                </div>
                <span className="su-field-error">{errors.fullName}</span>
              </div>

              <div className="su-form-group">
                <label htmlFor="su-email">Email ID</label>
                <div
                  className={`su-input-wrapper su-input-wrapper--with-action ${
                    isEmailVerified ? 'su-input-wrapper--verified' : ''
                  }`}
                >
                  <img src={emailicon} alt="" className="su-input-icon" />
                  <input
                    type="email"
                    id="su-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    readOnly={isEmailVerified}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {renderVerifyButton('email', isEmailVerified)}
                </div>
                <span className="su-field-error">{errors.email}</span>
              </div>

              <div className="su-form-group">
                <label htmlFor="su-mobileNumber">Mobile Number</label>
                <div
                  className={`su-input-wrapper su-input-wrapper--with-action ${
                    isMobileVerified ? 'su-input-wrapper--verified' : ''
                  }`}
                >
                  <img src={phoneicon} alt="" className="su-input-icon" />
                  <input
                    type="tel"
                    id="su-mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel-national"
                    className="su-mobile-input"
                    readOnly={isMobileVerified}
                    aria-invalid={Boolean(errors.mobileNumber)}
                  />
                  {renderVerifyButton('mobile', isMobileVerified)}
                </div>
                <span className="su-field-error">{errors.mobileNumber}</span>
              </div>

              <div className="su-form-row">
                <div className="su-form-group">
                  <label htmlFor="su-password">Password</label>
                  <div className="su-input-wrapper">
                    <img src={lockicon} alt="" className="su-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="su-password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      aria-invalid={Boolean(errors.password)}
                    />
                    <button
                      type="button"
                      className="su-pw-toggle"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOpen />
                      ) : (
                        <img src={EyeIcon} alt="" width="18" height="18" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <span className="su-field-error">{errors.password}</span>
                </div>

                <div className="su-form-group">
                  <label htmlFor="su-confirmPassword">Confirm Password</label>
                  <div className="su-input-wrapper">
                    <img src={lockicon} alt="" className="su-input-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="su-confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      aria-invalid={Boolean(errors.confirmPassword)}
                    />
                    <button
                      type="button"
                      className="su-pw-toggle"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      aria-label={
                        showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOpen />
                      ) : (
                        <img src={EyeIcon} alt="" width="18" height="18" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <span className="su-field-error">{errors.confirmPassword}</span>
                </div>
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
                    <a
                      href="/terms"
                      className="su-terms-link"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Terms &amp; Conditions
                    </a>
                  </span>
                </label>
                <span className="su-field-error">{errors.agreeToTerms}</span>
              </div>

              <button
                type="submit"
                className="su-submit-btn"
                disabled={!canCreateAccount}
                aria-busy={isSubmitting}
                title={
                  !isEmailVerified || !isMobileVerified
                    ? 'Verify your email and mobile number to enable account creation'
                    : undefined
                }
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="su-divider">
              <span>OR</span>
            </div>

            <SSOButton
              provider="google"
              className="su-sso-btn"
              icon={<img src={googleicon} alt="" className="su-sso-icon" />}
            />

            <p className="su-signin-text">
              Already have an account?{' '}
              <a href="/login" className="su-signin-link">
                Login
              </a>
            </p>
          </div>
        </section>
      </main>

      {activeOtpChannel && (
        <OtpModal
          channel={activeOtpChannel}
          destination={otpDestination || destinationFor(activeOtpChannel)}
          otp={otpDigits}
          sendStatus={
            activeOtpChannel === 'email' ? emailVerification.status : mobileVerification.status
          }
          verifyStatus={otpVerifyStatus}
          errorMessage={otpError}
          resendSeconds={resendSeconds}
          onDigitChange={handleOtpDigitChange}
          onDigitKeyDown={handleOtpDigitKeyDown}
          onDigitPaste={handleOtpPaste}
          onVerify={handleVerifyOtp}
          onResend={() => requestOtp(activeOtpChannel)}
          onClose={closeOtpModal}
          inputRefs={otpInputRefs}
        />
      )}
    </div>
  );
}

export default SignupForm;
