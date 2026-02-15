import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import ScrollReveal from '../components/ScrollReveal';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'contact@godlycode.com', // TODO: Update with real email
      link: 'mailto:contact@godlycode.com',
      color: '#D4AF37'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/godlycode',
      link: 'https://github.com/godlycode', // TODO: Update with real GitHub URL
      color: '#ffffff'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/godlycode',
      link: 'https://linkedin.com/in/godlycode', // TODO: Update with real LinkedIn URL
      color: '#0077B5'
    },
    {
      icon: SiUpwork,
      label: 'Upwork',
      value: 'upwork.com/freelancers/godlycode',
      link: 'https://upwork.com/freelancers/godlycode', // TODO: Update with real Upwork URL
      color: '#6FDA44'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your vision to life with production-ready code.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <ScrollReveal direction="left" delay={0.2}>
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm currently available for freelance projects and long-term contracts. Whether you need a full-stack application, API development, or consulting, I'd love to hear from you.
              </p>

              {/* Location */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 glass p-4 rounded-lg mb-6"
              >
                <div className="p-3 rounded-lg bg-celestial-gold/20">
                  <FaMapMarkerAlt className="text-2xl text-celestial-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-gray-400 text-sm flex items-center space-x-2">
                    <span>🇳🇬</span>
                    <span>Nigeria</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Building for the World</p>
                </div>
              </motion.div>

              {/* Contact Methods */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 glass p-4 rounded-lg group hover:border-celestial-gold/50 transition-all duration-300"
                  >
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: `${contact.color}20` }}
                    >
                      <contact.icon
                        className="text-2xl"
                        style={{ color: contact.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:text-celestial-gold transition-colors">
                        {contact.label}
                      </h3>
                      <p className="text-gray-400 text-sm">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability Badge */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-lg border border-green-500/30"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-500 font-semibold">Available for Projects</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Open to freelance work, contract positions, and full-time opportunities
                </p>
              </motion.div>

              {/* Global Availability */}
              <div className="mt-6 glass p-6 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <span>🌍</span>
                  <span>Global Reach</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  While I'm based in Nigeria, I work with clients worldwide. Time zones are never an issue — I adapt my schedule to ensure seamless collaboration.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>

        {/* Response Time */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 glass px-6 py-4 rounded-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-celestial-gold border-t-transparent rounded-full"
              />
              <span className="text-gray-400">
                I typically respond within <span className="text-celestial-gold font-semibold">24 hours</span>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
