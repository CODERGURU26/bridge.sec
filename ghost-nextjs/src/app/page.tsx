"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

interface TermLine {
  text: string;
  className: string;
}

const COMMAND_SEQUENCES: { cmd: string; output: TermLine[] }[] = [
  {
    cmd: "monitor --all-endpoints --behavioral",
    output: [
      { text: "[ OK ] Monitoring 247 endpoints across 3 zones", className: "t-out" },
      { text: "[ OK ] AI threat engine active · Precision AI™ v2.4", className: "t-out" },
      { text: "", className: "t-spacer" },
      { text: "[ ALERT ] Behavioral anomaly on WS-FINANCE-07", className: "t-alert" },
      { text: "  ↳ Rapid file encryption pattern detected (1,200 files/sec)", className: "t-alert" },
      { text: "  ↳ Shadow copy deletion attempt intercepted", className: "t-alert" },
      { text: "  ↳ C2 beacon to 185.220.101.42 blocked", className: "t-alert" },
    ],
  },
  {
    cmd: "respond --playbook RANSOMWARE_CONTAIN --target WS-FINANCE-07",
    output: [
      { text: "[ ACTION ] Endpoint isolated from network in 0.3s", className: "t-success" },
      { text: "[ ACTION ] Forensic snapshot created", className: "t-success" },
      { text: "[ ACTION ] Incident report filed · SIEM notified", className: "t-success" },
      { text: "[ INFO ] 0 files encrypted · Attack neutralized", className: "t-warn" },
    ],
  },
  {
    cmd: "scan --deep --target SRV-DB-01 --entropy-check",
    output: [
      { text: "[ SCAN ] Analyzing 12,847 files on SRV-DB-01...", className: "t-out" },
      { text: "[ OK ] Entropy analysis: normal (no encryption detected)", className: "t-success" },
      { text: "[ OK ] Registry integrity verified", className: "t-success" },
      { text: "[ WARN ] Outdated SMB signing · recommend patch KB5034441", className: "t-warn" },
      { text: "[ OK ] No lateral movement indicators found", className: "t-success" },
    ],
  },
  {
    cmd: "investigate --incident INC-2024-0847 --ai-summary",
    output: [
      { text: "[ AI ] Correlating 847 events across 14 data sources...", className: "t-out" },
      { text: "[ AI ] Attack vector: phishing email → macro → PowerShell", className: "t-alert" },
      { text: "[ AI ] Threat actor: likely LockBit 3.0 affiliate", className: "t-alert" },
      { text: "[ AI ] Confidence: 94.2% · 12 IOCs extracted", className: "t-warn" },
      { text: "[ OK ] Full investigation report generated", className: "t-success" },
    ],
  },
  {
    cmd: "deploy --honeypots 5 --zone FINANCE --canary-files",
    output: [
      { text: "[ DEPLOY ] Spinning up 5 deception endpoints...", className: "t-out" },
      { text: "[ OK ] HoneyDB-FIN-01 active · fake credentials planted", className: "t-success" },
      { text: "[ OK ] Canary files deployed to 32 shared drives", className: "t-success" },
      { text: "[ OK ] Network tripwires configured on VLAN 40-42", className: "t-success" },
      { text: "[ INFO ] Deception mesh active · waiting for adversary", className: "t-warn" },
    ],
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [terminalLines, setTerminalLines] = useState<TermLine[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<boolean>(true);

  const scrollTerminal = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    animationRef.current = true;

    const sleep = (ms: number) => new Promise<void>((r) => {
      const id = setTimeout(r, ms);
      return () => clearTimeout(id);
    });

    const typeCmd = async (cmd: string) => {
      for (let i = 0; i <= cmd.length; i++) {
        if (!animationRef.current) return;
        setCurrentTyping(cmd.slice(0, i));
        await sleep(30 + Math.random() * 25);
      }
    };

    const addLine = (line: TermLine) => {
      setTerminalLines((prev) => [...prev, line]);
    };

    const runLoop = async () => {
      while (animationRef.current) {
        for (const seq of COMMAND_SEQUENCES) {
          if (!animationRef.current) return;

          // Type the command
          await typeCmd(seq.cmd);
          await sleep(400);

          // "Enter" – move command to history
          addLine({ text: `ghost› ${seq.cmd}`, className: "t-line-history" });
          setCurrentTyping("");

          // Show output lines one by one
          for (const line of seq.output) {
            if (!animationRef.current) return;
            await sleep(120 + Math.random() * 180);
            addLine(line);
            scrollTerminal();
          }

          // Pause between commands
          await sleep(1800);
        }

        // Clear and restart
        if (!animationRef.current) return;
        await sleep(1200);
        setTerminalLines([]);
        setCurrentTyping("");
      }
    };

    runLoop();

    return () => {
      animationRef.current = false;
    };
  }, [scrollTerminal]);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, i * 50);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Counter animation
    const counters = document.querySelectorAll(".stat-num");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const text = el.textContent || "";
            const num = parseFloat(text.replace(/[^0-9.]/g, ""));
            const suffix = text.replace(/[0-9.]/g, "");
            if (num && !isNaN(num)) {
              let start = 0;
              const duration = 1200;
              const step = 16;
              const increment = num / (duration / step);
              const timer = setInterval(() => {
                start += increment;
                if (start >= num) {
                  el.textContent = text;
                  clearInterval(timer);
                } else {
                  el.textContent =
                    (num < 10 ? start.toFixed(1) : Math.floor(start).toString()) + suffix;
                }
              }, step);
            }
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));

    // Threat node cycling
    const threatNode = document.querySelector(
      ".map-node.threat .node-status"
    ) as HTMLElement;
    const statuses = ["⚠ CRITICAL", "🔒 ISOLATING...", "✓ CONTAINED"];
    const classes = ["danger", "danger", "safe"];
    let si = 0;
    const cycleInterval = setInterval(() => {
      si = (si + 1) % statuses.length;
      if (threatNode) {
        threatNode.textContent = statuses[si];
        threatNode.className = "node-status " + classes[si];
      }
    }, 2500);

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#">
          <div className="logo-icon">G</div>
          <span className="logo-text">GHOST</span>
        </a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How_It_Works</a></li>
          <li><a href="#modules">Modules</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#resources">Resources</a></li>
        </ul>
        <div className="nav-actions">
          <Link href="/signin"><button className="btn-ghost">Sign In</button></Link>
          <Link href="/register"><button className="btn-primary">Register</button></Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow-red" />

        <div className="hero-split">
          {/* LEFT: Text Content */}
          <div className="hero-text-side">
            <div className="hero-badge">
              <div className="badge-dot" />
              AI-Powered Threat Detection · Real-Time
            </div>

            <h1>
              Stop <span className="danger">Ransomware</span>
              <br />
              Before It <span className="accent">Haunts</span> You
            </h1>

            <p className="hero-sub">
              GHOST uses behavioral analysis, deception technology, and AI
              investigations to detect, contain, and eliminate ransomware threats —
              before encryption begins.
            </p>

            <div className="hero-actions">
              <Link href="/demo"><button className="btn-primary btn-large">Request a Demo</button></Link>
              <button className="btn-outline-large" onClick={() => scrollTo("how")}>View Live Dashboard →</button>
            </div>
          </div>

          {/* RIGHT: Terminal */}
          <div className="hero-terminal-side">
            <div className="terminal-wrap">
              <div className="terminal">
                <div className="terminal-bar">
                  <div className="t-dot t-red" />
                  <div className="t-dot t-yellow" />
                  <div className="t-dot t-green" />
                  <div className="terminal-title">
                    ghost — real-time behavioral engine v2.4.1
                  </div>
                </div>
                <div className="terminal-body" ref={terminalRef}>
                  {terminalLines.map((line, i) => (
                    <div key={i} className={line.className}>
                      {line.text}
                    </div>
                  ))}
                  <div className="t-line">
                    <span className="t-prompt">ghost›</span>
                    <span className="t-cmd">
                      {currentTyping}<span className="t-blink" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat-item reveal">
          <div className="stat-num">0.3s</div>
          <div className="stat-label">Mean Time to Contain</div>
        </div>
        <div className="stat-item reveal">
          <div className="stat-num">247+</div>
          <div className="stat-label">Endpoints Protected</div>
        </div>
        <div className="stat-item reveal">
          <div className="stat-num">99.8%</div>
          <div className="stat-label">Detection Accuracy</div>
        </div>
        <div className="stat-item reveal">
          <div className="stat-num">24/7</div>
          <div className="stat-label">AI-Driven Monitoring</div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="features-header reveal">
          <div className="section-tag">Core Capabilities</div>
          <h2 className="section-title">
            Defense <span className="cyan">at every layer</span>
          </h2>
          <p className="section-desc">
            From endpoint to network, GHOST provides continuous, AI-driven
            protection against modern ransomware and advanced persistent
            threats.
          </p>
        </div>

        <div className="features-grid reveal">
          <div className="feat-card">
            <div className="feat-icon">🧠</div>
            <div className="feat-title">AI Behavioral Analysis</div>
            <div className="feat-desc">
              Monitors process behavior, file system entropy, and network
              patterns in real-time to detect ransomware before encryption
              begins — no signatures required.
            </div>
            <span className="feat-tag">Precision AI™</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon red-icon">🎯</div>
            <div className="feat-title">Deception Technology</div>
            <div className="feat-desc">
              Deploy honeypots, fake credentials, and canary files that lure
              attackers into revealing themselves — turning your network into a
              trap.
            </div>
            <span className="feat-tag">Active Defense</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon">⚡</div>
            <div className="feat-title">Automated Playbooks</div>
            <div className="feat-desc">
              Pre-built incident response workflows trigger automatically on
              detection — isolating endpoints, capturing forensics, and
              notifying your SOC team instantly.
            </div>
            <span className="feat-tag">Zero-Touch IR</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon">🔍</div>
            <div className="feat-title">AI Investigations</div>
            <div className="feat-desc">
              Ghost AI correlates alerts, traces attack chains, and delivers
              comprehensive investigation reports in natural language — powered
              by Gemini.
            </div>
            <span className="feat-tag">LLM-Powered</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon">🌐</div>
            <div className="feat-title">Threat Intelligence</div>
            <div className="feat-desc">
              Real-time IOC feeds, threat actor profiles, and geolocation
              mapping keep your defenses ahead of the latest ransomware groups
              and zero-days.
            </div>
            <span className="feat-tag">Live Feeds</span>
          </div>

          <div className="feat-card">
            <div className="feat-icon">🧬</div>
            <div className="feat-title">Digital Forensics</div>
            <div className="feat-desc">
              Capture memory dumps, process trees, registry artifacts, and
              network logs for post-incident analysis, legal compliance, and
              insurance claims.
            </div>
            <span className="feat-tag">Full Chain-of-Custody</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="how-grid">
          <div>
            <div className="section-tag reveal">How It Works</div>
            <h2 className="section-title reveal">
              See, Stop, <span className="cyan">Survive</span>
            </h2>
            <p className="section-desc reveal">
              GHOST&apos;s three-phase defense model gives your team complete
              visibility and control — from first detection to full recovery.
            </p>

            <div className="how-steps">
              <div className="step-item reveal">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h3>Continuous Endpoint Monitoring</h3>
                  <p>
                    Lightweight agents on every endpoint stream behavioral
                    telemetry — process trees, file activity, network
                    connections — into the GHOST cloud engine 24/7.
                  </p>
                </div>
              </div>
              <div className="step-item reveal">
                <div className="step-num">02</div>
                <div className="step-content">
                  <h3>AI Threat Correlation</h3>
                  <p>
                    The Precision AI engine correlates signals across endpoints,
                    identifies kill-chain progression, and scores threats with
                    full context in milliseconds.
                  </p>
                </div>
              </div>
              <div className="step-item reveal">
                <div className="step-num">03</div>
                <div className="step-content">
                  <h3>Automated Containment</h3>
                  <p>
                    On critical detections, playbooks auto-execute — isolating
                    the host, killing malicious processes, and preserving
                    forensic evidence without human delay.
                  </p>
                </div>
              </div>
              <div className="step-item reveal">
                <div className="step-num">04</div>
                <div className="step-content">
                  <h3>AI-Guided Recovery</h3>
                  <p>
                    Ghost AI generates step-by-step remediation guidance,
                    identifies lateral movement, and produces board-ready
                    incident reports automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="how-visual reveal">
            <div className="threat-map">
              <div className="map-title">
                // live endpoint threat map · zone: corporate
              </div>
              <div className="map-grid">
                <div className="map-node threat">
                  <div className="node-label">WS-FINANCE-07</div>
                  <div className="node-status danger">⚠ CRITICAL</div>
                  <div className="node-bar">
                    <div className="node-fill danger-fill" />
                  </div>
                </div>
                <div className="map-node">
                  <div className="node-label">SRV-DB-01</div>
                  <div className="node-status warning">● ELEVATED</div>
                  <div className="node-bar">
                    <div className="node-fill warn-fill" />
                  </div>
                </div>
                <div className="map-node clean">
                  <div className="node-label">WS-DEV-14</div>
                  <div className="node-status safe">✓ CLEAN</div>
                  <div className="node-bar">
                    <div className="node-fill safe-fill" />
                  </div>
                </div>
                <div className="map-node clean">
                  <div className="node-label">WS-HR-03</div>
                  <div className="node-status safe">✓ CLEAN</div>
                  <div className="node-bar">
                    <div className="node-fill safe-fill" />
                  </div>
                </div>
                <div className="map-node clean">
                  <div className="node-label">SRV-FILE-02</div>
                  <div className="node-status safe">✓ CLEAN</div>
                  <div className="node-bar">
                    <div className="node-fill safe-fill" />
                  </div>
                </div>
                <div className="map-node clean">
                  <div className="node-label">WS-EXEC-01</div>
                  <div className="node-status safe">✓ CLEAN</div>
                  <div className="node-bar">
                    <div className="node-fill safe-fill" />
                  </div>
                </div>
              </div>

              <div className="incident-box">
                <div className="incident-title">
                  ACTIVE INCIDENT · #INC-2024-0847
                </div>
                <div className="incident-desc">
                  Ransomware pre-execution blocked on WS-FINANCE-07. Playbook{" "}
                  <strong style={{ color: "#d0d8e8" }}>
                    RANSOMWARE_CONTAIN
                  </strong>{" "}
                  executed. 0 files encrypted.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-tag">Threat Center Modules</div>
          <h2 className="section-title">
            Every threat vector. <span className="cyan">Covered.</span>
          </h2>
          <p
            className="section-desc"
            style={{ margin: "16px auto 0" }}
          >
            Fourteen specialized modules work together as one unified platform —
            replacing a dozen point solutions.
          </p>
        </div>

        <div className="modules-grid reveal">
          {[
            { icon: "📊", name: "Dashboard", desc: "Live SOC overview with risk score, active alerts, and endpoint health" },
            { icon: "🚨", name: "Alerts", desc: "Triaged, prioritized alerts with auto-classification and one-click response" },
            { icon: "💻", name: "Endpoints", desc: "Full visibility into every device: CPU, memory, threats, isolation status" },
            { icon: "⚡", name: "Playbooks", desc: "Visual automation builder for IR workflows with conditional branching" },
            { icon: "🤖", name: "AI Briefing", desc: "Daily AI-generated threat intelligence briefings tailored to your industry" },
            { icon: "🧪", name: "AI Investigations", desc: "LLM-powered attack chain reconstruction and evidence correlation" },
            { icon: "💀", name: "Ransomware Center", desc: "Dedicated dashboard for ransomware campaigns, decryption tracking, and recovery" },
            { icon: "🐛", name: "Vulnerabilities", desc: "CVE tracking, exploit likelihood scoring, and patch prioritization" },
          ].map((m, i) => (
            <div className="module-card" key={i}>
              <div className="module-icon">{m.icon}</div>
              <div className="module-name">{m.name}</div>
              <div className="module-desc">{m.desc}</div>
            </div>
          ))}
        </div>

        <div className="threat-row reveal">
          <div className="threat-stat up">
            <div className="t-stat-num red">73%</div>
            <div className="t-stat-lbl">
              YoY increase in ransomware attacks — GHOST stops them before
              impact
            </div>
          </div>
          <div className="threat-stat up">
            <div className="t-stat-num red">56%</div>
            <div className="t-stat-lbl">
              Rise in exploited zero-days — real-time behavioral detection
              catches unknowns
            </div>
          </div>
          <div className="threat-stat down">
            <div className="t-stat-num green">90%</div>
            <div className="t-stat-lbl">
              Reduction in mean time to respond — automated playbooks vs.
              manual SOC
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        style={{
          background: "var(--surface)",
          borderTop: "2px solid var(--border-hard)",
        }}
      >
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-tag">Pricing</div>
          <h2 className="section-title">
            Simple, <span className="cyan">transparent</span> plans
          </h2>
          <p
            className="section-desc"
            style={{ margin: "16px auto 0" }}
          >
            Start free. Scale as you grow. No hidden fees, no per-module
            pricing.
          </p>
        </div>

        <div className="pricing-grid reveal">
          <div className="price-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">
              <sup>$</sup>49<span>/mo</span>
            </div>
            <div className="plan-desc">
              Perfect for small teams and growing businesses
            </div>
            <ul className="plan-features">
              <li>Up to 25 endpoints</li>
              <li>Real-time behavioral monitoring</li>
              <li>Basic alert management</li>
              <li>3 automated playbooks</li>
              <li>Email &amp; Slack notifications</li>
              <li>7-day forensic retention</li>
            </ul>
            <button
              className="btn-ghost"
              style={{ width: "100%", padding: "12px", fontSize: "12px" }}
              onClick={() => scrollTo("resources")}
            >
              Get Started
            </button>
          </div>

          <div className="price-card featured">
            <div className="price-badge">Most Popular</div>
            <div className="plan-name">Professional</div>
            <div className="plan-price">
              <sup>$</sup>149<span>/mo</span>
            </div>
            <div className="plan-desc">
              For security-focused teams that need full SOC capability
            </div>
            <ul className="plan-features">
              <li>Up to 250 endpoints</li>
              <li>AI Investigations module</li>
              <li>Deception honeypots (10)</li>
              <li>Unlimited playbooks</li>
              <li>Threat Intelligence feeds</li>
              <li>Digital Forensics module</li>
              <li>Ghost AI Assistant</li>
              <li>30-day forensic retention</li>
            </ul>
            <button
              className="btn-primary"
              style={{ width: "100%", padding: "12px", fontSize: "12px" }}
              onClick={() => scrollTo("resources")}
            >
              Start Free Trial
            </button>
          </div>

          <div className="price-card">
            <div className="plan-name">Enterprise</div>
            <div
              className="plan-price"
              style={{ fontSize: "28px", paddingTop: "8px" }}
            >
              Custom
            </div>
            <div className="plan-desc">
              Tailored deployment for large enterprises and MSSPs
            </div>
            <ul className="plan-features">
              <li>Unlimited endpoints</li>
              <li>On-premise or hybrid deployment</li>
              <li>Custom AI model fine-tuning</li>
              <li>Dedicated incident response team</li>
              <li>SIEM / SOAR integrations</li>
              <li>SLA guarantees</li>
              <li>Compliance reporting (ISO, SOC2)</li>
              <li>90-day forensic retention</li>
            </ul>
            <button
              className="btn-ghost"
              style={{ width: "100%", padding: "12px", fontSize: "12px" }}
              onClick={() => scrollTo("resources")}
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="resources">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-tag">Customer Stories</div>
          <h2 className="section-title">
            Trusted by <span className="cyan">security teams</span>
          </h2>
        </div>

        <div className="testi-grid reveal">
          {[
            {
              text: '"GHOST caught a ransomware pre-execution that our legacy EDR completely missed. The deception module lured the attacker, and the playbook isolated the host in under a second. Zero files lost."',
              initials: "RK",
              name: "Rajiv Khanna",
              role: "CISO, FinTech India",
            },
            {
              text: '"The AI Investigations module cuts our incident analysis time from 3 days to under 2 hours. Ghost AI writes better incident reports than our junior analysts. It\'s genuinely impressive."',
              initials: "SM",
              name: "Shreya Mehta",
              role: "Head of Security Ops, Healthcare Group",
            },
            {
              text: '"We evaluated Seqrite and Palo Alto before choosing GHOST. Nothing else offered behavioral analysis, honeypots, and AI investigations at this price point. A complete SOC in a box."',
              initials: "AT",
              name: "Arjun Trivedi",
              role: "IT Director, Manufacturing Enterprise",
            },
          ].map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="section-tag" style={{ position: "relative" }}>
            Get Protected Today
          </div>
          <h2>
            Don&apos;t wait for the ransom note.
            <br />
            <span style={{ color: "var(--cyan)" }}>Start your free trial.</span>
          </h2>
          <p>
            Join hundreds of security teams who&apos;ve replaced reactive
            incident response with proactive AI-driven defense. 14-day free
            trial. No credit card required.
          </p>
          <div className="cta-actions">
            <Link href="/demo">
              <button className="btn-primary btn-large">
                Start Free 14-Day Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="btn-outline-large">
                Schedule a Live Demo
              </button>
            </Link>
          </div>
          <div className="cta-compliance">
            SOC 2 Type II · ISO 27001 · GDPR Compliant · India Data Residency
            Available
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: 0 }}>
              <div className="logo-icon">G</div>
              <span className="logo-text">GHOST</span>
            </div>
            <p>
              AI-powered ransomware detection and response. Protecting
              endpoints, networks, and data for modern enterprises.
            </p>
            <div className="compliance-badges">
              <span className="compliance-badge">SOC 2</span>
              <span className="compliance-badge">ISO 27001</span>
              <span className="compliance-badge">GDPR</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Modules</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">API Docs</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><a href="#">BFSI</a></li>
              <li><a href="#">Healthcare</a></li>
              <li><a href="#">Government</a></li>
              <li><a href="#">Manufacturing</a></li>
              <li><a href="#">MSSP</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Threat Reports</a></li>
              <li><a href="#">Partners</a></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2024 GHOST Security. All rights reserved.</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
    </>
  );
}
