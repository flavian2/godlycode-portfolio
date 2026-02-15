import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import Timeline from '../components/Timeline';
import { HiCode, HiLightningBolt, HiPuzzle, HiTrendingUp } from 'react-icons/hi';

const About = () => {
  const values = [
    {
      icon: HiCode,
      title: 'Production-Ready Code',
      description: "I don't build demos — I build systems that run real businesses. Every project is crafted with scalability, security, and maintainability in mind.",
      color: '#D4AF37'
    },
    {
      icon: HiLightningBolt,
      title: 'Full-Stack Ownership',
      description: 'From database design to frontend polish, I handle it all. You get a complete solution, not just pieces of a puzzle.',
      color: '#00B4D8'
    },
    {
      icon: HiPuzzle,
      title: 'Problem Solver',
      description: 'I thrive on complex business logic and challenging requirements. The harder the problem, the more motivated I am to solve it.',
      color: '#10B981'
    },
    {
      icon: HiTrendingUp,
      title: 'Always Evolving',
      description: 'Currently expanding into AI, Python, and modern JavaScript frameworks. The best developers never stop learning.',
      color: '#9333EA'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From Nigeria to the World — Building Digital Solutions That Matter
            </p>
          </div>
        </ScrollReveal>

        {/* Biography Section */}
        <ScrollReveal delay={0.2}>
          <div className="glass p-8 md:p-12 rounded-2xl mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="relative inline-block w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-celestial-gold to-electric-blue rounded-2xl blur-xl opacity-50" />
                  <div className="relative glass p-2 rounded-2xl">
                    <div className="aspect-square bg-gradient-to-br from-dark-secondary to-dark-tertiary rounded-xl flex items-center justify-center">
                      {/* TODO: Replace with actual professional photo */}
                      <div className="text-center">
                        <div className="text-8xl mb-4">👨‍💻</div>
                        <p className="text-sm text-gray-500">Godlycode</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Text */}
              <div className="lg:col-span-2 space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm <span className="text-celestial-gold font-bold">Godlycode</span>, a full-stack software developer based in Nigeria. I don't just write code — I architect complete digital solutions that power real businesses.
                </p>
                <p>
                  My journey into tech was self-taught, driven by an insatiable curiosity and a relentless work ethic. Starting from scratch, I taught myself PHP, JavaScript, and database design, then built my way up to creating full production systems — banking platforms, GPS-integrated logistics systems, educational management tools, and AI-powered trading applications.
                </p>
                <p>
                  What sets me apart isn't just technical skill — it's the ability to understand complex business logic and translate it into software that actually works in the real world. Every project I take on gets the same treatment: clean architecture, robust security, intuitive UI, and code that scales.
                </p>
                <p>
                  Today, I'm expanding into the MERN stack, Python, and AI/ML — because the best developers never stop evolving. I'm building <span className="text-electric-blue font-semibold">AlphaBit</span>, an AI-powered trading platform that represents the intersection of everything I've learned.
                </p>
                <p>
                  I'm proudly Nigerian, building for the global market. Whether you're a startup needing an MVP or an established business needing a complex system, I bring the same level of dedication, craftsmanship, and attention to detail to every project.
                </p>
                <p className="text-celestial-gold font-semibold pt-4">
                  Let's build something extraordinary together. 🇳🇬
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* What I Bring Section */}
        <ScrollReveal delay={0.3}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What I <span className="gradient-text">Bring</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-xl group hover:border-celestial-gold/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ background: `${value.color}20` }}
                    >
                      <value.icon
                        className="text-3xl"
                        style={{ color: value.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-celestial-gold transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Section */}
        <ScrollReveal delay={0.4}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              My <span className="gradient-text">Journey</span>
            </h2>
            <Timeline />
          </div>
        </ScrollReveal>

        {/* Skills Summary */}
        <ScrollReveal delay={0.5}>
          <div className="glass p-8 md:p-12 rounded-2xl mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Technical Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Frontend', value: '95%', color: '#00B4D8' },
                { label: 'Backend', value: '98%', color: '#D4AF37' },
                { label: 'Database', value: '92%', color: '#10B981' },
                { label: 'APIs', value: '90%', color: '#9333EA' }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={skill.color}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 251.2' }}
                        whileInView={{
                          strokeDasharray: `${(parseInt(skill.value) / 100) * 251.2} 251.2`
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold" style={{ color: skill.color }}>
                        {skill.value}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{skill.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">
              Let's Work Together
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm available for freelance projects and long-term contracts. If you need a dedicated developer who delivers production-ready solutions, let's connect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-celestial-gold text-dark-bg font-bold rounded-full hover:shadow-lg transition-all duration-300 interactive"
                >
                  Get In Touch
                </motion.button>
              </Link>
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass border-2 border-celestial-gold text-white font-bold rounded-full hover:bg-celestial-gold hover:text-dark-bg transition-all duration-300 interactive"
                >
                  View My Work
                </motion.button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
