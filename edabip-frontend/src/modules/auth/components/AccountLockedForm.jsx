import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImg from "../../../assets/login/auth_background.jpg";
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

  // Scale the design canvas to fit, then center the leftover vertical space.
  // The canvas narrows with the viewport (down to 1100px) before any scaling
  // kicks in — the content only spans ~973px, so laptops keep a full-size
  // card instead of paying a shrink penalty for the empty right third.
  const computeLayout = () => {
    if (window.innerWidth <= 768) return { scale: 1, marginTop: 0, rowWidth: null };
    const rowWidth = Math.min(1536, Math.max(1100, window.innerWidth));
    const scale = Math.min(
      1,
      window.innerWidth / rowWidth,
      (window.innerHeight - 30) / 883
    );
    return {
      scale,
      marginTop: Math.max(0, (window.innerHeight - 1024 * scale) / 2),
      rowWidth,
    };
  };

  const [{ scale, marginTop, rowWidth }, setLayout] = useState(computeLayout);

  useEffect(() => {
    const onResize = () => setLayout(computeLayout());
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
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
            ? {
                width: `${rowWidth}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                marginTop: `${marginTop}px`,
              }
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
                  <Link className="al-contact" to="/contact-support">
                    contact support
                  </Link>{" "}
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