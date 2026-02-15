import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiExternalLink, HiArrowRight } from 'react-icons/hi';
import ProjectMockup from './ProjectMockup';

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-celestial-gold/20 transition-all duration-300"
    >
      {/* Status Badge */}
      {project.status === 'development' && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-yellow-500/20 border border-yellow-500 rounded-full text-xs font-semibold text-yellow-500">
          🚧 In Development
        </div>
      )}

      {/* Project Mockup */}
      <div className="relative overflow-hidden bg-dark-tertiary">
        <ProjectMockup projectId={project.id} color={project.color} />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-dark-bg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <Link to={`/projects/${project.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 bg-celestial-gold text-dark-bg font-semibold rounded-full flex items-center space-x-2 interactive"
              >
                <span>View Details</span>
                <HiArrowRight />
              </motion.button>
            </Link>

            {project.liveUrl && project.status === 'live' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 glass border border-celestial-gold text-white font-semibold rounded-full flex items-center space-x-2 interactive"
              >
                <span>Live Demo</span>
                <HiExternalLink />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-2">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              background: `${project.color}20`,
              color: project.color
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-celestial-gold transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-dark-tertiary text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs text-celestial-gold">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* View Project Link */}
        <Link to={`/projects/${project.id}`}>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center space-x-2 text-celestial-gold font-semibold text-sm group-hover:underline"
          >
            <span>View Project</span>
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </Link>
      </div>

      {/* 3D Tilt Effect Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${project.color}, transparent)`
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
