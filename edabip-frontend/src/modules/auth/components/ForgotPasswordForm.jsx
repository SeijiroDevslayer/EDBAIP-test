import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import backgroundImg from "../../../assets/login/background.jpg";
import logoImg from "../../../assets/login/logo.png";
import logoCardImg from "../../../assets/login/logoc.png";

import featureAnalytics from "../../../assets/login/feature-analytics.png";
import featureAi from "../../../assets/login/feature-ai.png";
import featureSecurity from "../../../assets/login/feature-security.png";
import featureScalable from "../../../assets/login/feature-scalable.png";

import backIcon from "../../../assets/login/back.png";
import tickIcon from "../../../assets/login/tick.png";
import closeIcon from "../../../assets/login/close.png";
import lineEmailIcon from "../../../assets/login/line-email.png";
import mailInputIcon from "../../../assets/login/mailm.svg";
import mobileIcon from "../../../assets/login/mobile.svg";
import phoneIcon from "../../../assets/login/phone-icon.png";
import checkCircle from "../../../assets/login/checkcircle.png";

import alertIcon from "../../../assets/negative-state/alert-icon.png";
import closeRedIcon from "../../../assets/negative-state/close-red-icon.png";
import infoIcon from "../../../assets/negative-state/info-icon.png";
import redInfoIcon from "../../../assets/negative-state/red-info-icon.png";
import carbonCloseIcon from "../../../assets/negative-state/carbon_close.png";
import verifiedTickIcon from "../../../assets/negative-state/Vector-tick.png";

import { verifyEmail } from "../api/mockForgotPasswordApi";
import { verifyMobile } from "../api/mockForgetPasswordMobile";
import { sendMockOtp, verifyMockOtp } from "../api/mockOtpApi";


import "./ForgotPasswordForm.css";

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
const TOAST_DISMISS_MS = 5000;

function CardLogo() {
  return (
    <div className="fp-card-logo">
      <img src={logoCardImg} alt="" className="fp-card-logo-icon" />
      <span className="fp-card-logo-text">EDABIP</span>
    </div>
  );
}

function MailIcon() {
  return <img src={lineEmailIcon} alt="" className="fp-toggle-email-icon" />;
}

function PhoneIcon() {
  return <img src={mobileIcon} alt="" className="fp-toggle-mobile-icon" />;
}

function MailInputIcon() {
  return <img src={mailInputIcon} alt="" className="fp-mail-m-icon" />;
}

function PhoneInputIcon() {
  return <img src={phoneIcon} alt="" className="fp-phone-input-icon" />;
}

function ArrowLeftIcon() {
  return <img src={backIcon} alt="" className="fp-back-icon" />;
}

function CloseIcon() {
  return <img src={closeIcon} alt="" className="fp-close-icon" />;
}

function SuccessToastIcon() {
  return <img src={tickIcon} alt="" className="fp-success-toast-icon" />;
}

function ErrorToastIcon() {
  return <img src={alertIcon} alt="" className="fp-error-triangle-icon" />;
}

function ExpiredIcon() {
  return <img src={closeRedIcon} alt="" className="fp-expired-icon" />;
}

function FieldErrorIcon() {
  return <img src={checkCircle} alt="" className="fp-cross-icon" />;
}

function InvalidOtpIcon() {
  return <img src={redInfoIcon} alt="" className="fp-invalid-otp-icon" />;
}

function CarbonCloseIcon() {
  return <img src={carbonCloseIcon} alt="" className="fp-carbon-close-icon" />;
}

