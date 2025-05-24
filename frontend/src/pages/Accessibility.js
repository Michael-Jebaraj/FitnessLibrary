import React from "react";
import "./LegalPage.css";

const Accessibility = () => (
  <div className="legal-bg">
    <div className="legal-container">
      <h1 className="legal-title">Accessibility Statement</h1>
      <p className="legal-text">Last Updated: 23-05-2025</p>

      <h2 className="legal-section-title">1. Our Commitment</h2>
      <p className="legal-text">
        At FitnessLibrary, we are committed to ensuring digital accessibility for all users, including those with disabilities. We are continuously improving the user experience and applying the relevant accessibility standards.
      </p>

      <h2 className="legal-section-title">2. Measures to Support Accessibility</h2>
      <ul className="legal-list">
        <li>Using semantic HTML for clear structure and navigation.</li>
        <li>Providing meaningful alt text for images and icons.</li>
        <li>Ensuring high color contrast for readability.</li>
        <li>Maintaining keyboard navigability throughout the site.</li>
        <li>Using responsive design to support different devices and screen sizes.</li>
      </ul>

      <h2 className="legal-section-title">3. Limitations and Alternatives</h2>
      <p className="legal-text">
        While we strive to make all pages and content fully accessible, some parts of the website may not yet fully meet accessibility standards. We are actively working to fix these issues and provide accessible alternatives whenever possible.
      </p>

      <h2 className="legal-section-title">4. Feedback</h2>
      <p className="legal-text">
        We welcome your feedback on the accessibility of FitnessLibrary. If you encounter any barriers or have suggestions to improve accessibility, please contact us:
        <br />
        <strong>Email:</strong> support@fitnesslibrary.com
      </p>

      <h2 className="legal-section-title">5. Ongoing Improvements</h2>
      <p className="legal-text">
        We regularly review our website and policies to ensure we are meeting accessibility goals. Your support and feedback help us make FitnessLibrary better for everyone.
      </p>
    </div>
  </div>
);

export default Accessibility;
