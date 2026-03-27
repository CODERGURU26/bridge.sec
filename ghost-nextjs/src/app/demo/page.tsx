"use client";

import Link from "next/link";
import { useState } from "react";

export default function Demo() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    endpoints: "",
    message: "",
  });

  function update(key: string, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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

        <div className="form-card" style={{ maxWidth: 560 }}>
          <div className="form-terminal-bar">
            <div className="t-dot t-red" />
            <div className="t-dot t-yellow" />
            <div className="t-dot t-green" />
            <span className="terminal-title">ghost — demo request terminal</span>
          </div>

          <div className="form-body">
            <div className="section-tag" style={{ marginBottom: 12 }}>Live Demo</div>
            <h1 className="form-title">Schedule a Demo</h1>
            <p className="form-desc">
              See GHOST in action — our team will walk you through real-time
              ransomware detection, automated playbooks, and AI investigations.
            </p>

            {submitted ? (
              <div className="form-success-block">
                <div style={{ fontSize: 28, marginBottom: 12 }}>✓</div>
                <h2 className="form-title" style={{ fontSize: 20 }}>
                  Demo Scheduled
                </h2>
                <p className="form-desc" style={{ marginBottom: 24 }}>
                  Our security solutions team will reach out within 24 hours to
                  confirm your demo slot.
                </p>
                <div className="terminal" style={{ textAlign: "left", marginBottom: 24 }}>
                  <div className="terminal-body" style={{ padding: 16 }}>
                    <div className="t-success">[ OK ] Demo request received</div>
                    <div className="t-success">[ OK ] Confirmation email sent to {form.email}</div>
                    <div className="t-out">[ INFO ] Typical response time: &lt;24h</div>
                  </div>
                </div>
                <Link href="/">
                  <button className="btn-primary" style={{ padding: "12px 32px", fontSize: 12 }}>
                    ← Back to Home
                  </button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">FULL NAME</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WORK EMAIL</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">COMPANY</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ROLE</label>
                    <select
                      className="form-input"
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      required
                    >
                      <option value="">Select role...</option>
                      <option value="ciso">CISO</option>
                      <option value="soc-lead">SOC Lead</option>
                      <option value="it-director">IT Director</option>
                      <option value="security-engineer">Security Engineer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">ENDPOINTS TO PROTECT</label>
                  <select
                    className="form-input"
                    value={form.endpoints}
                    onChange={(e) => update("endpoints", e.target.value)}
                    required
                  >
                    <option value="">Select range...</option>
                    <option value="1-25">1 – 25</option>
                    <option value="26-100">26 – 100</option>
                    <option value="101-500">101 – 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">ANYTHING SPECIFIC YOU&apos;D LIKE TO SEE?</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="e.g. ransomware simulation, AI investigations, SIEM integration..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={3}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 12 }}>
                  Request Demo →
                </button>

                <p className="form-footer">
                  Already have an account? <Link href="/signin" className="form-link">Sign in</Link>
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="page-footer-text">
          No credit card required · 30-minute session · Personalized walkthrough
        </div>
      </div>
    </>
  );
}
