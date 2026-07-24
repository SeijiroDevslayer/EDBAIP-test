import { useEffect } from "react";
import "./MfaVerificationSuccess.css";

const DEFAULT_REDIRECT_MS = 2500;

function SuccessCheckIcon() {
  return (
    <div className="mfa-success-check" aria-hidden="true">
      <svg viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="36" fill="#22C55E" />
        <path
          d="M21 37.5L30.5 47L51 26.5"
          stroke="#ffffff"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function RedirectSpinner() {
  return (
    <div className="mfa-success-spinner" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
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
  title = "Verification successful !",
  subtitle = "Your account has been securely verified and you will redirected shortly",
  ariaLabel = "Verification successful. Redirecting to your dashboard.",
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
        <SuccessCheckIcon />

        <h2 className="mfa-success-title">{title}</h2>

        <p className="mfa-success-subtitle">{subtitle}</p>

        <div className="mfa-success-redirect">
          <RedirectSpinner />
        </div>
      </div>
    </div>
  );
}

export default MfaVerificationSuccess;
