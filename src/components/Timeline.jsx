import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const Timeline = () => {
  const milestones = [
    {
      year: '2021',
      title: 'Started Coding Journey',
      description: 'Began self-taught programming with HTML, CSS, and JavaScript. Discovered the power of building solutions through code.',
      color: '#D4AF37'
    },
    {
      year: '2022',
      title: 'First Production Projects',
      description: 'Built my first complete web applications with PHP and MySQL. Learned database design, authentication systems, and real-world problem solving.',
      color: '#00B4D8'
    },
    {
      year: '2023',
      title: 'Banking Platform Launch',
      description: 'Developed a full-stack banking and fintech platform with real transaction processing, multi-role authentication, and comprehensive dashboards.',
      color: '#10B981'
    },
    {
      year: '2023',
      title: 'Logistics System Built',
      description: 'Created a GPS-integrated logistics and delivery management platform with real-time tracking, automated dispatch, and route optimization.',
      color: '#9333EA'
    },
    {
      year: '2024',
      title: 'Education Platform',
      description: 'Launched a comprehensive education management system handling enrollment, grades, attendance, and administrative operations.',
      color: '#F59E0B'
    },
    {
      year: '2024',
      title: 'Entered AI Development',
      description: 'Started building AlphaBit, an AI-powered cryptocurrency trading platform using Claude AI, Node.js, React, and Python.',
      color: '#EC4899'
    },
    {
      year: '2025',
      title: 'Expanding Tech Stack',
      description: 'Deep diving into MERN stack, Python, and AI/ML. Building production-grade applications with modern frameworks and AI integration.',
      color: '#D4AF37'
    },
    {
      year: 'Present',
      title: 'Building for the World',
      description: 'Available for freelance projects and long-term contracts. Crafting world-class applications from Nigeria for global clients.',
      color: '#00B4D8',
      current: true
    }
  ];

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-celestial-gold via-electric-blue to-celestial-gold opacity-30" />

      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
                className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}
              >
                <div className="glass p-6 rounded-xl relative group hover:border-celestial-gold/50 transition-all duration-300">
                  {/* Current Badge */}
                  {milestone.current && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-celestial-gold text-dark-bg text-xs font-bold rounded-full animate-pulse">
                      NOW
                    </div>
                  )}

                  {/* Year */}
                  <div
                    className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                    style={{ background: `${milestone.color}20`, color: milestone.color }}
                  >
                    {milestone.year}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-2 group-hover:text-celestial-gold transition-colors"
                  >
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Decorative Line */}
                  <div
                    className="absolute top-1/2 w-8 h-0.5"
                    style={{
                      background: milestone.color,
                      [index % 2 === 0 ? 'right' : 'left']: '-2rem',
                      display: 'none'
                    }}
                  />
                </div>
              </motion.div>

              {/* Center Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10"
              >
                <div className="relative">
                  <motion.div
                    animate={milestone.current ? {
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        `0 0 0 0 ${milestone.color}40`,
                        `0 0 0 10px ${milestone.color}00`,
                        `0 0 0 0 ${milestone.color}40`
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 rounded-full border-4 border-dark-bg"
                    style={{ background: milestone.color }}
                  />
                  {milestone.current && (
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: milestone.color }}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
