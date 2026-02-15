import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import ProjectMockup from '../components/ProjectMockup';
import { getProjectById } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
        <Link to="/projects">
          <button className="px-6 py-3 bg-celestial-gold text-dark-bg font-bold rounded-full">
            Back to Projects
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          className="flex items-center space-x-2 text-gray-400 hover:text-celestial-gold mb-8 transition-colors"
        >
          <HiArrowLeft className="text-xl" />
          <span>Back</span>
        </motion.button>

        {/* Hero Section */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: `${project.color}20`, color: project.color }}
              >
                {project.category}
              </span>
              {project.status === 'development' && (
                <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full text-sm font-semibold text-yellow-500">
                  🚧 In Active Development — 80% Complete
                </span>
              )}
              {project.status === 'live' && (
                <span className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-full text-sm font-semibold text-green-500 flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Live</span>
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.liveUrl && project.status === 'live' && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-celestial-gold text-dark-bg font-bold rounded-full flex items-center space-x-2 interactive"
                >
                  <HiExternalLink className="text-xl" />
                  <span>View Live Demo</span>
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass border-2 border-celestial-gold text-white font-bold rounded-full flex items-center space-x-2 interactive"
                >
                  <FaGithub className="text-xl" />
                  <span>View Code</span>
                </motion.a>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Project Mockup/Visual */}
        <ScrollReveal delay={0.2}>
          <div className="mb-16 glass p-8 rounded-2xl">
            <ProjectMockup projectId={project.id} color={project.color} />
          </div>
        </ScrollReveal>

        {/* Key Features */}
        <ScrollReveal delay={0.3}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
              <HiCode className="text-celestial-gold" />
              <span>Key Features</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 glass p-4 rounded-lg"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ background: project.color }}
                  />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tech Stack */}
        <ScrollReveal delay={0.4}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(project.techStack).map(([category, technologies], categoryIndex) => (
                technologies.length > 0 && (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="glass p-6 rounded-lg"
                  >
                    <h3 className="text-sm font-semibold text-celestial-gold mb-4 uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {technologies.map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="text-gray-300 text-sm flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-celestial-gold" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Screenshots Section (Placeholder) */}
        <ScrollReveal delay={0.5}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass p-4 rounded-lg aspect-video flex items-center justify-center text-gray-500"
                >
                  {/* TODO: Replace with actual screenshots */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm">{screenshot}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              💡 Screenshots will be added soon. Visit the live demo to see the project in action.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.6}>
          <div className="text-center glass p-12 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Want a Similar Project?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I can build custom solutions tailored to your specific business needs. Let's discuss your project requirements.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-celestial-gold text-dark-bg font-bold rounded-full hover:shadow-lg transition-all duration-300 interactive"
              >
                Start Your Project
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ProjectDetail;
