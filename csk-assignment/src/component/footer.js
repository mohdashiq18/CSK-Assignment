import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo">
          <img src="https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/66daf9668236041a506e46d7_Logo.svg" alt="Unlisted Shares India Logo" />

        </div>
        <div className="links">
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Condition</a>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>

      </div>
      <div className="copyright">
        <p>© 2024. Unlisted Shares India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;