function HelperInfoIcon() {
  return <img src={infoIcon} alt="" className="fp-info-img-icon" />;
}
function VerifiedToastIcon() {
  return <img src={verifiedTickIcon} alt="" className="fp-verified-toast-icon" />;
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const otpInputRefs = useRef([]);

  const [method, setMethod] = useState("email");
  const [step, setStep] = useState("request");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [resendSeconds, setResendSeconds] = useState(0);
  const [toast, setToast] = useState(null);

  const destination = method === "email" ? email : `+91 ${mobile}`;
  const isExpiredOtpError = otpError === "Invalid OTP";

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

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => {
      setToast(null);
    }, TOAST_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [toast]);


  const selectMethod = (nextMethod) => {
    setMethod(nextMethod);
    setStep("request");
    setOtp("");
    setOtpError("");
    setEmailError("");
    setMobileError("");
    setToast(null);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleMobileChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
    if (mobileError) setMobileError("");
  };

  const handleOtpBoxChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    const chars = otp.padEnd(4, " ").split("");

    chars[index] = value || " ";
    setOtp(chars.join("").trimEnd());

    if (otpError) setOtpError("");

    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBoxKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }

      const chars = otp.padEnd(4, " ").split("");
      chars[index] = " ";
      setOtp(chars.join("").trimEnd());
    }

    if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const showSuccessToastAndMoveToOtp = async () => {
    await sendMockOtp();

    setOtp("");
    setOtpError("");

    setToast({
      type: "success",
      title: "OTP Send Successfully !",
      message: "A 4-digit OTP has been send to",
      destination,
    });

    setTimeout(() => {
      setStep("verify");
      setResendSeconds(RESEND_SECONDS);
    }, 1000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setEmailError("");
    setMobileError("");
    setToast(null);

    if (method === "email") {
      try {
        await verifyEmail(email);
        await showSuccessToastAndMoveToOtp();
      } catch (err) {
        setEmailError("We couldn't find an account with this email address.");

        setToast({
          type: "error",
          title: "Email Not Found",
          message: "No account is associated with this email address",
        });
      }

      return;
    }

    if (!INDIA_MOBILE_REGEX.test(mobile)) {
      setMobileError("We couldn't find an account with this mobile number");

      setToast({
        type: "error",
        title: "Mobile Number Not Found",
        message: "No account is associated with this mobile number",
      });

      return;
    }

    try {
      const response = await verifyMobile(mobile);

      if (!response || response.success === false) {
        setMobileError("We couldn't find an account with this mobile number");

        setToast({
          type: "error",
          title: "Mobile Number Not Found",
          message: "No account is associated with this mobile number",
        });

        return;
      }

      await showSuccessToastAndMoveToOtp();
    } catch (err) {
      setMobileError("We couldn't find an account with this mobile number");

      setToast({
        type: "error",
        title: "Mobile Number Not Found",
        message: "No account is associated with this mobile number",
      });
    }
  };

  const handleResendOtp = async () => {
    if (resendSeconds > 0) return;

    await sendMockOtp();

    setOtp("");
    setOtpError("");
    setResendSeconds(RESEND_SECONDS);

    setToast({
      type: "success",
      title: "OTP Resent Successfully !",
      message: "A new 4-digit OTP has been send to",
      destination,
    });
  };

 const handleVerifyOtp = async (e) => {
  e.preventDefault();

  if (otp.length !== 4) {
    setOtpError("Invalid OTP");

    setToast({
      type: "otp-error",
      title: "OTP Verified Unsuccessfully",
      message:
        "We couldn't verify the OTP you entered.\nPlease check the code and try again.",
    });

    return;
  }

  const verifyResponse = await verifyMockOtp(otp);

  if (!verifyResponse.success) {
    if (verifyResponse.reason === "OTP_EXPIRED") {
      setOtpError("Invalid OTP");

      setToast({
        type: "expired",
        title: "OTP Expired",
        message: "Your verification code has expired.\nPlease request a new OTP.",
      });

      return;
    }

    if (verifyResponse.reason === "INVALID_OTP") {
      setOtpError("Invalid OTP");

      setToast({
        type: "otp-error",
        title: "OTP Verified Unsuccessfully",
        message:
          "We couldn't verify the OTP you entered.\nPlease check the code and try again.",
      });

      return;
    }

    setOtpError("Invalid OTP");
    return;
  }

  setOtpError("");

 setToast({
  type: "verified",
  title: "OTP Verified Successfully !",
  message: "You will be redirected to create a new password",
});

setTimeout(() => {
  navigate("/create-new-password", {
    state: { otpVerified: true, destination, method },
  });
}, 1500);
};

  return (
    <div className={`fp-container ${step === "verify" ? "fp-container--verify" : ""}`}>
      <div className="fp-background">
        <img src={backgroundImg} alt="" className="fp-background-image" />
      </div>

      <div className="fp-content">
        <div className="fp-left-section">
          <img src={logoImg} alt="EDABIP" className="fp-brand-logo" />

          <h1 className="fp-welcome-heading">Welcome to your Analytics Dashboard</h1>

          <p className="fp-welcome-description">
            Track performance, analyze data, and make smarter business decisions in real-time.
          </p>

          <div className="fp-features-container">
            {FEATURES.map((feature) => (
              <div key={feature.alt} className="fp-feature-item">
                <img src={feature.src} alt={feature.alt} className="fp-feature-badge" />
                <span className="fp-feature-label">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`fp-right-section ${toast ? "fp-right-section--toast" : ""}`}>
          <div className="fp-card-wrapper">
            {toast && (
              <div
  className={`fp-toast fp-toast-${toast.type || "success"}`}
  role="status"
>
                <span className="fp-toast-icon">
                 {toast.type === "expired" ? (
  <ExpiredIcon />
) : toast.type === "error" || toast.type === "otp-error" ? (
  <ErrorToastIcon />
) : toast.type === "verified" ? (
  <VerifiedToastIcon />
) : (
  <SuccessToastIcon />
)}
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

            <div className={`fp-card ${step === "verify" ? "fp-card--verify" : ""}`}>
              <a href="/" className="fp-back-link" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
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
                    Choose how you&apos;d like to receive your reset instructions.
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
                        <label htmlFor="fp-email">Email ID</label>

                        <div className="fp-input-wrapper">
                          <span className="fp-input-icon">
                            <MailInputIcon />
                          </span>

                          <input
                            type="email"
                            id="fp-email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="jackie@stackly.com"
                            aria-invalid={Boolean(emailError)}
                            required
                          />

                          {emailError && (
                            <span className="fp-input-status-icon">
                              <FieldErrorIcon />
                            </span>
                          )}
                        </div>

                        {emailError ? (
                          <>
                            <p className="fp-field-error">
                              We couldn&apos;t find an account with this email address.
                            </p>

                            <div className="fp-error-info-banner">
                              <span className="fp-error-info-icon">
                                <HelperInfoIcon />
                              </span>

                              <div className="fp-error-info-text">
                                <p className="fp-error-info-description">
                                  Please check your email and try again.
                                  <br />
                                  If you still have trouble, Contact support
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="fp-helper-row">
                            <span className="fp-helper-icon">
                              <HelperInfoIcon />
                            </span>

                            <p className="fp-helper-text">
                              We&apos;ll send a secure reset link to this address. It will
                              expire in
                              5 minutes.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="fp-form-group">
                        <label htmlFor="fp-mobile">Mobile Number</label>

                        <div className="fp-input-wrapper fp-input-wrapper--phone">
                          <span className="fp-input-icon">
                            <PhoneInputIcon />
                          </span>

                          <input
                            type="tel"
                            inputMode="numeric"
                            id="fp-mobile"
                            value={mobile}
                            onChange={handleMobileChange}
                            placeholder="+1 (555) 000-0000"
                            maxLength={10}
                            aria-invalid={Boolean(mobileError)}
                            required
                          />

                          {mobileError && (
                            <span className="fp-input-status-icon">
                              <FieldErrorIcon />
                            </span>
                          )}
                        </div>

                        {mobileError ? (
                          <>
                            <p className="fp-field-error">
                              We couldn&apos;t find an account with this mobile number
                            </p>

                            <div className="fp-error-info-banner">
                              <span className="fp-error-info-icon">
                                <HelperInfoIcon />
                              </span>

                              <div className="fp-error-info-text">
                                <p className="fp-error-info-description">
                                  Please check your mobile number and try again.
                                  <br />
                                  If you still have trouble, Contact support
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="fp-helper-row">
                            <span className="fp-helper-icon">
                              <HelperInfoIcon />
                            </span>

                            <p className="fp-helper-text">
                              We&apos;ll send a secure reset link to this address. It will expire in
                              5 minutes.
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
                    Need help ? <span className="fp-support-link" onClick={()=>navigate('/contact-support')}>Contact Support</span>
                  </p>
                </>
              )}

              {step === "verify" && (
                <>
                  <h2 className="fp-title">Enter Verification Code</h2>

                  <p className="fp-subtitle">
                    A 4-digit code was sent to{" "}
                    <strong className="fp-subtitle-dest">{destination}</strong>
                  </p>

                  <form onSubmit={handleVerifyOtp} className="fp-form fp-verify-form">
                    <div className="fp-otp-boxes">
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          ref={(element) => {
                            otpInputRefs.current[index] = element;
                          }}
                          type="tel"
                          inputMode="numeric"
                          className={`fp-otp-box ${otpError ? "fp-otp-box--error" : "fp-otp-box--success"}`}
                          value={otp[index] && otp[index] !== " " ? otp[index] : ""}
                          onChange={(e) => handleOtpBoxChange(index, e)}
                          onKeyDown={(e) => handleOtpBoxKeyDown(index, e)}
                          maxLength={1}
                          autoFocus={index === 0}
                          aria-label={`OTP digit ${index + 1}`}
                        />
                      ))}
                    </div>

                    {otpError && (
                      <div className="fp-otp-error-line">
                        <span>{otpError}</span>
                        {isExpiredOtpError && <InvalidOtpIcon />}
                      </div>
                    )}

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

                    <div className="fp-resend-status">
                      <span className="fp-resend-status-label">Resend OTP</span>

                      <span className="fp-resend-timer">
                        <ClockIcon />
                        00:{String(resendSeconds).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="fp-resend-info-banner">
                      <span className="fp-resend-info-icon">
                        <HelperInfoIcon />
                      </span>

                      <p className="fp-resend-info-text">
                        You can resend the otp after the timers end.
                      </p>
                    </div>

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