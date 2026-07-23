import { useEffect } from "react";
import logoImgc from "../../../assets/login/logoc.png";
import successIconImg from "../../../assets/login/success-icon.png";
import "./MfaVerificationSuccess.css";

const DEFAULT_REDIRECT_MS = 2500;

function RedirectSpinner() {
  return (
    <div className="mfa-success-spinner" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <span
          key={index}
          className="mfa-success-spinner-dot"
          style={{ "--dot-index": index }}
        />
      ))}
    </div>
  );
}

function MfaVerificationSuccess({
  open = false,
  redirectDelayMs = DEFAULT_REDIRECT_MS,
  onRedirect,
  title = "Email Verified Successfully!",
  subtitle = (
    <>
      Your email has been successfully verified.
      <br />
      You can now access all features of your EDABIP account.
    </>
  ),
  ariaLabel = "Email verified successfully. Redirecting to your dashboard.",
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timerId = window.setTimeout(() => {
      onRedirect?.();
    }, redirectDelayMs);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timerId);
    };
  }, [open, redirectDelayMs, onRedirect]);

  if (!open) {
    return null;
  }

  return (
    <div className="mfa-success-overlay" role="presentation">
      <div
        className="mfa-success-card"
        role="status"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <div className="mfa-success-logo">
          <img src={logoImgc} alt="" className="mfa-success-logo-icon" />
          <span className="mfa-success-logo-text">EDABIP</span>
        </div>

        <div className="mfa-success-icon-wrap" aria-hidden="true">
          <img
            src={successIconImg}
            alt=""
            className="mfa-success-icon-img"
          />
        </div>

        <h2 className="mfa-success-title">{title}</h2>

        <p className="mfa-success-subtitle">{subtitle}</p>

        <div className="mfa-success-redirect">
          <RedirectSpinner />
          <p className="mfa-success-redirect-text">
            Redirecting you to your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}

export default MfaVerificationSuccess;
