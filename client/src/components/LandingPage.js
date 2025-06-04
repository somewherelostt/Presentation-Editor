import React from "react";
import { FaRocket, FaEdit, FaShare, FaCloud } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app");
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo">PPT Web</div>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Create Beautiful Presentations
            <span className="gradient-text"> in the Browser</span>
          </h1>
          <p className="hero-subtitle">
            A modern, intuitive presentation tool that lets you create, edit,
            and share your slides with ease.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            <FaRocket /> Start Creating
          </button>
        </div>
        <div className="hero-image">
          <div className="floating-slide">
            <div className="slide-content">
              <h2>Welcome to PPT Web</h2>
              <p>Create amazing presentations with ease</p>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section">
        <h2 className="section-title">Why Choose PPT Web?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaEdit />
            </div>
            <h3>Easy Editing</h3>
            <p>Simple markdown-based editing with real-time preview</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShare />
            </div>
            <h3>Instant Sharing</h3>
            <p>Share your presentations with a single click</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCloud />
            </div>
            <h3>Cloud Storage</h3>
            <p>Your presentations are automatically saved in the cloud</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create</h3>
            <p>Start with a blank slide or choose from templates</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Edit</h3>
            <p>Use markdown to format your content</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Present</h3>
            <p>Share your presentation with others</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>PPT Web</h4>
            <p>Create beautiful presentations online</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 PPT Web. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
