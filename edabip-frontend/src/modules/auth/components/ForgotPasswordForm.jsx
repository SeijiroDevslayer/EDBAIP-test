import { useEffect, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../../assets/login/background.png';
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import checkCircle from '../../../assets/login/checkcircle.png';
import triangleIcon from '../../../assets/login/triangleicon.png';
import mailIcon from "../../../assets/login/mail.svg";
import mobileIcon from "../../../assets/login/mobile.svg";
import backIcon from "../../../assets/login/back.png";
import mailIconm from "../../../assets/login/mailm.svg";
import tickIcon from "../../../assets/login/tick.png";
import closeIcon from "../../../assets/login/close.png";
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import { verifyEmail } from "../api/mockForgotPasswordApi";
import { verifyMobile } from "../api/mockForgetPasswordMobile";
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
    <div>
      <img src={mailIcon} alt="" className="fp-mail-icon" />
    </div>
  );
}

function PhoneIcon() {
  return (
    <div>
      <img src={mobileIcon} alt="" className="fp-mobile-icon"/>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <div>
      <img src={backIcon} alt="" className="fp-back-icon"/>
    </div>
  );
}

function CheckCircleIcons({ size = 14 }) {
  return (
    <div>
      <img src={checkCircle} alt="" className="fp-check-circle" />
    </div>
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
function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <div>
      <img src={closeIcon} alt="" className="fp-close-icon" />
    </div>
  );
}

function ErrorTriangleIcon() {
  return (
    <div className = "erroricon" >
      <img src={triangleIcon} alt="" className="fp-error-triangle-icon" />
    </div>
  );
}
function MailIconm() {
  return (
    <div className = "erroricon" >
      <img src={mailIconm} alt="" className="fp-mail-m-icon" />
    </div>
  );
}
  function CheckCircleIcontick() {
  return (
    <div >
      <img src={mailIconm} alt="" className="fp-mail-tick-icon" />
    </div>
  );
}
function ForgotPasswordForm() {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState("request");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
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

useEffect(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, []);


  const selectMethod = (next) => {
    setMethod(next);
    setStep("request");
    setOtp("");
    setOtpError("");
    setEmailError("");
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
      type: 'success',
      title: 'OTP Send Successfully !',
      message: 'A 4-digit OTP has been send to',
      destination,
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (method === "mobile") {
      if (!INDIA_MOBILE_REGEX.test(mobile)) {
        setMobileError("Enter a valid 10-digit Indian mobile number");
        return;
      }

      try {
        const res = await verifyMobile(mobile);
        if (!res || res.success === false) {
          setMobileError("We couldn't find an account with this number");
          setToast({
            type: "error",
            title: "Mobile Number Not Found",
            message: res?.message || "No account is associated with this mobile number.",
          });
          return;
        }
        setMobileError("");
      } catch (err) {
        setToast({
          type: "error",
          title: "Error",
          message: err?.message || "Something went wrong",
        });
        return;
      }
    }

    try {
      if (method === "email") {
        await verifyEmail(email);
      }
      setEmailError("");
      sendOtp();
    } catch (err) {
      setEmailError("We couldn't find an account with this email address.");
        setToast({
          type: 'error',
          title: err.title || "Error",
          message: err.message || "Something went wrong",
        });
    }
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

    setToast({
      title: 'OTP Verified Successfully !',
      message: 'You can now create a new password for your account.',
    });

    setTimeout(() => {
    navigate('/create-new-password', {
      state: { otpVerified: true, destination, method },
    });
  }, 1500);
}

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
              <div
                className={`fp-toast ${toast?.type === 'error' ? 'fp-toast-error' : ''}`}
                role="status"
              >
                <span className={`fp-toast-icon ${toast?.type === 'error' ? 'fp-toast-icon-error' : ''}`}>
                  {toast?.type === 'error' ? <ErrorTriangleIcon /> : <CheckCircleIcontick />}
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
            <a href="/" className="fp-back-link">
              <span className="fp-back-icon-circle">
                <ArrowLeftIcon />
              </span>  
              Back to Sign in
            </a>

            <CardLogo />
            
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
                          <MailIconm />
                        </span>

                        <input
                          type="email"
                          id="fp-email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder="Enter your email address"
                          aria-invalid={Boolean(emailError)}
                          required
                        />
                      </div>

                      {emailError ? (
                        <>
                          <p className="fp-field-error">{emailError}</p>
                          <div className="fp-error-info-banner">
                            <span className="fp-error-info-icon">
                              <InfoIcon />
                            </span>
                            <div className="fp-error-info-text">
                              <p className="fp-error-info-title">What does this means?</p>
                              <p className="fp-error-info-description">
                                Please check your email and try again. If you still have trouble, contact support
                              </p>
                            </div>
                          </div>
                        </>
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

                        {mobileError && (
                          <span className="fp-input-status-icon">
                            <CheckCircleIcons />
                            </span>
                          )}
                      </div>

                      {mobileError ? (
                        <>
                          <p className="fp-field-error">{mobileError}</p>
                          <div className="fp-error-info-banner">
                            <span className="fp-error-info-icon">
                              <InfoIcon />
                              
                            </span>
                            <div className="fp-error-info-text">
                              <p className="fp-error-info-title">What does this means?</p>
                              <p className="fp-error-info-description">
                                Please check your mobile number and try again. If you still have trouble, contact support
                              </p>
                            </div>
                          </div>
                        </>
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
                  <span className="fp-support-link">
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
                <div className="fp-resend-block"></div> 
                  <div className="fp-resend-row">
                    <span>Didn&apos;t received it ?</span>
                    <button
                      type="button"
                      className="fp-resend-link"
                      onClick={handleResendOtp}
                      disabled={resendSeconds > 0}
                    >
                      Resend OTP
                    </button>
                  </div>

                  {resendSeconds > 0 && (
                    <>
                      <div className="fp-resend-status">
                        <span className="fp-resend-status-label">Resend OTP</span>
                        <span className="fp-resend-timer">
                          <ClockIcon />
                          00:{String(resendSeconds).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="fp-resend-info-banner">
                        <span className="fp-resend-info-icon">
                        <InfoIcon />
                          </span>
                            <p className="fp-resend-info-text">
                              You can resend the otp after the timers end.
                            </p>
                          </div>
                        </>
                      )}

                  <button type="submit" className="fp-submit-btn">
                    Verify OTP
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