import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showMenu]);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          <img
            src="https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/66daf9668236041a506e46d7_Logo.svg"
            alt="Unlisted Shares India"
          />
        </Link>

        <button className={`hamburger ${showMenu ? 'show' : 'hide'}`} onClick={toggleMenu}>
          <span className="bar top-bar"></span>
          <span className="bar mid-bar"></span>
          <span className="bar bottom-bar"></span>
        </button>

        <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
          <li>
            <Link href="/unlisted-shares" className="nav-link">
              Unlisted Shares
            </Link>
          </li>
          <li>
            <Link href="/our-blogs" className="nav-link">
              Our Blogs
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="nav-link">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
