import { useEffect, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../../assets/login/background.png';
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import './ForgotPasswordForm.css';

const FEATURES = [
  {
    src: featureAnalytics,
    alt: "Real-Time Analytics",
    label: "Real-Time Analytics",
  },
  {
    src: featureAi,
    alt: "AI-Powered Insights",
    label: "AI-Powered Insights",
  },
  {
    src: featureSecurity,
    alt: "Enterprise Security",
    label: "Enterprise Security",
  },
  {
    src: featureScalable,
    alt: "Scalable Platform",
    label: "Scalable Platform",
  },
];

const INDIA_MOBILE_REGEX = /^[6-9]\d{9}$/;
const RESEND_SECONDS = 30;

function CardLogo() {
  return (
    <div className="fp-card-logo">
      <img src={logoImgc} alt="" className="fp-card-logo-icon" />
      <span className="fp-card-logo-text">EDABIP</span>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
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
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
      <path
        d="M9 5h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />

      <path
        d="M8 12.5l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneHandsetIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />

      <path
        d="M12 8h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M12 12v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');
  const [step, setStep] = useState('request'); // 'request' | 'verify'

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendSeconds, setResendSeconds] = useState(0);

  const [toast, setToast] = useState(null);

  const otpInputRefs = useRef([]);

  const destination = method === "email" ? email : `+91 ${mobile}`;

  useEffect(() => {
    if (step !== "verify" || resendSeconds <= 0) return undefined;

    const timer = setTimeout(() => {
      setResendSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, resendSeconds]);

  const selectMethod = (next) => {
    setMethod(next);
    setStep("request");
    setOtp("");
    setOtpError("");
    setMobileError("");
    setToast(null);
  };

  const handleMobileChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
    if (mobileError) setMobileError("");
  };

  const handleOtpChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(digits);
    if (otpError) setOtpError("");
  };

  const handleOtpBoxChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const chars = otp.padEnd(4, ' ').split('');
    chars[index] = val || ' ';
    const newOtp = chars.join('').trimEnd();
    setOtp(newOtp);
    if (otpError) setOtpError('');
    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBoxKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
      const chars = otp.padEnd(4, ' ').split('');
      chars[index] = ' ';
      setOtp(chars.join('').trimEnd());
    }
    if (e.key === 'ArrowLeft' && index > 0) otpInputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 3) otpInputRefs.current[index + 1]?.focus();
  };

  const sendOtp = () => {
    console.log("OTP requested via", method, destination);

    setOtp("");
    setOtpError("");
    setStep("verify");
    setResendSeconds(RESEND_SECONDS);
    setToast({
      title: 'OTP Send Successfully !',
      message: 'A 4-digit OTP has been send to',
      destination,
    });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (method === "mobile" && !INDIA_MOBILE_REGEX.test(mobile)) {
      setMobileError("Enter a valid 10-digit Indian mobile number");
      return;
    }

    sendOtp();
  };

  const handleResendOtp = () => {
    if (resendSeconds > 0) return;

    console.log("Resending OTP via", method, destination);

    setOtp("");
    setOtpError("");
    setResendSeconds(RESEND_SECONDS);
    setToast({
      title: 'OTP Resent Successfully !',
      message: 'A new 4-digit OTP has been send to',
      destination,
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setOtpError("Enter the 4-digit OTP sent to you");
      return;
    }

    console.log("Verifying OTP", otp, "for", destination);

    setToast(null);
    navigate('/create-new-password', {
      state: {
        otpVerified: true,
        destination,
        method,
      },
    });
  };

  const handleChangeDestination = () => {
    setStep("request");
    setOtp("");
    setOtpError("");
    setToast(null);
  };

  return (
    <div className="fp-container">
      <div className="fp-background">
        <img src={backgroundImg} alt="" className="fp-background-image" />
      </div>

      <div className="fp-content">
        <div className="fp-left-section">
          <img src={logoImg} alt="EDABIP" className="fp-brand-logo" />

          <h1 className="fp-welcome-heading">
            Welcome to your Analytics Dashboard
          </h1>

          <p className="fp-welcome-description">
            Track performance, analyze data, and make smarter business decisions
            in real-time.
          </p>

          <div className="fp-features-container">
            {FEATURES.map((feature) => (
              <div key={feature.alt} className="fp-feature-item">
                <img
                  src={feature.src}
                  alt={feature.alt}
                  className="fp-feature-badge"
                />

                <span className="fp-feature-label">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fp-right-section">
          <div className="fp-card-wrapper">
            {toast && (
              <div className="fp-toast" role="status">
                <span className="fp-toast-icon">
                  <CheckCircleIcon size={16} />
                </span>

                <div className="fp-toast-content">
                  <p className="fp-toast-title">{toast.title}</p>

                  <p className="fp-toast-message">
                    {toast.message}
                    {toast.destination && (
                      <>
                        <br />
                        <strong className="fp-toast-destination">{toast.destination}</strong>
                      </>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  className="fp-toast-close"
                  aria-label="Dismiss notification"
                  onClick={() => setToast(null)}
                >
                  <CloseIcon />
                </button>
              </div>
            )}

          <div className="fp-card">
            <CardLogo />

            <a href="/" className="fp-back-link">
              <ArrowLeftIcon />
              Back to Sign in
            </a>

            {step === "request" && (
              <>
                <h2 className="fp-title">Forgot password</h2>

                <p className="fp-subtitle">
                  Choose how you&apos;d like to receive your reset instructions
                </p>

                <div className="fp-method-toggle" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={method === "email"}
                    className={`fp-method-btn ${method === "email" ? "active" : ""}`}
                    onClick={() => selectMethod("email")}
                  >
                    <MailIcon />
                    Reset via Email
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={method === "mobile"}
                    className={`fp-method-btn ${method === "mobile" ? "active" : ""}`}
                    onClick={() => selectMethod("mobile")}
                  >
                    <PhoneIcon />
                    Reset via Mobile
                  </button>
                </div>

                <form onSubmit={handleSendOtp} className="fp-form">
                  {method === "email" ? (
                    <div className="fp-form-group">
                      <label htmlFor="fp-email">Email</label>

                      <div className="fp-input-wrapper">
                        <span className="fp-input-icon">
                          <MailIcon />
                        </span>

                        <input
                          type="email"
                          id="fp-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div className="fp-helper-row">
                        <span className="fp-helper-icon">
                          <InfoIcon />
                        </span>
                        <p className="fp-helper-text">
                          We&apos;ll send a secure reset link to this address.
                          It will expire in 30 minutes.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="fp-form-group">
                      <label htmlFor="fp-mobile">Mobile Number</label>

                      <div className="fp-input-wrapper fp-input-wrapper--phone">
                        <span className="fp-input-icon">
                          <PhoneHandsetIcon />
                        </span>

                        <span className="fp-mobile-prefix">+91</span>

                        <input
                          type="tel"
                          inputMode="numeric"
                          id="fp-mobile"
                          value={mobile}
                          onChange={handleMobileChange}
                          placeholder="98765 43210"
                          maxLength={10}
                          aria-invalid={Boolean(mobileError)}
                          required
                        />
                      </div>

                      {mobileError ? (
                        <p className="fp-field-error">{mobileError}</p>
                      ) : (
                        <div className="fp-helper-row">
                          <span className="fp-helper-icon">
                            <InfoIcon />
                          </span>
                          <p className="fp-helper-text">
                            We&apos;ll send a secure reset link to this address.
                            It will expire in 30 minutes.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <button type="submit" className="fp-submit-btn">
                    Send OTP
                  </button>
                </form>

                <p className="fp-support-text">
                  Need help ?{" "}
                  <span className="cnp-support-link">
                Contact Support
              </span>
                </p>
              </>
            )}

            {step === "verify" && (
              <>
                <h2 className="fp-title">Enter Verification Code</h2>

                <p className="fp-subtitle">
                  A 4-digit code was sent to{' '}
                  <strong className="fp-subtitle-dest">{destination}</strong>
                </p>

                <form onSubmit={handleVerifyOtp} className="fp-form">
                  <div className="fp-otp-boxes">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(el) => { otpInputRefs.current[index] = el; }}
                        type="tel"
                        inputMode="numeric"
                        className="fp-otp-box"
                        value={otp[index] && otp[index] !== ' ' ? otp[index] : ''}
                        onChange={(e) => handleOtpBoxChange(index, e)}
                        onKeyDown={(e) => handleOtpBoxKeyDown(index, e)}
                        maxLength={1}
                        autoFocus={index === 0}
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="fp-field-error fp-field-error--center">
                      {otpError}
                    </p>
                  )}

                  <div className="fp-resend-row">
                    <span>Didn&apos;t received it ?</span>

                    <button
                      type="button"
                      className="fp-resend-btn"
                      onClick={handleResendOtp}
                      disabled={resendSeconds > 0}
                    >
                      {resendSeconds > 0
                        ? `Resend in 0:${String(resendSeconds).padStart(2, "0")}`
                        : "Resend OTP"}
                    </button>
                  </div>

                  <button type="submit" className="fp-submit-btn">
                    Confirm OTP
                  </button>
                </form>

                <p className="fp-support-text">
                  Need help ?{" "}
                  <span
                    className="fp-support-link fp-support-link--disabled"
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    Contact Support
                  </span>
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ForgotPasswordForm;