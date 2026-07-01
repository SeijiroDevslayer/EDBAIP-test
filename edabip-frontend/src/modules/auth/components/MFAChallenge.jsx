import { useRef, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import logoIcon from "../../../assets/login/logoc.png";
import "./MFAChallenge.css";

const OTP_LENGTH = 4;
export default function MFAChallengePage() {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const { authData } = useAuthContext();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0)
      inputsRef.current[index - 1]?.focus();
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("");
    while (next.length < OTP_LENGTH) next.push("");
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted:", digits.join(""));
  };
  const isComplete = digits.every((d) => d !== "");
  return (
    <div className="mfa-page">
      <div className="mfa-card">
        <div className="mfa-card-brand">
          <img src={logoIcon} alt="EDABIP" className="mfa-card-brand-icon" />
          <span className="mfa-card-brand-text">EDABIP</span>
        </div>

        <button className="mfa-card-back" onClick={() => console.log("back")}>
          <span className="mfa-card-back-circle">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Back to Sign in
        </button>

        <h2 className="mfa-card-title">Enter Verification Code</h2>
        <p className="mfa-card-subtitle">
          A 4-digit code was sent to{" "}
          <strong className="mfa-card-phone">
            {authData?.mobileNumber || "+1 (555) 000-0000"}
          </strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mfa-inputs" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="mfa-input-box"
              />
            ))}
          </div>

          <p className="mfa-resend">
            Didn't receive it?{" "}
            <button type="button" onClick={() => console.log("resend")} className="mfa-resend-btn">
              Resend OTP
            </button>
          </p>

          <button type="submit" disabled={!isComplete} className={`mfa-submit ${isComplete ? "mfa-submit-active" : ""}`}>
            Verify OTP
          </button>
        </form>

        <div className="mfa-support-wrapper">
          <p className="mfa-support">
            Need help?{" "}
            <a href="#contact" className="mfa-support-link">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}