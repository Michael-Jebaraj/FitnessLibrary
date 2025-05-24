import React from "react";
import "./LegalPage.css";

const TermsOfService = () => (
  <div className="legal-bg">
    <div className="legal-container">
      <h1 className="legal-title">Terms of Service</h1>
      <p className="legal-text">Last Updated: 23-05-2025</p>

      <h2 className="legal-section-title">1. Acceptance of Terms</h2>
      <p className="legal-text">
        By accessing and using FitnessLibrary, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please do not use our platform.
      </p>

      <h2 className="legal-section-title">2. Eligibility</h2>
      <p className="legal-text">
        You must be at least 13 years old to use FitnessLibrary. By using our platform, you confirm that you meet this requirement.
      </p>

      <h2 className="legal-section-title">3. Account Responsibilities</h2>
      <ul className="legal-list">
        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>You agree to provide accurate and complete information during registration.</li>
        <li>You must notify us immediately if you suspect unauthorized use of your account.</li>
      </ul>

      <h2 className="legal-section-title">4. Use of the Platform</h2>
      <ul className="legal-list">
        <li>You may use FitnessLibrary only for lawful purposes and in accordance with these Terms.</li>
        <li>Do not misuse or attempt to damage, hack, or interfere with the functionality of the platform.</li>
        <li>Do not upload false, misleading, or harmful information.</li>
      </ul>

      <h2 className="legal-section-title">5. Intellectual Property</h2>
      <p className="legal-text">
        All content on FitnessLibrary, including logos, graphics, and code, is the property of FitnessLibrary or its licensors and protected by copyright and trademark laws. You may not use, copy, or distribute any content without permission.
      </p>

      <h2 className="legal-section-title">6. Modifications to Service</h2>
      <p className="legal-text">
        We may modify, suspend, or discontinue any part of the platform at any time, with or without notice. We are not liable for any such changes or service interruptions.
      </p>

      <h2 className="legal-section-title">7. Termination</h2>
      <p className="legal-text">
        We reserve the right to suspend or terminate your access to FitnessLibrary if you violate these Terms or engage in harmful conduct. You may also delete your account at any time.
      </p>

      <h2 className="legal-section-title">8. Limitation of Liability</h2>
      <p className="legal-text">
        FitnessLibrary is not responsible for any injuries, losses, or damages resulting from the use of the platform or reliance on any information provided. Always consult a qualified professional before starting a new fitness program.
      </p>

      <h2 className="legal-section-title">9. Governing Law</h2>
      <p className="legal-text">
        These Terms are governed by the laws of [Your Country/State], without regard to its conflict of law principles.
      </p>

      <h2 className="legal-section-title">10. Contact Us</h2>
      <p className="legal-text">
        If you have any questions about these Terms, please contact us at:
        <br />
        <strong>Email:</strong> support@fitnesslibrary.com
      </p>
    </div>
  </div>
);

export default TermsOfService;
