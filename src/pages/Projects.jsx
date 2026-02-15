import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import { projects, getCategories, getProjectsByCategory } from '../data/projects';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = getCategories();
  const filteredProjects = getProjectsByCategory(activeCategory);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Production-grade applications built from scratch. Each project represents real-world solutions that power actual businesses and users.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize interactive ${
                  activeCategory === category
                    ? 'bg-celestial-gold text-dark-bg shadow-lg shadow-celestial-gold/50'
                    : 'glass text-gray-300 hover:text-white hover:border-celestial-gold/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Count */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <p className="text-gray-500">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {activeCategory !== 'all' && ` in ${activeCategory}`}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-500 mb-4">No projects found in this category</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="text-celestial-gold hover:underline"
            >
              View all projects
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20 text-center">
            <div className="glass p-12 rounded-2xl inline-block">
              <h3 className="text-3xl font-bold mb-4">
                Have a Project in Mind?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Let's discuss how I can help bring your vision to life with clean, scalable, production-ready code.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-celestial-gold text-dark-bg font-bold rounded-full hover:shadow-lg transition-all duration-300 interactive"
              >
                Get In Touch
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Projects;
