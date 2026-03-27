"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

        <div className="form-card">
          <div className="form-terminal-bar">
            <div className="t-dot t-red" />
            <div className="t-dot t-yellow" />
            <div className="t-dot t-green" />
            <span className="terminal-title">ghost — secure access terminal</span>
          </div>

          <div className="form-body">
            <div className="section-tag" style={{ marginBottom: 12 }}>Authentication</div>
            <h1 className="form-title">Sign In</h1>
            <p className="form-desc">
              Access your GHOST threat dashboard and security operations center.
            </p>

            {submitted && (
              <div className="form-success">
                <span style={{ color: "var(--green)" }}>[ OK ]</span> Authentication
                request submitted. Check your inbox.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">EMAIL</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="operator@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">PASSWORD</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-row" style={{ marginBottom: 24 }}>
                <label className="form-checkbox">
                  <input type="checkbox" />
                  <span>Remember this device</span>
                </label>
                <a href="#" className="form-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 12 }}>
                Authenticate →
              </button>
            </form>

            <div className="form-divider">
              <span>OR</span>
            </div>

            <button className="btn-ghost" style={{ width: "100%", padding: 14, fontSize: 12, marginBottom: 12 }}>
              Sign in with SSO
            </button>
            <button className="btn-ghost" style={{ width: "100%", padding: 14, fontSize: 12 }}>
              Sign in with Google
            </button>

            <p className="form-footer">
              No account? <Link href="/demo" className="form-link">Request a demo</Link>
            </p>
          </div>
        </div>

        <div className="page-footer-text">
          SOC 2 Type II · ISO 27001 · GDPR · 256-bit AES Encryption
        </div>
      </div>
    </>
  );
}
