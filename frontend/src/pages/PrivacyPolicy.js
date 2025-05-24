import React from "react";
import "./LegalPage.css";

const PrivacyPolicy = () => (
  <div className="legal-bg">
    <div className="legal-container">
      <h1 className="legal-title">Privacy Policy</h1>
      <p className="legal-text">Last Updated: 23-05-2025</p>

      <p className="legal-text">
        At <strong>FitnessLibrary</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services.
      </p>

      <h2 className="legal-section-title">1. Information We Collect</h2>
      <ul className="legal-list">
        <li>Name</li>
        <li>Email address</li>
        <li>Password (securely encrypted)</li>
        <li>Age</li>
        <li>Height and weight</li>
        <li>Fitness goals</li>
        <li>Preferred training days</li>
        <li>Any other information you choose to provide</li>
      </ul>

      <h2 className="legal-section-title">2. How We Use Your Information</h2>
      <ul className="legal-list">
        <li>Create and manage your account</li>
        <li>Personalize your fitness experience</li>
        <li>Provide customer support</li>
        <li>Improve our website and services</li>
        <li>Notify you of updates or changes to the platform</li>
      </ul>

      <h2 className="legal-section-title">3. How We Store and Protect Your Information</h2>
      <ul className="legal-list">
        <li>Your data is securely stored on MongoDB Atlas</li>
        <li>Using HTTPS for secure data transmission</li>
        <li>Encrypting passwords before storage</li>
        <li>Limiting access to authorized personnel only</li>
      </ul>

      <h2 className="legal-section-title">4. Sharing of Your Information</h2>
      <p className="legal-text">
        We do not sell, trade, or rent your personal data to third parties. We may only share your data:
      </p>
      <ul className="legal-list">
        <li>With service providers who help us operate the platform (under strict confidentiality)</li>
        <li>If required by law or legal obligation</li>
        <li>To protect our rights and safety</li>
      </ul>

      <h2 className="legal-section-title">5. Your Rights and Choices</h2>
      <ul className="legal-list">
        <li>Access the personal data we hold about you</li>
        <li>Request correction or deletion of your data</li>
        <li>Withdraw your consent at any time by deleting your account</li>
      </ul>
      <p className="legal-text">To exercise any of these rights, contact us at <strong>support@fitnessLibrary.com</strong>.</p>

      <h2 className="legal-section-title">6. Cookies and Tracking</h2>
      <p className="legal-text">
        FitnessLibrary may use cookies or similar technologies to enhance user experience, remember preferences, and gather usage statistics. You can manage cookies through your browser settings.
      </p>

      <h2 className="legal-section-title">7. Third-Party Links</h2>
      <p className="legal-text">
        Our website may contain links to third-party sites. We are not responsible for their privacy practices. We encourage you to read their privacy policies.
      </p>

      <h2 className="legal-section-title">8. Changes to This Privacy Policy</h2>
      <p className="legal-text">
        We may update this policy from time to time. Changes will be posted on this page with a revised "Last Updated" date.
      </p>

      <h2 className="legal-section-title">9. Contact Us</h2>
      <p className="legal-text">
        If you have questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
      </p>
      <p className="legal-text"><strong>Email:</strong> support@fitnessLibrary.com</p>
    </div>
  </div>
);

export default PrivacyPolicy;
