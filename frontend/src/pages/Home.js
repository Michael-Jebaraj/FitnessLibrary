import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="#007bff" />
        <rect x="7" y="9" width="2" height="6" fill="#fff" />
        <rect x="11" y="7" width="2" height="8" fill="#fff" />
        <rect x="15" y="11" width="2" height="4" fill="#fff" />
      </svg>
    ),
    title: "Track Workouts",
    desc: "Log your exercises and watch your strength grow."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#28a745" />
        <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Monitor Progress",
    desc: "Visualize your journey with easy-to-read stats."
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="16" rx="2" fill="#ff9800" />
        <circle cx="12" cy="10" r="3" fill="#fff" />
        <rect x="9" y="15" width="6" height="2" fill="#fff" />
      </svg>
    ),
    title: "Set Goals",
    desc: "Stay motivated by setting and achieving goals."
  }
];

const howItWorks = [
  { step: "Sign Up", desc: "Create your account in seconds." },
  { step: "Set Your Goals", desc: "Personalize your fitness journey." },
  { step: "Track Workouts", desc: "Log exercises and monitor progress." },
  { step: "Achieve Results", desc: "Stay motivated and reach new heights!" }
];

const testimonials = [
  { name: "Alex", text: "This app transformed my fitness journey!", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Priya", text: "I love tracking my workouts and seeing progress.", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Carlos", text: "The clean interface keeps me coming back!", avatar: "https://randomuser.me/api/portraits/men/31.jpg" }
];

const stats = [
  {
    label: "Workouts Logged",
    value: Math.floor(Math.random() * 5000 + 10000) // 10,000–15,000
  },
  {
    label: "Active Users",
    value: Math.floor(Math.random() * 1500 + 1000) // 1,000–2,500
  },
  {
    label: "Calories Burned",
    value: Math.floor(Math.random() * 100000 + 100000) // 100,000–200,000
  }
];


const AnimatedStatCard = ({ value, label, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const increment = Math.ceil(end / (duration / 16));
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  const formatted = count.toLocaleString();

  return (
    <div className="stat-card">
      <div className="stat-number">{formatted}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  return (
    <div className="home-bg-trainerize">
      <div className="hero-trainerize">
        <div className="hero-content-trainerize">
          <h1 className="hero-title-trainerize">FitnessLibrary</h1>
          <h2 className="hero-subtitle-trainerize">
            Achieve your best self.<br />One workout at a time.
          </h2>
          <button
            className="get-started-btn-trainerize"
            onClick={() => navigate("/login")}
          >
            Get Started <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <section className="stats-section">
        <h2 className="section-title">FitnessLibrary by the Numbers</h2>
        <div className="stats-row">
          {stats.map((s, idx) => (
            <AnimatedStatCard key={idx} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <section className="demo-section">
        <h2 className="section-title">See FitnessLibrary in Action</h2>
        <div className="demo-video-wrapper">
          <video controls width="420" poster="/demo-poster.png">
            <source src="/FitnessLibrary.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <div className="features-row-trainerize">
        {features.map((f, idx) => (
          <div className="feature-card-trainerize" key={idx}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="how-it-works-steps">
          {howItWorks.map((step, idx) => (
            <div className="how-step" key={idx}>
              <div className="how-step-number">{idx + 1}</div>
              <div className="how-step-title">{step.step}</div>
              <div className="how-step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-list">
          {testimonials.map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <img className="testimonial-avatar" src={t.avatar} alt={t.name} />
              <div className="testimonial-text">"{t.text}"</div>
              <div className="testimonial-name">- {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay in the loop</h2>
        <p>Subscribe for updates, tips, and exclusive fitness content. No spam ever.</p>
        <form
          className="newsletter-form"
          onSubmit={e => {
            e.preventDefault();
            setNewsletterEmail("");
          }}
        >
          <input
            type="email"
            className="newsletter-input"
            placeholder="Your email address"
            required
            value={newsletterEmail}
            onChange={e => setNewsletterEmail(e.target.value)}
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </section>

      <section className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <form
          className="contact-form"
          onSubmit={e => {
            e.preventDefault();
            setContactForm({ name: "", email: "", message: "" });
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={contactForm.name}
            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={contactForm.email}
            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={4}
            value={contactForm.message}
            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
          />
          <button type="submit" className="newsletter-btn">Send Message</button>
        </form>
        <p className="contact-alt">
          Or email us directly at <a href="mailto:support@fitnessLibrary.com">support@fitnessLibrary.com</a>
        </p>
      </section>

      <footer className="footer-trainerize">
        <div className="footer-container">
          <div className="footer-about">
            <h3>About Us</h3>
            <p>
              FitnessLibrary is dedicated to helping you achieve your fitness goals with simplicity, motivation, and insightful tracking. Built with passion by a team of fitness enthusiasts and software developers.
            </p>
          </div>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span> | </span>
            <Link to="/terms-of-service">Terms of Service</Link>
            <span> | </span>
            <Link to="/accessibility">Accessibility Statement</Link>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} FitnessLibrary. All rights reserved. | Designed by J Michael Jebaraj ✌️😎
        </div>
      </footer>
    </div>
  );
};

export default Home;
