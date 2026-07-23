import { useEffect, useId, useRef, useState } from "react";
import OtpInput from "./OtpInput.jsx";
import "./MfaVerificationModal.css";

const DEFAULT_OTP_LENGTH = 4;

function formatTimer(totalSeconds) {
  const safe = Math.max(0, Number(totalSeconds) || 0);
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function MfaVerificationModal({
  open = false,
  title = "Verify your identity",
  description,
  method = "EMAIL_OTP",
  maskedDestination = "",
  expiresInSeconds = 300,
  resendAvailableInSeconds = 30,
  isSubmitting = false,
  isResending = false,
  error = "",
  otpLength = DEFAULT_OTP_LENGTH,
  onVerify,
  onResend,
  onClose,
  returnFocusRef,
}) {
  const [otp, setOtp] = useState(() => Array(otpLength).fill(""));
  const [resendSeconds, setResendSeconds] = useState(resendAvailableInSeconds);
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previouslyFocusedRef.current =
      returnFocusRef?.current || document.activeElement;

    setOtp(Array(otpLength).fill(""));
    setResendSeconds(resendAvailableInSeconds);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        event.preventDefault();
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      const restoreTarget =
        returnFocusRef?.current || previouslyFocusedRef.current;

      if (restoreTarget && typeof restoreTarget.focus === "function") {
        restoreTarget.focus();
      }
    };
  }, [
    open,
    otpLength,
    resendAvailableInSeconds,
    isSubmitting,
    onClose,
    returnFocusRef,
  ]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    setResendSeconds(resendAvailableInSeconds);
  }, [open, resendAvailableInSeconds]);

  useEffect(() => {
    if (!open || resendSeconds <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setResendSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [open, resendSeconds]);

  if (!open) {
    return null;
  }

  const code = otp.join("");
  const canVerify =
    code.length === otpLength &&
    otp.every((digit) => digit !== "") &&
    !isSubmitting;

  const resolvedDescription =
    description ||
    `We've sent a ${otpLength}-digit verification code to ${maskedDestination || "your email"}.`;

  const handleOverlayClick = (event) => {
    if (!isSubmitting && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleVerify = () => {
    if (!canVerify) {
      return;
    }
    onVerify?.(code);
  };

  const handleResend = async () => {
    if (resendSeconds > 0 || isSubmitting || isResending) {
      return;
    }

    const result = await onResend?.();
    const nextCooldown =
      typeof result?.resendAvailableInSeconds === "number"
        ? result.resendAvailableInSeconds
        : resendAvailableInSeconds;

    setOtp(Array(otpLength).fill(""));
    setResendSeconds(nextCooldown);
  };

  return (
    <div
      className="mfa-modal-overlay"
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div
        className="mfa-otp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-method={method}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="mfa-otp-modal-close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close verification dialog"
        >
          <svg
            className="mfa-otp-modal-close-icon"
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

        <div className="mfa-otp-modal-content">
          <div className="mfa-otp-illustration" aria-hidden="true">
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="34" fill="#E8EEF8" />
              <rect
                x="18"
                y="24"
                width="32"
                height="24"
                rx="4"
                stroke="#3734A5"
                strokeWidth="2"
                fill="#fff"
              />
              <path
                d="M18 28l16 10 16-10"
                stroke="#3734A5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="mfa-otp-copy">
            <h2 id={titleId} className="mfa-otp-modal-title">
              {title}
            </h2>
            <p id={descriptionId} className="mfa-otp-modal-message">
              {resolvedDescription}
            </p>
            {maskedDestination ? (
              <p className="mfa-otp-modal-destination">
                <span>Code sent to </span>
                <strong>{maskedDestination}</strong>
              </p>
            ) : null}
          </div>

          <div className="mfa-otp-input-section">
            <OtpInput
              value={otp}
              length={otpLength}
              disabled={isSubmitting}
              hasError={Boolean(error)}
              autoFocus
              onChange={setOtp}
              onComplete={() => {
                // Enter / paste completion is handled by verify button / Enter key.
              }}
            />

            <p
              className="mfa-otp-error"
              role={error ? "alert" : undefined}
              aria-live="polite"
            >
              {error || "\u00A0"}
            </p>

            <div className="mfa-otp-meta-row">
              <span className="mfa-otp-resend-label">
                {resendSeconds > 0
                  ? `Resend code in ${formatTimer(resendSeconds)}`
                  : "You can resend a new code"}
              </span>
              {Number.isFinite(expiresInSeconds) ? (
                <span className="mfa-otp-expiry visually-hidden">
                  Code expires in {formatTimer(expiresInSeconds)}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mfa-otp-actions">
            <button
              type="button"
              className="mfa-otp-verify-btn"
              onClick={handleVerify}
              disabled={!canVerify}
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              className="mfa-otp-resend-btn"
              onClick={handleResend}
              disabled={resendSeconds > 0 || isSubmitting || isResending}
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MfaVerificationModal;
