import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const STATS = [
  { value: '50K+', label: 'Patients Served' },
  { value: '200+', label: 'Doctors Onboarded' },
  { value: '12', label: 'Core Modules' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const FEATURES = [
  {
    icon: '🔐',
    title: 'Secure Authentication',
    desc: 'JWT-based login with refresh tokens and role-based access control across 9 staff levels.',
    color: '#3b82f6',
  },
  {
    icon: '📋',
    title: 'Electronic Medical Records',
    desc: 'Securely manage, upload, and retrieve lab reports, X-Rays, MRIs, and diagnoses.',
    color: '#10b981',
  },
  {
    icon: '🧪',
    title: 'Laboratory Management',
    desc: 'Digital workflow from doctor order to sample collection, testing, and report upload.',
    color: '#f97316',
  },
  {
    icon: '💊',
    title: 'Pharmacy Inventory',
    desc: 'Real-time medication stock tracking with expiry date monitoring and alerts.',
    color: '#ec4899',
  },
  {
    icon: '📅',
    title: 'Appointment System',
    desc: 'Book, confirm, and track appointments through a full status lifecycle.',
    color: '#8b5cf6',
  },
  {
    icon: '💰',
    title: 'Billing & Payments',
    desc: 'Unified invoicing for consultations, labs, pharmacy, and admissions. UPI, Card & Cash.',
    color: '#06b6d4',
  },
  {
    icon: '🛏️',
    title: 'Inpatient Admission',
    desc: 'Ward & room assignment, live bed availability, and patient admission/discharge tracking.',
    color: '#f59e0b',
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    desc: 'Admin dashboards with revenue trends, doctor utilization rates, and bed occupancy graphs.',
    color: '#6366f1',
  },
];

const AI_FEATURES = [
  {
    icon: '🔬',
    title: 'Symptom Analyzer',
    role: 'Patient',
    desc: 'Analyzes symptoms to suggest possible conditions, urgency levels, and the right department to visit.',
    color: '#3b82f6',
  },
  {
    icon: '📖',
    title: 'EMR Summarizer',
    role: 'Doctor',
    desc: 'Condenses long patient histories into brief highlights — active diseases, surgeries, and allergies.',
    color: '#10b981',
  },
  {
    icon: '💊',
    title: 'Prescription Explainer',
    role: 'Patient',
    desc: 'Translates complex medical prescriptions into simple, easy-to-understand language.',
    color: '#8b5cf6',
  },
  {
    icon: '📅',
    title: 'Appointment Assistant',
    role: 'Patient',
    desc: 'Conversational AI to find open time slots and available specialists using natural language.',
    color: '#06b6d4',
  },
  {
    icon: '📈',
    title: 'Operations Dashboard',
    role: 'Admin',
    desc: 'Analyzes monthly trends in revenue and patient volume to surface actionable business insights.',
    color: '#f59e0b',
  },
];

const ROLES = [
  { role: 'Patient', icon: '🙍', desc: 'Book appointments, access AI health tools, view your medical history.' },
  { role: 'Doctor', icon: '👨‍⚕️', desc: 'View patient records, write diagnoses, and get AI-powered summaries.' },
  { role: 'Hospital Admin', icon: '🏥', desc: 'Manage staff, view analytics, and control hospital operations.' },
  { role: 'Lab Technician', icon: '🧫', desc: 'Track test samples, update statuses, and upload lab reports.' },
  { role: 'Pharmacist', icon: '💊', desc: 'Monitor inventory, track expiry dates, and verify prescriptions.' },
];

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const numeric = parseInt(target.replace(/\D/g, ''), 10);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(numeric / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [numeric]);

  return <>{count.toLocaleString()}{target.includes('+') ? '+' : target.includes('%') ? '%' : ''}</>;
}

export default function LandingPage() {
  const [activeAI, setActiveAI] = useState(0);

  return (
    <div className="landing">
      {/* ── NAVBAR ── */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="landing-logo-text">MedCore HMS</span>
          </div>
          <nav className="landing-nav-links">
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#ai" className="landing-nav-link">AI Tools</a>
            <a href="#roles" className="landing-nav-link">Who It's For</a>
          </nav>
          <div className="landing-nav-cta">
            <Link to="/login" className="landing-btn-ghost" id="nav-login-btn">Sign In</Link>
            <Link to="/register" className="landing-btn-primary" id="nav-register-btn">Get Started</Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              AI-Powered Healthcare Platform
            </span>
          </div>

          <h1 className="hero-title">
            The Future of
            <span className="hero-title-gradient"> Hospital Management</span>
            <br />is Here.
          </h1>

          <p className="hero-desc">
            MedCore HMS centralizes patient care, staff workflows, lab management, pharmacy, and billing — all powered by intelligent AI assistants designed for modern healthcare.
          </p>

          <div className="hero-cta">
            <Link to="/register" className="hero-btn-primary" id="hero-register-btn">
              Start for Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/login" className="hero-btn-ghost" id="hero-login-btn">
              Sign In to Dashboard
            </Link>
          </div>

          <div className="hero-trust">
            <span className="hero-trust-label">Trusted by hospitals like</span>
            <div className="hero-trust-logos">
              {['Apollo', 'Fortis', 'Max', 'AIIMS', 'Manipal'].map((h) => (
                <span key={h} className="hero-trust-logo">{h}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-card-header">
              <div className="preview-dot red" /><div className="preview-dot amber" /><div className="preview-dot green" />
              <span className="preview-card-title">Admin Dashboard</span>
            </div>
            <div className="preview-stats">
              {[
                { label: 'Patients Today', val: '284', icon: '👥', color: '#3b82f6' },
                { label: 'Revenue', val: '₹2.4L', icon: '💰', color: '#10b981' },
                { label: 'Beds Free', val: '36', icon: '🛏️', color: '#f59e0b' },
                { label: 'Active Staff', val: '142', icon: '👤', color: '#8b5cf6' },
              ].map((s) => (
                <div className="preview-stat" key={s.label} style={{ '--c': s.color }}>
                  <span className="preview-stat-icon">{s.icon}</span>
                  <span className="preview-stat-val">{s.val}</span>
                  <span className="preview-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="preview-ai-bar">
              <span className="preview-ai-icon">🤖</span>
              <span className="preview-ai-text">AI: Revenue down 12% vs last month — high lab cancellations detected</span>
            </div>
            <div className="preview-table-header">
              <span>Recent Staff</span><span className="preview-badge">Live</span>
            </div>
            {[
              { name: 'Dr. Arjun Mehta', role: 'Doctor', status: 'Active' },
              { name: 'Priya Sharma', role: 'Nurse', status: 'Active' },
              { name: 'Rahul Verma', role: 'Lab Tech', status: 'Inactive' },
            ].map((s) => (
              <div className="preview-row" key={s.name}>
                <div className="preview-avatar">{s.name.charAt(0)}</div>
                <div className="preview-row-info">
                  <span className="preview-row-name">{s.name}</span>
                  <span className="preview-row-role">{s.role}</span>
                </div>
                <span className={`preview-status ${s.status === 'Active' ? 'active' : 'inactive'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-section-inner">
          {STATS.map((s) => (
            <div className="landing-stat" key={s.label}>
              <span className="landing-stat-value">
                <AnimatedCounter target={s.value} />
              </span>
              <span className="landing-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" id="features">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Platform Modules</span>
            <h2 className="section-title">Everything a modern hospital needs</h2>
            <p className="section-desc">12 integrated modules that work together to automate hospital operations end-to-end.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title} style={{ '--fc': f.color }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI FEATURES ── */}
      <section className="section ai-section" id="ai">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Artificial Intelligence</span>
            <h2 className="section-title">AI built into every workflow</h2>
            <p className="section-desc">Five specialized AI assistants powered by Google Generative AI — available to every role.</p>
          </div>
          <div className="ai-showcase">
            <div className="ai-tabs">
              {AI_FEATURES.map((a, i) => (
                <button
                  key={a.title}
                  id={`ai-tab-${i}`}
                  className={`ai-tab ${activeAI === i ? 'active' : ''}`}
                  style={{ '--ac': a.color }}
                  onClick={() => setActiveAI(i)}
                >
                  <span className="ai-tab-icon">{a.icon}</span>
                  <div className="ai-tab-text">
                    <span className="ai-tab-title">{a.title}</span>
                    <span className="ai-tab-role">For {a.role}s</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="ai-detail" style={{ '--ac': AI_FEATURES[activeAI].color }}>
              <div className="ai-detail-icon">{AI_FEATURES[activeAI].icon}</div>
              <div className="ai-detail-role">For {AI_FEATURES[activeAI].role}s</div>
              <h3 className="ai-detail-title">{AI_FEATURES[activeAI].title}</h3>
              <p className="ai-detail-desc">{AI_FEATURES[activeAI].desc}</p>
              <div className="ai-demo-box">
                <div className="ai-demo-label">Example output</div>
                {activeAI === 0 && <p className="ai-demo-text">🔬 <strong>Possible conditions:</strong> Viral pharyngitis (high probability), Strep throat (moderate). <strong>Urgency:</strong> Moderate. <strong>Recommended:</strong> ENT / General Medicine department.</p>}
                {activeAI === 1 && <p className="ai-demo-text">📋 <strong>Summary for Patient #4721:</strong> Active — Type 2 Diabetes (2018), Hypertension. Known allergy to Penicillin. Past surgeries: Appendectomy (2015). No recent hospitalization.</p>}
                {activeAI === 2 && <p className="ai-demo-text">💊 <strong>Amoxicillin 500mg:</strong> An antibiotic that fights bacterial infections. Take with food, twice daily for 7 days. Do not skip doses even if you feel better.</p>}
                {activeAI === 3 && <p className="ai-demo-text">📅 <strong>Found 3 open slots</strong> with cardiologists next week: Dr. Mehta — Mon 10 AM, Dr. Singh — Tue 2 PM, Dr. Kapoor — Wed 11 AM. Which works for you?</p>}
                {activeAI === 4 && <p className="ai-demo-text">📉 <strong>Insight:</strong> Revenue dropped 18% in March. Root cause: 34% fewer lab tests ordered. Suggest audit of doctor referral patterns in Cardiology.</p>}
              </div>
              <Link to="/register" className="ai-detail-cta" id={`ai-cta-${activeAI}`}>Try it free →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="section" id="roles">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Role-Based Access</span>
            <h2 className="section-title">Built for every member of your team</h2>
            <p className="section-desc">9-tier role hierarchy ensures every user sees exactly what they need — nothing more, nothing less.</p>
          </div>
          <div className="roles-grid">
            {ROLES.map((r) => (
              <div className="role-card" key={r.role}>
                <span className="role-card-icon">{r.icon}</span>
                <h3 className="role-card-title">{r.role}</h3>
                <p className="role-card-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-bg">
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
        </div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to transform your hospital?</h2>
          <p className="cta-desc">Join thousands of healthcare professionals using MedCore HMS every day.</p>
          <div className="cta-actions">
            <Link to="/register" className="hero-btn-primary" id="cta-register-btn">
              Create Free Account
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/login" className="hero-btn-ghost" id="cta-login-btn">Sign In</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="landing-logo-text">MedCore HMS</span>
          </div>
          <p className="footer-copy">© 2026 MedCore HMS · AI-Powered Hospital Healthcare Management System</p>
          <div className="footer-links">
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/register" className="footer-link">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
