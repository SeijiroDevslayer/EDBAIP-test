import { lazy, Suspense, useCallback, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { LOGIN_RESULT_STATUS } from "../utils/authConfig.js";
import {
  AUTH_ERROR_CODES,
  getSafeAuthErrorMessage,
} from "../utils/authErrors.js";
import { loginWithMicrosoft } from "../services/microsoftAuthService.js";
import { isMockAuthEnabled } from "../utils/mockSession.js";
import MicrosoftMockSignInFlow from "./MicrosoftMockSignInFlow.jsx";
import "./MicrosoftSSOButton.css";

const MfaVerificationSuccess = lazy(() => import("./MfaVerificationSuccess"));

function MicrosoftIcon() {
  return (
    <svg
      className="btn-icon"
      width="18"
      height="18"
      viewBox="0 0 21 21"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

/**
 * Continue with Microsoft.
 * Production: Microsoft MFA stays in Microsoft hosted UI (MSAL).
 * Mock auth: local multi-step Microsoft lookalike → EDABIP success → dashboard.
 */
function MicrosoftSSOButton({ className }) {
  const navigate = useNavigate();
  const { loginWithMicrosoftIdentity, clearPendingAuthentication } =
    useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMockFlow, setShowMockFlow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const processingRef = useRef(false);
  const triggerRef = useRef(null);
  const errorId = useId();

  const finishProcessing = () => {
    processingRef.current = false;
    setIsProcessing(false);
  };

  const authenticateMicrosoftUser = async () => {
    const result = await loginWithMicrosoft();

    if (result?.status === LOGIN_RESULT_STATUS.APP_STEP_UP_REQUIRED) {
      throw new Error(getSafeAuthErrorMessage(AUTH_ERROR_CODES.UNKNOWN));
    }

    if (
      result?.status !== LOGIN_RESULT_STATUS.AUTHENTICATED ||
      !result?.user
    ) {
      throw new Error(
        getSafeAuthErrorMessage(AUTH_ERROR_CODES.MICROSOFT_EXCHANGE_FAILED)
      );
    }

    loginWithMicrosoftIdentity(result.user, {
      isMock: Boolean(result.isMock || isMockAuthEnabled),
      rememberMe: true,
    });
  };

  const completeMicrosoftLogin = async () => {
    if (processingRef.current) {
      return;
    }

    setErrorMessage("");
    clearPendingAuthentication?.();

    processingRef.current = true;
    setIsProcessing(true);

    try {
      await authenticateMicrosoftUser();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(
        getSafeAuthErrorMessage(
          error?.code,
          error instanceof Error
            ? error.message
            : getSafeAuthErrorMessage(AUTH_ERROR_CODES.MICROSOFT_UNAVAILABLE)
        )
      );
    } finally {
      finishProcessing();
    }
  };

  const handleMockFlowComplete = async () => {
    if (processingRef.current) {
      return;
    }

    setErrorMessage("");
    clearPendingAuthentication?.();

    processingRef.current = true;
    setIsProcessing(true);

    try {
      await authenticateMicrosoftUser();
      setShowMockFlow(false);
      setShowSuccess(true);
    } catch (error) {
      setShowMockFlow(false);
      setErrorMessage(
        getSafeAuthErrorMessage(
          error?.code,
          error instanceof Error
            ? error.message
            : getSafeAuthErrorMessage(AUTH_ERROR_CODES.MICROSOFT_UNAVAILABLE)
        )
      );
      finishProcessing();
    }
  };

  const handleSuccessRedirect = useCallback(() => {
    finishProcessing();
    setShowSuccess(false);
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  const handleClick = () => {
    if (processingRef.current) {
      return;
    }

    setErrorMessage("");

    if (isMockAuthEnabled) {
      setShowMockFlow(true);
      return;
    }

    completeMicrosoftLogin();
  };

  const handleCancelMock = () => {
    if (isProcessing) {
      return;
    }
    setShowMockFlow(false);
    triggerRef.current?.focus?.();
  };

  const buttonClassName = className || "sso-btn microsoft-btn";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={buttonClassName}
        onClick={handleClick}
        disabled={isProcessing}
        aria-busy={isProcessing}
        aria-haspopup={isMockAuthEnabled ? "dialog" : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        aria-label="Continue with Microsoft"
      >
        <MicrosoftIcon />
        <span className="sso-btn-label">
          {isProcessing
            ? "Signing in with Microsoft..."
            : "Sign In with Microsoft"}
        </span>
      </button>

      {errorMessage ? (
        <p id={errorId} className="sso-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <MicrosoftMockSignInFlow
        open={showMockFlow}
        onCancel={handleCancelMock}
        onComplete={handleMockFlowComplete}
      />

      {showSuccess ? (
        <Suspense fallback={null}>
          <MfaVerificationSuccess
            open
            onRedirect={handleSuccessRedirect}
            ariaLabel="Microsoft sign-in successful. Redirecting to your dashboard."
          />
        </Suspense>
      ) : null}
    </>
  );
}

export default MicrosoftSSOButton;
