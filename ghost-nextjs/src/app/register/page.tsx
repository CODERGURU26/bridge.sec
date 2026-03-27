"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!formData.fullName || !formData.email || !formData.organization) {
      setError("All fields are required to proceed.");
      return;
    }
    setStep(2);
  }

  function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must accept the terms to continue.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => router.push("/demo"), 2500);
  }

  return (
    <>
      <div className="grid-bg" />
      <div className="page-container">
        <div className="page-header">
          <Link href="/" className="nav-logo">
            <div className="logo-icon">G</div>
            <span className="logo-text">GHOST</span>
          </Link>
        </div>

        <div className="form-card reg-card">
          {/* Terminal bar */}
          <div className="form-terminal-bar">
            <div className="t-dot t-red" />
            <div className="t-dot t-yellow" />
            <div className="t-dot t-green" />
            <span className="terminal-title">
              ghost — operator registration
            </span>
          </div>

          <div className="form-body">
            {/* Step indicator */}
            <div className="reg-steps">
              <div className={`reg-step ${step >= 1 ? "active" : ""}`}>
                <div className="reg-step-num">01</div>
                <div className="reg-step-label">Identity</div>
              </div>
              <div className="reg-step-line">
                <div
                  className={`reg-step-line-fill ${step >= 2 ? "filled" : ""}`}
                />
              </div>
              <div className={`reg-step ${step >= 2 ? "active" : ""}`}>
                <div className="reg-step-num">02</div>
                <div className="reg-step-label">Security</div>
              </div>
              <div className="reg-step-line">
                <div
                  className={`reg-step-line-fill ${submitted ? "filled" : ""}`}
                />
              </div>
              <div className={`reg-step ${submitted ? "active" : ""}`}>
                <div className="reg-step-num">03</div>
                <div className="reg-step-label">Access</div>
              </div>
            </div>

            {submitted ? (
              /* ─── SUCCESS STATE ─── */
              <div className="reg-success">
                <div className="reg-success-icon">✓</div>
                <div className="section-tag" style={{ marginBottom: 12 }}>
                  Registration Complete
                </div>
                <h1 className="form-title">
                  Welcome, Operator
                </h1>
                <p className="form-desc" style={{ marginBottom: 24 }}>
                  Your GHOST access credentials have been generated.
                  A verification link has been sent to{" "}
                  <span style={{ color: "var(--cyan)" }}>{formData.email}</span>.
                </p>

                <div className="reg-access-box">
                  <div className="reg-access-line">
                    <span className="t-prompt">&gt;</span>
                    <span className="t-cmd">operator.status</span>
                  </div>
                  <div className="t-success">
                    PENDING_VERIFICATION
                  </div>
                  <div className="reg-access-line" style={{ marginTop: 6 }}>
                    <span className="t-prompt">&gt;</span>
                    <span className="t-cmd">operator.clearance</span>
                  </div>
                  <div className="t-out">
                    LEVEL_1 — STANDARD_OPS
                  </div>
                </div>

                <Link
                  href="/signin"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    padding: 14,
                    fontSize: 12,
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    marginTop: 24,
                  }}
                >
                  Proceed to Sign In →
                </Link>
              </div>
            ) : step === 1 ? (
              /* ─── STEP 1: IDENTITY ─── */
              <>
                <div className="section-tag" style={{ marginBottom: 12 }}>
                  New Operator
                </div>
                <h1 className="form-title">Create Account</h1>
                <p className="form-desc">
                  Register as a GHOST operator to access threat intelligence,
                  defense systems, and real-time monitoring.
                </p>

                {error && (
                  <div className="form-error">
                    <span style={{ color: "var(--red)" }}>[ ERR ]</span> {error}
                  </div>
                )}

                <form onSubmit={handleStep1}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="operator@company.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Organization</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Acme Corp"
                        value={formData.organization}
                        onChange={(e) =>
                          updateField("organization", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <select
                        className="form-input"
                        value={formData.role}
                        onChange={(e) => updateField("role", e.target.value)}
                      >
                        <option value="">Select role</option>
                        <option value="ciso">CISO</option>
                        <option value="security-engineer">
                          Security Engineer
                        </option>
                        <option value="soc-analyst">SOC Analyst</option>
                        <option value="devops">DevOps / SRE</option>
                        <option value="it-admin">IT Administrator</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: 14,
                      fontSize: 12,
                      marginTop: 8,
                    }}
                  >
                    Continue to Security Setup →
                  </button>
                </form>

                <div className="form-divider">
                  <span>OR</span>
                </div>

                <button
                  className="btn-ghost"
                  style={{
                    width: "100%",
                    padding: 14,
                    fontSize: 12,
                    marginBottom: 12,
                  }}
                >
                  Register with SSO
                </button>
                <button
                  className="btn-ghost"
                  style={{ width: "100%", padding: 14, fontSize: 12 }}
                >
                  Register with Google
                </button>

                <p className="form-footer">
                  Already have an account?{" "}
                  <Link href="/signin" className="form-link">
                    Sign In
                  </Link>
                </p>
              </>
            ) : (
              /* ─── STEP 2: SECURITY ─── */
              <>
                <div className="section-tag" style={{ marginBottom: 12 }}>
                  Security Setup
                </div>
                <h1 className="form-title">Secure Your Access</h1>
                <p className="form-desc">
                  Set a strong passphrase to protect your GHOST operator account.
                  Minimum 8 characters required.
                </p>

                {error && (
                  <div className="form-error">
                    <span style={{ color: "var(--red)" }}>[ ERR ]</span> {error}
                  </div>
                )}

                <form onSubmit={handleStep2}>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      required
                    />
                    <div className="password-strength">
                      <div
                        className={`strength-bar ${
                          formData.password.length >= 12
                            ? "strong"
                            : formData.password.length >= 8
                            ? "medium"
                            : formData.password.length > 0
                            ? "weak"
                            : ""
                        }`}
                      />
                      <span className="strength-label">
                        {formData.password.length >= 12
                          ? "STRONG"
                          : formData.password.length >= 8
                          ? "ACCEPTABLE"
                          : formData.password.length > 0
                          ? "WEAK"
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateField("confirmPassword", e.target.value)
                      }
                      required
                    />
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <div className="field-hint error">
                          Passwords do not match
                        </div>
                      )}
                    {formData.confirmPassword &&
                      formData.password === formData.confirmPassword && (
                        <div className="field-hint success">
                          Passwords match
                        </div>
                      )}
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label className="form-checkbox">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <span>
                        I agree to the{" "}
                        <a href="#" className="form-link">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="form-link">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="reg-btn-row">
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        setStep(1);
                        setError("");
                      }}
                      style={{ padding: "14px 24px", fontSize: 12 }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, padding: 14, fontSize: 12 }}
                    >
                      Create Account →
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="page-footer-text">
          SOC 2 Type II · ISO 27001 · GDPR · 256-bit AES Encryption
        </div>
      </div>
    </>
  );
}
