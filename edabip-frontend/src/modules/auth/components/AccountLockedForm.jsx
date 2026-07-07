import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImg from "../../../assets/login/auth_background.png";
import logoImg from "../../../assets/login/logo.png";
import lockIconImg from "../../../assets/login/lock_icon.png";
import secureIcon from "../../../assets/login/secure.svg";
import protectIcon from "../../../assets/login/protect.svg";
import quickEasyIcon from "../../../assets/login/quick-easy.svg";
import "./AccountLockedForm.css";

function RefreshCwIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function SmallLockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 11V7a5 5 0 0110 0v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 8h.01M12 12v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const FEATURES = [
  {
    img: secureIcon,
    title: "Secure Reset Link",
    desc: "We'll send you a secure link to reset your password.",
  },
  {
    img: protectIcon,
    title: "Protect Your Account",
    desc: "We take extra steps to keep your account safe.",
  },
  {
    img: quickEasyIcon,
    title: "Quick & Easy",
    desc: "Reset your password in just a few simple steps.",
  },
];

const STORAGE_KEY = "loginFailedAttempts";
const SUPPORT_EMAIL = "support@edabip.com";

function AccountLockedForm() {
  const navigate = useNavigate();

  const [scale, setScale] = useState(() =>
    Math.min(1, window.innerWidth / 1535, window.innerHeight / 1024)
  );

  useEffect(() => {
    const computeScale = () =>
      setScale(Math.min(1, window.innerWidth / 1535, window.innerHeight / 1024));
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, []);

  const handleTryAgain = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    navigate("/");
  };

  return (
    <div
      className="al-page"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Content row — fixed 1535×1024 canvas, anchored top-left */}
      <div
        className="al-row"
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        {/* ── LEFT ── */}
        <div className="al-left">
          <img src={logoImg} alt="EDABIP" className="al-logo" />

          <h1 className="al-heading">
            Reset your <span className="al-heading-accent">Password</span>
          </h1>

          <p className="al-desc">
            No worries! Let's help you set a new password and get back to your
            account.
          </p>

          <div className="al-features">
            {FEATURES.map(({ img, title, desc }) => (
              <div key={title} className="al-feature">
                <img src={img} alt={title} className="al-feat-icon" />
                <div>
                  <p className="al-feat-title">{title}</p>
                  <p className="al-feat-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CARD ── */}
        <div className="al-card-col">
          <div className="al-card">
            {/* Lock circle */}
            <div className="al-lock-circle">
              <img
                src={lockIconImg}
                alt="Account Locked"
                className="al-lock-img"
              />
            </div>

            <h2 className="al-title">Account Locked</h2>
            <p className="al-error">Too many failed attempts</p>
            <p className="al-sub">
              Please try again after some time or reset your password to continue.
            </p>

            {/* Info box */}
            <div className="al-info">
              <span className="al-info-icon">
                <InfoIcon />
              </span>
              <div>
                <p className="al-info-title">What is this happening?</p>
                <p className="al-info-desc">
                  For you security, we’ve temporarily locked your account due to
                  multiple failed login attempts.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <a href="/forgot-password" className="al-btn al-btn-white">
              Reset Password
            </a>

            <button
              type="button"
              className="al-btn al-btn-dark"
              onClick={handleTryAgain}
            >
              <RefreshCwIcon /> Try Again
            </button>

            {/* Footer */}
            <p className="al-footer">
              <SmallLockIcon />
              <span>
                If you continue to have trouble, please try again later or{" "}
                <span className="al-contact">contact support</span>{" "}
                for assistance
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLockedForm;