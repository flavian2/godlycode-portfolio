import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/godlycode', // TODO: Update with real GitHub URL
      color: '#ffffff'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/godlycode', // TODO: Update with real LinkedIn URL
      color: '#0077B5'
    },
    {
      name: 'Upwork',
      icon: SiUpwork,
      url: 'https://upwork.com/freelancers/godlycode', // TODO: Update with real Upwork URL
      color: '#6FDA44'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:contact@godlycode.com', // TODO: Update with real email
      color: '#D4AF37'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="relative bg-dark-secondary border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold gradient-text">
              GODLYCODE
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-Stack Developer crafting production-grade fintech, logistics, and AI-powered applications from Nigeria for the world.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>🇳🇬</span>
              <span>Based in Nigeria, Building for the World</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-celestial-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white transition-colors inline-block text-sm"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-celestial-gold">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center interactive group"
                  title={social.name}
                >
                  <social.icon
                    className="text-xl text-gray-400 group-hover:text-celestial-gold transition-colors"
                  />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Available for freelance projects and long-term contracts
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Godlycode. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center space-x-2">
              <span>Built with</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              <span>by Godlycode from Nigeria</span>
              <span>🇳🇬</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-celestial-gold opacity-5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-electric-blue opacity-5 blur-3xl rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;
