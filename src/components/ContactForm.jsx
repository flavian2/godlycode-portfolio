import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiUser, HiPencil, HiCurrencyDollar } from 'react-icons/hi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission (email service, API, etc.)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      projectType: '',
      budget: '',
      message: ''
    });
  };

  const projectTypes = [
    'Web Application',
    'Mobile App',
    'E-commerce Platform',
    'API Development',
    'Database Design',
    'Full-Stack Solution',
    'Consulting',
    'Other'
  ];

  const budgetRanges = [
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
    'Not sure yet'
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name Field */}
      <div className="relative">
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-300">
          Your Name
        </label>
        <div className="relative">
          <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-celestial-gold text-xl" />
          <motion.input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            required
            animate={{
              borderColor: focusedField === 'name' ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'
            }}
            className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none transition-all duration-300 text-white"
            placeholder="John Doe"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="relative">
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <HiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-celestial-gold text-xl" />
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            required
            animate={{
              borderColor: focusedField === 'email' ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'
            }}
            className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none transition-all duration-300 text-white"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Project Type Dropdown */}
      <div className="relative">
        <label htmlFor="projectType" className="block text-sm font-semibold mb-2 text-gray-300">
          Project Type
        </label>
        <motion.select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          onFocus={() => setFocusedField('projectType')}
          onBlur={() => setFocusedField(null)}
          required
          animate={{
            borderColor: focusedField === 'projectType' ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'
          }}
          className="w-full px-4 py-4 glass rounded-lg focus:outline-none transition-all duration-300 text-white cursor-pointer"
        >
          <option value="" disabled>Select a project type</option>
          {projectTypes.map((type, index) => (
            <option key={index} value={type} className="bg-dark-secondary">
              {type}
            </option>
          ))}
        </motion.select>
      </div>

      {/* Budget Range Dropdown */}
      <div className="relative">
        <label htmlFor="budget" className="block text-sm font-semibold mb-2 text-gray-300">
          Budget Range
        </label>
        <div className="relative">
          <HiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-celestial-gold text-xl pointer-events-none" />
          <motion.select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            onFocus={() => setFocusedField('budget')}
            onBlur={() => setFocusedField(null)}
            required
            animate={{
              borderColor: focusedField === 'budget' ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'
            }}
            className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none transition-all duration-300 text-white cursor-pointer"
          >
            <option value="" disabled>Select a budget range</option>
            {budgetRanges.map((range, index) => (
              <option key={index} value={range} className="bg-dark-secondary">
                {range}
              </option>
            ))}
          </motion.select>
        </div>
      </div>

      {/* Message Field */}
      <div className="relative">
        <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-300">
          Project Details
        </label>
        <div className="relative">
          <HiPencil className="absolute left-4 top-6 text-celestial-gold text-xl" />
          <motion.textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            rows={6}
            animate={{
              borderColor: focusedField === 'message' ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'
            }}
            className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none transition-all duration-300 text-white resize-none"
            placeholder="Tell me about your project, goals, and requirements..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-celestial-gold text-dark-bg font-bold rounded-lg hover:shadow-lg transition-all duration-300 interactive"
      >
        Send Message
      </motion.button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center">
        Your information is safe and will only be used to respond to your inquiry.
      </p>
    </motion.form>
  );
};

export default ContactForm;
