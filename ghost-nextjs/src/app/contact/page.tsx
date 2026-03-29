"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
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

        <div className="contact-grid">
          {/* Left: Info Column */}
          <div className="contact-info">
            <div className="section-tag" style={{ marginBottom: 12 }}>Contact</div>
            <h1 className="form-title" style={{ fontSize: 32 }}>
              Get in Touch
            </h1>
            <p className="form-desc" style={{ maxWidth: 340 }}>
              Questions about GHOST? Need support? Our security team is ready
              to help.
            </p>

            <div className="contact-channels">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <div className="contact-label">EMAIL</div>
                  <div className="contact-value">security@ghost.dev</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <div className="contact-label">LIVE CHAT</div>
                  <div className="contact-value">Available 24/7 in dashboard</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">PHONE</div>
                  <div className="contact-value">+91 (800) 555-GHOST</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">HEADQUARTERS</div>
                  <div className="contact-value">Bengaluru, India</div>
                </div>
              </div>
            </div>

            <div className="contact-sla">
              <div className="incident-title">RESPONSE SLA</div>
              <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
                <div>
                  <div style={{ color: "var(--cyan)", fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>&lt;2h</div>
                  <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.08em" }}>CRITICAL</div>
                </div>
                <div>
                  <div style={{ color: "var(--yellow)", fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>&lt;8h</div>
                  <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.08em" }}>HIGH</div>
                </div>
                <div>
                  <div style={{ color: "var(--green)", fontSize: 18, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>&lt;24h</div>
                  <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.08em" }}>GENERAL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="form-card" style={{ maxWidth: "none" }}>
            <div className="form-terminal-bar">
              <div className="t-dot t-red" />
              <div className="t-dot t-yellow" />
              <div className="t-dot t-green" />
              <span className="terminal-title">ghost — secure message channel</span>
            </div>

            <div className="form-body">
              {submitted ? (
                <div className="form-success-block">
                  <div style={{ fontSize: 28, marginBottom: 12 }}>✓</div>
                  <h2 className="form-title" style={{ fontSize: 20 }}>
                    Message Sent
                  </h2>
                  <p className="form-desc" style={{ marginBottom: 24 }}>
                    Your message has been encrypted and transmitted to our
                    security team.
                  </p>
                  <div className="terminal" style={{ textAlign: "left", marginBottom: 24 }}>
                    <div className="terminal-body" style={{ padding: 16 }}>
                      <div className="t-success">[ OK ] Message encrypted &amp; delivered</div>
                      <div className="t-success">[ OK ] Ticket #GHOST-{Math.floor(1000 + Math.random() * 9000)} created</div>
                      <div className="t-out">[ INFO ] Expected response: &lt;24h</div>
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
                      <label className="form-label">YOUR NAME</label>
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
                      <label className="form-label">EMAIL</label>
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

                  <div className="form-group">
                    <label className="form-label">SUBJECT</label>
                    <select
                      className="form-input"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      required
                    >
                      <option value="">Select a topic...</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">MESSAGE</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Describe your request or question..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 12 }}>
                    Send Secure Message →
                  </button>

                  <p className="form-footer">
                    Need a demo instead?{" "}
                    <Link href="/demo" className="form-link">Schedule one here</Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="page-footer-text">
          All communications are AES-256 encrypted · SOC 2 Compliant
        </div>
      </div>
    </>
  );
}
