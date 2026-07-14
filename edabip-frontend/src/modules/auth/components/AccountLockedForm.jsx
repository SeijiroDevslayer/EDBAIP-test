import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImg  from "../../../assets/login/auth_background.png";
import logoImg        from "../../../assets/login/logo.png";
import lockIconImg    from "../../../assets/login/lock_icon.png";
import secureIcon     from "../../../assets/login/secure.svg";
import protectIcon    from "../../../assets/login/protect.svg";
import quickEasyIcon  from "../../../assets/login/quick-easy.svg";
import refreshIcon    from "../../../assets/login/refresh_icon.png";
import footerLockIcon from "../../../assets/login/material-symbols_lock-outline.png";
import infoBoxIcon    from "../../../assets/login/Vector.png";
import "./AccountLockedForm.css";

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
    window.innerWidth > 768
      ? Math.min(1, window.innerWidth / 1536, (window.innerHeight - 30) / 883)
      : 1
  );

  useEffect(() => {
    const computeScale = () =>
      setScale(
        window.innerWidth > 768
          ? Math.min(1, window.innerWidth / 1536, (window.innerHeight - 30) / 883)
          : 1
      );
    window.addEventListener("resize", computeScale);
    computeScale();
    return () => window.removeEventListener("resize", computeScale);
  }, []);

  const handleTryAgain = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    navigate("/");
  };

  return (
    <div
      className="al-page"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="al-row"
        style={
          window.innerWidth > 768
            ? { transform: `scale(${scale})`, transformOrigin: "top center" }
            : undefined
        }
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
            {/* Lock icon with glow */}
            <div className="al-lock-circle">
              <img
                src={lockIconImg}
                alt="Account Locked"
                className="al-lock-img"
              />
            </div>

            {/* Inner content — starts at 211px from card top */}
            <div className="al-card-inner">
              <h2 className="al-title">Account Locked</h2>
              <p className="al-error">Too many failed attempts</p>
              <p className="al-sub">
                Please try again after some time or reset your password to continue.
              </p>

              {/* Info box */}
              <div className="al-info">
                <span className="al-info-icon">
                  <img src={infoBoxIcon} alt="" width="27.72" height="27.72" />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="al-info-title">What is this happening?</p>
                  <p className="al-info-desc">
                    For your security, we’ve temporarily locked your account due to
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
                <img src={refreshIcon} alt="" width="16" height="16" /> Try Again
              </button>

              {/* Footer */}
              <p className="al-footer">
                <img src={footerLockIcon} alt="" width="23.45" height="23.45" style={{ flexShrink: 0 }} />
                <span>
                  If you continue to have trouble, please try again later or{" "}
                  <span
                    className="al-contact"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/contact-support")}
                  >contact support</span>{" "}
                  for assistance
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLockedForm;