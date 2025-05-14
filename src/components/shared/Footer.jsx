import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../MyStyles/Footer.css'; 
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-5 bg-dark text-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <h5 className="footer-heading mb-3">CineStream</h5>
            <p className="footer-text">
              Your ultimate destination for movies, TV shows, and entertainment. 
              Discover new content and create your personal watchlist.
            </p>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="footer-heading mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/home" className="footer-link">
                  <i className="bi bi-house-door me-2"></i>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/movies" className="footer-link">
                  <i className="bi bi-film me-2"></i>
                  Movies
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/trending" className="footer-link">
                  <i className="bi bi-fire me-2"></i>
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/userlist" className="footer-link">
                  <i className="bi bi-bookmark-heart me-2"></i>
                  My List
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="footer-heading mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <h5 className="footer-heading mb-3">Connect With Us</h5>
            <div className="social-links d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center mt-5 pt-4 border-top border-secondary">
          <p className="mb-0">
            © {currentYear} CineStream. All rights reserved.<br />
            <small className="text-muted">Movie data powered by TMDB</small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;