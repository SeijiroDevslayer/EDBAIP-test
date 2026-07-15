import backgroundImg from "../../../assets/login/background.jpg";
import logoImg from '../../../assets/login/logo.png';
import logoImgc from '../../../assets/login/logoc.png';
import successIconImg from '../../../assets/login/success-icon.png';
import featureAnalytics from '../../../assets/login/feature-analytics.png';
import featureAi from '../../../assets/login/feature-ai.png';
import featureSecurity from '../../../assets/login/feature-security.png';
import featureScalable from '../../../assets/login/feature-scalable.png';
import { Link } from "react-router-dom";
import './PasswordResetSuccess.css';

const FEATURES = [
  { src: featureAnalytics, alt: 'Real-Time Analytics',  label: 'Real-Time Analytics'  },
  { src: featureAi,        alt: 'AI-Powered Insights',  label: 'AI-Powered Insights'  },
  { src: featureSecurity,  alt: 'Enterprise Security',  label: 'Enterprise Security'  },
  { src: featureScalable,  alt: 'Scalable Platform',    label: 'Scalable Platform'    },
];

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <div className="prs-icon-wrap" aria-hidden="true">
      <img src={successIconImg} alt="" className="prs-success-img" />
    </div>
  );
}

function PasswordResetSuccess() {
  return (
    <div className="prs-container">
      <div className="prs-background">
        <img src={backgroundImg} alt="" className="prs-background-image" />
      </div>

      <div className="prs-content">

        {/* Left Section */}
        <div className="prs-left">
          <img src={logoImg} alt="EDABIP" className="prs-brand-logo" />

          <h1 className="prs-welcome-heading">
            Welcome to your Analytics Dashboard
          </h1>

          <p className="prs-welcome-description">
            Track performance, analyze data, and make smarter business decisions in real-time
          </p>

          <div className="prs-features">
            {FEATURES.map((f) => (
              <div key={f.alt} className="prs-feature-item">
                <img src={f.src} alt={f.alt} className="prs-feature-badge" />
                <span className="prs-feature-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="prs-right">
          <div className="prs-card">

            {/* Card Logo */}
            <div className="prs-card-logo">
              <img src={logoImgc} alt="" className="prs-card-logo-icon" />
              <span className="prs-card-logo-text">EDABIP</span>
            </div>

            <SuccessIcon />

            <h2 className="prs-title">Password Reset Successsfully !</h2>

            <p className="prs-subtitle">
              Your password has been updated successfully.<br />
              You can now sign in to your EDABIP account<br />
              using your new password.
            </p>

             <Link to="/login" className="prs-signin-btn">
               Go to Sign in
               <ArrowRightIcon />
              </Link>

            <p className="prs-support-text">
              Need help ?{' '}
              <span className="prs-support-link">Contact Support</span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default PasswordResetSuccess;
