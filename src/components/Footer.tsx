
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-pixel-pink bg-pixel-dark shadow-[0_-4px_0_#ffda41]">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <span className="text-pixel-yellow font-pixel text-xl tracking-[0.1em]">ARCADE</span>
          <p className="text-pixel-teal text-sm font-pixel mt-2">
            Awesome Rendering And Coding Engine<br/>
            <span className="text-pixel-pink font-sans">Minimal C library for game development.</span>
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-4 text-pixel-yellow">Documentation</h3>
          <ul className="space-y-2">
            <li><Link to="/docs/getting-started" className="text-pixel-pink hover:text-pixel-yellow text-sm">Getting Started</Link></li>
            <li><Link to="/docs/api-reference" className="text-pixel-pink hover:text-pixel-yellow text-sm">API Reference</Link></li>
            <li><Link to="/docs/tutorials" className="text-pixel-pink hover:text-pixel-yellow text-sm">Tutorials</Link></li>
            <li><Link to="/docs/advanced" className="text-pixel-pink hover:text-pixel-yellow text-sm">Advanced Usage</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4 text-pixel-yellow">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/examples" className="text-pixel-pink hover:text-pixel-yellow text-sm">Code Examples</Link></li>
            <li><a href="https://github.com/" className="text-pixel-pink hover:text-pixel-yellow text-sm" target="_blank" rel="noopener noreferrer">Source Code</a></li>
            <li><a href="#" className="text-pixel-pink hover:text-pixel-yellow text-sm">Community</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4 text-pixel-yellow">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-pixel-pink hover:text-pixel-yellow text-sm">License</a></li>
            <li><a href="#" className="text-pixel-pink hover:text-pixel-yellow text-sm">Privacy Policy</a></li>
            <li><a href="#" className="text-pixel-pink hover:text-pixel-yellow text-sm">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container border-t border-pixel-teal py-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-pixel-teal text-sm font-pixel">© 2025 ARCADE. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="text-pixel-pink hover:text-pixel-yellow text-sm font-pixel">Twitter</a>
          <a href="#" className="text-pixel-pink hover:text-pixel-yellow text-sm font-pixel">Discord</a>
          <a href="https://github.com/" className="text-pixel-pink hover:text-pixel-yellow text-sm font-pixel" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
