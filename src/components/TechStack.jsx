import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3
} from 'react-icons/si';
import { FaMapMarkedAlt } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

const TechStack = () => {
  const techCategories = [
    {
      title: 'Frontend',
      color: '#00B4D8',
      skills: [
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' }
      ]
    },
    {
      title: 'Backend',
      color: '#D4AF37',
      skills: [
        { name: 'PHP', icon: SiPhp, color: '#777BB4' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#000000' },
        { name: 'Python', icon: SiPython, color: '#3776AB', learning: true }
      ]
    },
    {
      title: 'Database',
      color: '#10B981',
      skills: [
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' }
      ]
    },
    {
      title: 'Tools & APIs',
      color: '#9333EA',
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'GitHub', icon: SiGithub, color: '#181717' },
        { name: 'Google Maps API', icon: FaMapMarkedAlt, color: '#4285F4' }
      ]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <ScrollReveal key={categoryIndex} delay={categoryIndex * 0.1}>
              <div className="glass p-6 rounded-2xl hover:border-celestial-gold/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ background: category.color }}
                  />
                  <h3 className="text-xl font-bold" style={{ color: category.color }}>
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 group cursor-pointer"
                    >
                      <div className="relative">
                        <skill.icon
                          className="text-3xl transition-all duration-300 group-hover:scale-110"
                          style={{ color: skill.color }}
                        />
                        {skill.learning && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                            title="Currently Learning"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          {skill.learning && (
                            <span className="text-xs text-green-500 font-semibold">
                              Learning
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Currently Learning Section */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block glass px-8 py-4 rounded-full"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-3 h-3 border-2 border-celestial-gold border-t-transparent rounded-full"
                />
                <span className="text-sm text-gray-400">
                  Currently expanding into <span className="text-celestial-gold font-semibold">MERN Stack, Python & AI/ML</span>
                </span>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TechStack;
